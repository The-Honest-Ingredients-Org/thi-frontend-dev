"use client";

import React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { theme } from "@/context/providers";
import useGetUser from "@/swr/user/auth/useGetUser";
import { useReadCart } from "@/swr/user/cart/cart";
import { UpdateCartProps, updateCart } from "@/app/api/user/user";

interface ProductVariant {
  size: number;
  price: number;
  count: number;
  discount: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  rating: number;
  type: string;
  subType: string;
  variants: ProductVariant[];
  reviews: any[];
  paymentOptions: string[];
  images: string[];
  __v: number;
}

export interface BestPickSlideProps {
  product: Product;
}

export default function BestPickSlide({ product }: BestPickSlideProps) {
  const toast = useToast();
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
  const handleAddToCart = async () => {
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

    const productToAdd = {
      product: product,
      quantity: 1,
      size: product?.variants[0]?.size,
      totalPrice: product?.variants[0]?.price,
    };
    const existingProducts = cart?.userCart?.products || [];
    const productIndex = existingProducts.findIndex(
      (existingProduct: { product: { _id: any }; size: any }) =>
        existingProduct.product._id == productToAdd.product._id &&
        existingProduct.size == productToAdd.size
    );

    if (productIndex !== -1) {
      existingProducts[productIndex].quantity =
        parseInt(existingProducts[productIndex].quantity) + 1;
      existingProducts[productIndex].totalPrice =
        parseFloat(existingProducts[productIndex].totalPrice) +
        product?.variants[0]?.price;
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
  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      maxWidth="370px"
      mx="auto"
    >
      <Link
        as={NextLink}
        href={`/products/${product?.type}/${product?._id}`}
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        <Box border={`1px solid ${theme.colors.main}`} borderRadius="10px">
          <Box>
            <Image
              alt="best-picks"
              src={product?.images[0]}
              borderTopRadius="10px"
              height="100%"
              width="100%"
            />
          </Box>

          <Text
            width="100%"
            bgColor={theme.colors.main}
            borderBottomRadius="1vh"
            py="20px"
            px="10px"
            color={theme.colors.iconColor}
            textAlign="center"
          >
            {product?.name}
          </Text>
        </Box>
      </Link>
      <Flex width="full" justifyContent="space-between" alignItems="center" mt="20px">
        {/* <Text width="65%" textAlign="left">
          
        </Text> */}
        <Button
          bgColor="transparent"
          border={`1px solid ${theme.colors.main}`}
          borderRadius="20px"
          px={8}
          fontWeight="normal"
          _hover={{ backgroundColor: theme.colors.iconColor }}
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
        <Box textAlign="right">
          {product?.variants[0]?.discount === 0 ? (
            "₹" + product?.variants[0].price
          ) : (
            <>
              <s>₹ {product?.variants[0].price}</s>
              <Text display="inline" fontSize="1.3rem" ml={2}>
                ₹{" "}
                {(
                  product?.variants[0].price -
                  (product?.variants[0].price *
                    product?.variants[0]?.discount) /
                    100
                ).toFixed(2)}
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
