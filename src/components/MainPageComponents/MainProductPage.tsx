"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import TasteHonesty from "@/components/MainPage/TasteHonesty";
import BestPicks from "@/components/MainPage/BestPicks";
import FAQ from "@/components/MainPage/FAQ";
import { BsStarHalf, BsPersonCircle, BsStarFill, BsStar } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import { theme } from "@/context/providers";
import ProductSlider from "@/components/MainPageComponents/Sliders/ProductSlider";
import {
  UpdateCartProps,
  reviewProduct,
  updateCart,
} from "@/app/api/user/user";
import { useFetchProduct } from "@/swr/user/products/useFetchProduct";
import { useReadCart } from "@/swr/user/cart/cart";
import { useRouter } from "next/navigation";
import useGetUser from "@/swr/user/auth/useGetUser";
interface Variant {
  count: number;
  price: number;
  _id: string;
  size: number;
  discount: number;
}
export default function MainProductPage(props: { _id: string }) {
  const router = useRouter();
  const { product, isLoading, error, mutate } = useFetchProduct({
    productId: props._id,
  });
  let token: string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }
  const { user } = useGetUser({
    token: token,
  });

  const { cart } = useReadCart({
    token: token,
  });

  // const token = localStorage.getItem("access_token");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const toast = useToast();

  const [size, setSize] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product?.product) {
      setSize(product.product.variants[0]?.size);
      setPrice(product.product.variants[0]?.price);
      setCount(product.product.variants[0]?.count);
      setDiscount(product.product.variants[0]?.discount);
    }
  }, [product]);

  const getStarIcons = (rating: number) => {
    const starIcons = [];
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        starIcons.push(
          <BsStarFill key={i} size={24} style={styles.starStyle} />
        );
      } else if (i === Math.ceil(roundedRating) && i % 2 === 0) {
        starIcons.push(
          <BsStarHalf key={i} size={24} style={styles.starStyle} />
        );
      } else {
        starIcons.push(<BsStar key={i} size={24} style={styles.starStyle} />);
      }
    }

    return starIcons;
  };

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value, 10) || 0;
    setQuantity(newQuantity);
    const selectedVariant = product.product.variants.find((variant: Variant) => variant.size === size);
    if (selectedVariant) {
      setPrice(selectedVariant.price * newQuantity);
    }
  };

  const handleSeeMoreReviews = () => {
    setShowMoreReviews(true);
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const styles = {
    starStyle: {
      color: theme.colors.iconColor,
    },
    userIcon: {
      color: "gray",
    },
  };

  let totalPrice = price;
  const handleAddToCart = async () => {
    if (quantity === 0) {
      toast({
        title: "Error",
        description: "Atleast choose 1 quantity",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (!token) {
      toast({
        title: "Please login.",
        description: "Please login to add items to cart",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    totalPrice = price * quantity;

    const productToAdd = {
      product: product?.product,
      quantity: quantity.toString(),
      size: size,
      totalPrice: totalPrice,
    };
    const existingProducts = cart?.userCart?.products || [];
    const productIndex = existingProducts.findIndex(
      (existingProduct: { product: { _id: any }; size: any }) =>
        existingProduct.product._id == productToAdd.product._id &&
        existingProduct.size == productToAdd.size
    );

    if (productIndex !== -1) {
      existingProducts[productIndex].quantity =
        parseInt(existingProducts[productIndex].quantity) + quantity;
      existingProducts[productIndex].totalPrice =
        parseFloat(existingProducts[productIndex].totalPrice) + totalPrice;
    } else {
      existingProducts.push(productToAdd);
    }

    try {
      const updateCartData: UpdateCartProps = {
        products: existingProducts,
        value: 0,
        type: "",
      };
      await updateCart(updateCartData);
      toast({
        title: "Product added successfully",
        description: "We've added product into your cart.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Some error occured",
        description: "Failed to add product to your cart.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error removing product from cart:", error);
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
    <>
      <Flex
        height="fit-content"
        width="100%"
        direction="column"
        mt={10}
        px={{ base: "20px", md: "30px", lg: "50px", xl: "70px" }}
      >
        <Flex
          width="100%"
          alignItems="flex-start"
          justifyContent="flex-start"
          direction={{ base: "column", lg: "row" }}
          gap={10}
        >
          <Flex width={{ base: "100%", lg: "40%" }}>
            <ProductSlider
              images={product.product ? product.product.images : []}
            />
          </Flex>
          <Flex
            gap={5}
            width={{ base: "100%", lg: "65%" }}
            direction="column"
            alignItems="flex-start"
            justifyContent="space-around"
          >
            <Text fontSize={{ base: "1.5rem", xl: "2rem" }}>
              {product?.product?.name}
            </Text>
            <Flex alignItems="center" gap={5} mt="-20px">
              {discount != 0 && (
                <s>
                  <Text
                    fontSize={{ base: "1.3rem", xl: "1.4rem" }}
                    color="orange"
                  >
                    &#x20B9; {price}
                  </Text>
                </s>
              )}
              <Text fontSize={{ base: "2rem", xl: "2.4rem" }}>
                &#x20B9; {(price - (price * discount) / 100).toFixed(2)}
              </Text>
            </Flex>
            {discount != 0 && (
              <Text
                fontSize={{ base: "1.3rem", xl: "1.4rem" }}
                color="orange"
                mt="-15px"
                mb={5}
              >
                {discount}
                {"% Discount"}
              </Text>
            )}
            <Text>{product?.product?.description}</Text>
            <Flex
              alignItems={{ md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={{ base: 5, md: 12 }}
              mt={{ base: 5, xl: 10 }}
            >
              <Flex direction="row" height="fit-content" alignItems="center">
                <Text marginRight="20px">Sizes (gm) : </Text>
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
                    {size}
                  </MenuButton>
                  <MenuList>
                    {product?.product?.variants.map(
                      (variant: Variant, index: number) => (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            setSize(variant?.size);
                            setQuantity(0);
                            setPrice(variant?.price);
                            setCount(variant?.count);
                            setDiscount(variant?.discount);
                            totalPrice = price * quantity;
                          }}
                        >
                          {variant?.size}
                        </MenuItem>
                      )
                    )}
                  </MenuList>
                </Menu>
              </Flex>
              {count === 0 ? (
                <Text fontSize={{ lg: "1.2rem" }} color="red.500">
                  Product size out of stock*
                </Text>
              ) : (
                <Flex
                  direction="row"
                  height="fit-content"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Text marginRight="20px">Quantity : </Text>

                  <NumberInput
                    size="md"
                    maxW={20}
                    defaultValue={1}
                    min={0}
                    max={count}
                    onChange={handleQuantityChange}
                    style={{
                      borderRadius: "10px",
                      borderColor: "black",
                    }}
                    value={quantity}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              )}
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              gap="2vw"
              mt={{ base: 5, xl: 10 }}
            >
              <Flex direction="column" alignItems="center" gap="15px">
                <Image
                  alt="prodimg"
                  src="/assets/prodIcons/prodicon1.svg"
                  width="70%"
                />
                <Text>Pure</Text>
              </Flex>
              <Flex direction="column" alignItems="center" gap="15px">
                <Image
                  alt="prodimg"
                  src="/assets/prodIcons/prodicon2.svg"
                  width="70%"
                />
                <Text>Authentic</Text>
              </Flex>
              <Flex direction="column" alignItems="center" gap="15px">
                <Image
                  alt="prodimg"
                  src="/assets/prodIcons/prodicon3.svg"
                  width="70%"
                />
                <Text>Premium</Text>
              </Flex>
              <Flex direction="column" alignItems="center" gap="15px">
                <Image
                  alt="prodimg"
                  src="/assets/prodIcons/prodicon4.svg"
                  width="70%"
                />
                <Text>Nourishing</Text>
              </Flex>
            </Flex>
            {count != 0 && (
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
                mt={{ base: 5, xl: 10 }}
              >
                <Button
                  width={{ base: "45%", md: "40%" }}
                  paddingY={{ base: "1em", lg: "1.5em" }}
                  bgColor={theme.colors.main}
                  color={theme.colors.white}
                  fontWeight="normal"
                  _hover={{
                    backgroundColor: theme.colors.main,
                    color: theme.colors.iconColor,
                    border: "1px solid #FFDC73",
                  }}
                  onClick={async () => {
                    await handleAddToCart();
                    token && quantity >= 1 && router.push("/cart");
                  }}
                >
                  Buy Now
                </Button>
                <Button
                  width={{ base: "45%", md: "40%" }}
                  paddingY={{ base: "1em", lg: "1.5em" }}
                  bgColor="transparent"
                  fontWeight="normal"
                  backgroundColor="transparent"
                  border={`1px solid ${theme.colors.main}`}
                  _hover={{
                    backgroundColor: theme.colors.iconColor,
                  }}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="space-evenly"
          height="fit-content"
          my={10}
        >
          <Text fontSize="1.5rem">Customer Reviews</Text>
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            marginBottom="2vh"
          >
            <Text fontSize="1.2rem">{product?.product?.rating} out of 5</Text>
            <Flex
              alignItems="center"
              justifyContent="space-evenly"
              marginLeft="20px"
            >
              {getStarIcons(product?.product?.rating)}
            </Flex>
          </Flex>
          {token && (
            <Button
              style={{
                backgroundColor: "transparent",
                color: "#128DFF",
                fontWeight: "normal",
                marginBottom: "2vh",
                padding: 0,
              }}
              _hover={{
                textDecor: "underline",
              }}
              onClick={onOpen}
            >
              Write a review &gt;{" "}
            </Button>
          )}
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontWeight="normal">Write a review</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Formik
                  initialValues={{ heading: "", rating: 5, comment: "" }}
                  onSubmit={async (values, actions) => {
                    const obj = {
                      ...values,
                      productId: props._id,
                    };
                    try {
                      if (
                        product?.product?.reviews.some(
                          (review: { user_id: any }) =>
                            review.user_id === user?._id
                        )
                      ) {
                        toast({
                          title: "Review not added.",
                          description: "You have already added the review",
                          status: "error",
                          duration: 9000,
                          isClosable: true,
                        });
                      } else {
                        const res = await reviewProduct(obj);
                        toast({
                          title: res.status
                            ? "Review Added"
                            : "Review not added.",
                          description: res.message,
                          status: res.status ? "success" : "error",
                          duration: 9000,
                          isClosable: true,
                        });
                        mutate();
                      }

                      onClose();
                    } catch (e) {
                      toast({
                        title: "Login Failed.",
                        description: "Failed to login to your account.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                    }
                    actions.setSubmitting(false);
                  }}
                >
                  {(props: { isSubmitting: any }) => (
                    <Form>
                      <Flex direction="column" gap={5}>
                        <Field name="heading">
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.heading && form.touched.heading
                              }
                              // style={styles.fieldStyle}
                            >
                              <FormLabel
                              // style={styles.labelStyle}
                              >
                                Heading :{" "}
                              </FormLabel>
                              <Input
                                {...field}
                                id="heading"
                                name="heading"
                                type="text"
                                placeholder="Heading of the review"
                              />
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="rating">
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.rating && form.touched.rating
                              }
                            >
                              <FormLabel>Rating : </FormLabel>
                              <Input
                                {...field}
                                id="rating"
                                name="rating"
                                type="text"
                                placeholder="Rating of the review"
                                min={1}
                                max={5}
                              />
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="comment">
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.comment && form.touched.comment
                              }
                              style={{
                                marginBottom: "5vh",
                              }}
                            >
                              <FormLabel>Write your review</FormLabel>
                              <Input
                                {...field}
                                type="text"
                                placeholder="Please explain about the product..."
                              />
                              <FormErrorMessage>
                                {form.errors.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                      <Button
                        style={{
                          backgroundColor: theme.colors.main,
                          color: theme.colors.white,
                          fontWeight: "normal",
                        }}
                        mr={3}
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Post
                      </Button>
                      <Button
                        onClick={onClose}
                        style={{
                          backgroundColor: "transparent",
                          fontWeight: "normal",
                        }}
                      >
                        Cancel
                      </Button>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
          {product?.product?.reviews.map(
            (
              review: {
                user:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
                rating: number;
                heading:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
                comment:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined
            ) => (
              <Flex
                key={index}
                width="100%"
                alignItems="flex-start"
                justifyContent="center"
                direction="column"
                marginBottom="5vh"
              >
                <Flex
                  alignItems="center"
                  justifyContent="flex-start"
                  marginBottom="1vh"
                >
                  <BsPersonCircle size={30} style={styles.userIcon} />
                  <Text fontSize="1.2rem" marginLeft="2vh">
                    {review.user}
                  </Text>
                </Flex>
                <Flex alignItems="center" marginBottom="1vh" gap={5}>
                  <Flex alignItems="center" justifyContent="space-evenly">
                    {getStarIcons(review.rating)}
                  </Flex>
                  <Text fontSize="1.2rem">{review.heading}</Text>
                </Flex>
                <em>{review.comment}</em>
              </Flex>
            )
          )}

          {!showMoreReviews && (
            <>
              <Divider colorScheme="blackAlpha" borderWidth="1px" />
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#128DFF",
                  margin: "2vh 0",
                  fontWeight: "normal",
                  padding: 0,
                }}
                _hover={{
                  textDecor: "underline",
                }}
                onClick={handleSeeMoreReviews}
              >
                See more reviews &gt;{" "}
              </Button>
              <Divider colorScheme="blackAlpha" borderWidth="1px" />
            </>
          )}
        </Flex>
      </Flex>
      <TasteHonesty />
      <BestPicks />
      <FAQ />
    </>
  );
}
