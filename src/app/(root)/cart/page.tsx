"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { theme } from "@/context/providers";
import CartItem, { ItemProps, Product } from "@/components/CartPage/CartItem";
import { useReadCart } from "@/swr/user/cart/cart";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import {
  CartOffer,
  ProductOffer,
  readCartOffers,
  readProductOffers,
} from "@/app/api/admin/admin";
import { updateCart } from "@/app/api/user/user";

export default function CartPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  let token: string = "";
  const [cartOffers, setCartOffers] = useState<CartOffer[]>([]);
  const [productOffers, setProductOffers] = useState<ProductOffer[]>([]);

  const [appliedOffer, setAppliedOffer] = useState<
    CartOffer | ProductOffer | null
  >(null);

  const applyOffer = (offer: CartOffer | ProductOffer) => {
    setAppliedOffer(offer);
    onClose();
  };

  const calculateDiscountedAmt = (amt: number) => {
    const type = appliedOffer?.discountType;
    let res = amt;
    if (appliedOffer?.category === "cart") {
      if (type === "amount" && appliedOffer?.value) {
        res -= appliedOffer.value;
      } else if (type === "percentage" && appliedOffer?.value) {
        res -= (appliedOffer.value * amt) / 100;
      }
    } else {
      if (type === "amount" && appliedOffer?.value) {
        res -= appliedOffer.value;
      } else if (type === "percentage" && appliedOffer?.value) {
        res -= (appliedOffer.value * amt) / 100;
      }
    }
    return res;
  };

  const removeAppliedOffer = () => {
    setAppliedOffer(null);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const cartOffers = await readCartOffers();
        const productOffers = await readProductOffers();

        // console.log("pr", productOffers);

        setCartOffers(cartOffers);
        setProductOffers(productOffers);
      } catch (error) {
        console.error("Error fetching cart offers", error);
      }
    }
    fetchData();
  }, []);

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }
  const { cart, isLoading, error } = useReadCart({
    token: token,
  });

  const checkoutHandler = async () => {
    let flag = true;
    cart?.userCart?.products.map((product: ItemProps) => {
      const variantSelected = product?.product?.variants.find(
        (obj: { size: string; count: number; price: number }) =>
          obj.size == product.size
      );

      if (!variantSelected) {
        toast({
          title: "Error",
          description: "Variant not found for product",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      if (product.quantity > variantSelected.count) {
        toast({
          title: "Error",
          description:
            "The choosen quantity of items is not available right now. Please update your cart.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        flag = false;
        return;
      }
    });

    if (flag) {
      await updateCart({
        products: cart?.userCart?.products,
        value: appliedOffer?.value || 0,
        type: appliedOffer?.discountType || "",
      });
      router.push("/checkout");
    }
  };

  if (isLoading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor={theme.colors.gray}
          color={theme.colors.ci}
          size="md"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Text
          style={{
            color: "red",
          }}
          size="1.2rem"
          align="center"
        >
          Error loading data
        </Text>
      </Flex>
    );
  }
  return (
    <Flex height="fit-content" width="100%" direction="column">
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody maxHeight="70vh" overflow="scroll">
            <TableContainer mt={10} border="1px solid gray" borderRadius={10}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Code</Th>
                    <Th>Value</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartOffers
                    ?.filter(
                      (offer) =>
                        cart?.userCart?.totalProductDiscounts.toFixed(2) >=
                        offer.amount
                    )
                    .map((offer) => (
                      <Tr key={offer?._id}>
                        <Td>{offer?.code}</Td>
                        <Td>
                          {offer?.value}{" "}
                          {offer?.discountType == "percentage" ? "%" : "RS"}
                        </Td>
                        <Td>{offer?.description}</Td>
                        <Td>
                          <Button
                            bgColor={theme.colors.main}
                            color={theme.colors.white}
                            _hover={{
                              bgColor: theme.colors.white,
                              color: theme.colors.main,
                            }}
                            onClick={() => applyOffer(offer)}
                          >
                            Apply
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  {productOffers
                    ?.filter((offer: ProductOffer) => {
                      const offerProducts = offer?.productCountMap;
                      const cartProducts = cart?.userCart?.products;

                      if (!offerProducts || !cartProducts) {
                        return false;
                      }

                      const res = offerProducts.every((offerProduct: any) =>
                        cartProducts.some(
                          (cartProduct: any) =>
                            cartProduct?.product._id ===
                              offerProduct?.productId &&
                            cartProduct?.quantity?.toString() >=
                              offerProduct?.count?.toString() &&
                            cartProduct?.size?.toString() ===
                              offerProduct?.size?.toString()
                        )
                      );

                      return res;
                    })
                    .map((offer) => (
                      <Tr key={offer?._id}>
                        <Td>{offer?.code}</Td>
                        <Td>
                          {offer?.value}{" "}
                          {offer?.discountType == "percentage" ? "%" : "RS"}
                        </Td>
                        <Td>{offer?.description}</Td>
                        <Td>
                          <Button
                            bgColor={theme.colors.main}
                            color={theme.colors.white}
                            _hover={{
                              bgColor: theme.colors.white,
                              color: theme.colors.main,
                            }}
                            onClick={() => applyOffer(offer)}
                          >
                            Apply
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
      {cart?.userCart?.products.length !== 0 && cart.userCart != null ? (
        <Flex
          width="100%"
          direction={{ base: "column", lg: "row" }}
          alignItems="flex-start"
          justifyContent="flex-start"
          py={10}
          px={{ base: "15px", md: "30px", lg: "70px" }}
          gap={5}
        >
          <Flex
            height="100%"
            width={{ base: "100%", lg: "70%" }}
            direction="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Text
              fontSize={{ base: "1.5rem", lg: "1.7rem" }}
              mb={10}
              width="full"
              textAlign={{ base: "center", md: "left" }}
            >
              Your Cart
            </Text>
            <Flex
              width="100%"
              overflow="auto"
              alignItems="flex-start"
              justifyContent="flex-start"
              direction="column"
            >
              {cart?.userCart?.products?.map(
                (
                  product: {
                    product: Product;
                    _id: string;
                    quantity: number;
                    size: string;
                    totalPrice: number;
                  },
                  index: number
                ) => (
                  <CartItem
                    key={index}
                    _id={product._id}
                    product={product.product}
                    quantity={product.quantity}
                    size={product.size}
                    totalPrice={product.totalPrice}
                    removeAppliedOffer={removeAppliedOffer}
                  />
                )
              )}
            </Flex>
          </Flex>
          <Flex
            height="100%"
            width={{ base: "100%", lg: "30%" }}
            alignItems="flex-start"
            justifyContent="flex-start"
            direction="column"
          >
            <Text
              fontSize={{ base: "1.4rem", xl: "1.6rem" }}
              marginBottom={{ base: "20px", lg: "40px" }}
            >
              Order Summary
            </Text>
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              gap={5}
              mb="3vh"
            >
              <Text fontSize={{ base: "1rem", xl: "1.1rem" }}>Subtotal</Text>
              <Text fontSize={{ base: "1.1rem", xl: "1.2rem" }} color="gray">
                &#x20B9;{cart?.userCart?.totalProductDiscounts.toFixed(2)}
              </Text>
            </Flex>
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              gap={5}
            >
              <Text fontSize={{ base: "1rem", xl: "1.1rem" }}>Shipping</Text>
              <Text fontSize={{ base: "1.1rem", xl: "1.2rem" }} color="gray">
                at checkout
              </Text>
            </Flex>

            <Divider colorScheme={theme.colors.main} size="2rem" my="2vh" />
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              gap={5}
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                onOpen();
              }}
            >
              <Text fontSize={{ base: "1rem", xl: "1.1rem" }}>
                Apply Offers
              </Text>
              <Text fontSize={{ base: "1.1rem", xl: "1.2rem" }} color="gray">
                <FaPlus />
              </Text>
            </Flex>
            <Divider colorScheme={theme.colors.main} size="2rem" my="2vh" />
            {appliedOffer && (
              <>
                <Flex
                  width="100%"
                  alignItems="flex-start"
                  direction="column"
                  justifyContent="space-between"
                >
                  <Text fontSize={{ base: "1rem", xl: "1.1rem" }}>
                    Applied Offer :
                  </Text>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    mt="2"
                  >
                    <span
                      style={{
                        backgroundColor: "#F7D966",
                        color: "white",
                        padding: "2%",
                        borderRadius: "5px",
                      }}
                    >
                      {appliedOffer.code}
                    </span>
                    <Button
                      onClick={removeAppliedOffer}
                      colorScheme="red"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </Flex>
                </Flex>
                <Divider colorScheme={theme.colors.main} size="2rem" my="3vh" />
              </>
            )}
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              gap={5}
            >
              <Text fontSize={{ base: "1rem", xl: "1.1rem" }}>Total</Text>
              {!appliedOffer && (
                <Text fontSize={{ base: "1.1rem", xl: "1.2rem" }} color="gray">
                  &#x20B9;{cart?.userCart?.totalProductDiscounts.toFixed(2)}
                </Text>
              )}
              {appliedOffer && (
                <>
                  <s>
                    <Text
                      fontSize={{ base: "1.1rem", xl: "1.2rem" }}
                      color="gray"
                    >
                      &#x20B9;
                      {cart?.userCart?.totalProductDiscounts.toFixed(2)}
                    </Text>
                  </s>
                  <Text
                    fontSize={{ base: "1.1rem", xl: "1.2rem" }}
                    color="gray"
                  >
                    &#x20B9;
                    {calculateDiscountedAmt(
                      cart?.userCart?.totalProductDiscounts
                    )?.toFixed(2)}
                  </Text>
                </>
              )}
            </Flex>
            <Button
              marginTop="2vh"
              width="100%"
              paddingY="1.6rem"
              bgColor={theme.colors.main}
              color="white"
              fontSize="1.2rem"
              fontWeight="normal"
              _hover={{
                color: `${theme.colors.iconColor}`,
                bgColor: "#393939",
              }}
              onClick={checkoutHandler}
            >
              Checkout
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex
          height="90vh"
          width="100%"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Image alt="empty-cart" src="/emptyCart.svg" height="20vh" />
          <Text fontSize="1.5rem" marginTop="2vh" fontWeight="500">
            YOUR CART IS EMPTY
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
