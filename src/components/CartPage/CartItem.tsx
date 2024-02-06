import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { theme } from "@/context/providers";
import { useReadCart } from "@/swr/user/cart/cart";
import { updateCart } from "@/app/api/user/user";
import { useFetchProduct } from "@/swr/user/products/useFetchProduct";

export interface Product {
  _id: string;
  name: string;
  description: string;
  rating: number;
  type: string;
  variants: Variant[];
  reviews: any[];
  paymentOptions: string[];
  images: string[];
  __v: number;
}

export interface ItemProps {
  _id: string;
  product: Product;
  quantity: number;
  size: string;
  totalPrice: number;
  removeAppliedOffer: any;
}

interface Variant {
  count: number;
  price: number;
  _id: string;
  size: string;
  discount: number;
}

export default function CartItem(props: ItemProps) {
  const [isUpdate, setUpdate] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>(props.size);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    props.quantity
  );
  const [price, setPrice] = useState<number>(props.totalPrice);
  let token: string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }
  const { cart, mutate } = useReadCart({
    token: token,
  });

  const {
    product: currentCartItemProduct,
    isLoading,
    error,
  } = useFetchProduct({
    productId: props.product._id,
  });

  const [count, setCount] = useState<number>(
    currentCartItemProduct?.product?.variants.find(
      (obj: { size: string; count: number; price: number }) =>
        obj.size == props.size
    ).count
  );
  useEffect(() => {
    setCount(
      currentCartItemProduct?.product?.variants.find(
        (obj: { size: string; count: number; price: number }) =>
          obj.size == props.size
      ).count
    );
  }, [currentCartItemProduct, props.size]);

  const toast = useToast();
  const handleRemoveFromCart = async () => {
    const updatedCart = cart.userCart.products.filter(
      (productItem: { _id: string; product: Product }) =>
        productItem?._id !== props._id
    );

    const requestData = {
      products: updatedCart.map((productItem: any) => ({
        product: productItem.product._id,
        quantity: productItem.quantity,
        size: productItem.size,
      })),
      value: 0,
      type: "",
    };

    try {
      await updateCart(requestData);
      window.location.reload();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  let totalPrice = price;
  console.log("tltl",props.totalPrice)

  const handleUpdateCartItem = async () => {
    if (selectedQuantity === 0 || selectedQuantity > count) {
      toast({
        title: "Error",
        description:
          selectedQuantity === 0
            ? "At least choose 1 quantity"
            : `Please choose quantity less than ${count}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const updatedCart = cart.userCart.products.map((productItem: ItemProps) => {
      if (productItem._id === props._id) {
        productItem.size = selectedSize;
        productItem.quantity = selectedQuantity;
      }
      return productItem;
    });

    const updatedProduct = updatedCart.find(
      (productItem: ItemProps) => productItem._id === props._id
    );
    if (updatedProduct) {
      updatedProduct.totalPrice = price * selectedQuantity;
    }

    const requestData = {
      products: updatedCart.map((productItem: ItemProps) => ({
        product: productItem.product._id,
        quantity: productItem.quantity,
        size: productItem.size,
      })),
      value: 0,
      type: "",
    };

    try {
      const res = await updateCart(requestData);
      if (res?.message == "Cart updated successfully") {
        await mutate();
        setUpdate(false);
        toast({
          title: "Updated the product",
          description: "We have updated the product",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Error updating the product.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating product in cart:", error);
    }
  };

  useEffect(() => {
    if (selectedQuantity != props.quantity || selectedSize != props.size) {
      setUpdate(true);
    } else if (
      selectedQuantity == props.quantity ||
      selectedSize == props.size
    ) {
      setUpdate(false);
    }
  }, [props.quantity, props.size, selectedQuantity, selectedSize]);

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

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value, 10) || 0;
    setSelectedQuantity(newQuantity);
    const selectedVariant = props.product.variants.find((variant: Variant) => variant.size === selectedSize);
    if (selectedVariant) {
      setPrice(selectedVariant.price * newQuantity);
    }
  };

  return (
    <Flex
      width="100%"
      marginBottom="2vh"
      paddingBottom="2vh"
      borderBottom="2px solid #3e3e3e11"
      gap={5}
      alignItems="center"
      direction={{ base: "column", md: "row" }}
    >
      <Flex>
        <Image
          alt="img"
          src={props.product.images[0]}
          width={{ base: "200px", xl: "250px" }}
        />
      </Flex>
      <Flex
        height="100%"
        width="100%"
        direction="column"
        alignItems={{ base: "center", md: "flex-start" }}
        gap={2}
      >
        <Flex fontSize={{ base: "1.2rem", md: "1.3rem" }}>
          {props?.product?.name}
        </Flex>
        <Flex
          fontSize={{ base: "1.3rem", md: "1.5rem" }}
          color={theme.colors.iconColor}
        >
          &#x20B9;{" "}
          {(
            totalPrice -
            (totalPrice / 100) *
              (props?.product?.variants?.find(
                (variant: Variant) => variant?.size === selectedSize
              )?.discount || 0)
          ).toFixed(2)}
        </Flex>
        <Flex
          width="100%"
          alignItems="center"
          gap={{ base: 2, md: 10 }}
          direction={{ base: "column", md: "row" }}
        >
          <Flex alignItems="center">
            <Text marginRight="1.2rem" fontSize="1rem">
              Size :{" "}
            </Text>
            {/* <Text>{selectedSize}</Text> */}
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<AiFillCaretDown />}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #292929",
                  fontWeight: "normal",
                }}
              >
                {selectedSize}
              </MenuButton>
              <MenuList>
                {currentCartItemProduct?.product?.variants.map(
                  (variant: Variant, index: number) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setSelectedSize(variant?.size);
                        setSelectedQuantity(variant.count < 1 ? 0 : 1);
                        setPrice(variant?.price);
                        setCount(variant?.count);
                        totalPrice = price * selectedQuantity;
                      }}
                    >
                      {variant?.size}
                    </MenuItem>
                  )
                )}
              </MenuList>
            </Menu>
          </Flex>
          <Flex alignItems="center">
            <Text marginRight="1.2rem" fontSize="1rem">
              Quantity :{" "}
            </Text>
            <NumberInput
              size="md"
              maxW={20}
              defaultValue={selectedQuantity}
              min={selectedQuantity < 1 ? 0 : 1}
              max={count}
              onChange={handleQuantityChange}
              value={selectedQuantity}
              style={{
                borderRadius: "10px",
                borderColor: "black",
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Flex>
        <Flex alignItems="center" gap={10}>
          <Button
            onClick={() => {
              handleRemoveFromCart();
              props.removeAppliedOffer();
            }}
            fontWeight="normal"
            bgColor="transparent"
            padding="0"
            color="red.300"
            textDecoration="underline"
            _hover={{
              color: "red",
            }}
          >
            Remove
          </Button>
          {isUpdate && (
            <Button
              onClick={() => {
                handleUpdateCartItem();
                props.removeAppliedOffer();
              }}
              fontWeight="normal"
              bgColor="transparent"
              padding="0"
              color="red.300"
              textDecoration="underline"
              _hover={{
                color: "red",
              }}
            >
              Update
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
