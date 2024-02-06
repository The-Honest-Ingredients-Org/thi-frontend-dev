/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import { theme } from "@/context/providers";
import { Box, Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { createOrder, getCart } from "@/app/api/user/user";
import OrderPlaced from "@/components/checkout/OrderPlaced";

export default function page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const sessionId = params.slug[0];
  const toast = useToast();
  let token: string = "";
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<any>(null);
  // console.log("new cart",cart)

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }

  useEffect(() => {
    if (token) {
      getCart()
        .then((cartData) => {
          setCart(cartData);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, [token]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePlaceOrder = async () => {
    setIsLoading(true);
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    if(!checkoutSession) router.push("/cart")
    if (checkoutSession.payment_status) {
      try {
        const res = await createOrder({
          products: cart?.userCart?.products,
          // totalAmount: cart?.userCart?.totalAmount,
          totalAmount: cart?.userCart?.totalProductDiscounts,
          discountedAmount: cart?.userCart?.discountedAmount,
          modeOfPayment: "Online",
          shippingAddress: cart?.userCart?.user?.shippingAddress
        });
        if (
          res?.message == "Invalid product or variant selected" ||
          res?.message == "Internal server error" ||
          !res?.newOrder
        ) {
          toast({
            title: "Some error occurred",
            description:
              "Failed to place an order, sorry for the inconvenience.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          router.push("/cart");
        } else {
          setCurrentOrder(res?.newOrder || null);
          toast({
            title: "Order placed successfully",
            description: "We've placed your order",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
          // console.log("Order data:", res.newOrder);
        }
      } catch (error) {
        console.error("Error placing the order:", error);
        setIsLoading(false);
      }
    } else if(!checkoutSession) {
      router.push("/cart");
    }
  };

  useEffect(() => {
    if (!sessionId) {
      router.push("/cart");
    }
    if (sessionId && cart) {
      handlePlaceOrder();
    }
  }, [cart]);

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

  if (!cart) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Text
          style={{
            color: "black",
          }}
          size="1.2rem"
          align="center"
        >
          {!cart ? (
            "Your cart is empty."
          ) : (
            <>
              <Spinner
                thickness="2px"
                speed="0.65s"
                emptyColor={theme.colors.gray}
                color={theme.colors.ci}
                size="md"
              />
              Please Wait, We are are processsing your request.
            </>
          )}
        </Text>
      </Flex>
    );
  }

  // console.log("curr ", currentOrder);

  return (
    <Box padding="2%">
      {!isLoading && <OrderPlaced currentOrder={currentOrder} />}
    </Box>
  );
}
