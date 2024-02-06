import React, { useState } from "react";
import { useReadCart } from "@/swr/user/cart/cart";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { theme } from "@/context/providers";

const publish = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
const stripePromise = loadStripe(publish);

export default function OnlinePayment({ completeOrder }: any) {
  const router = useRouter();
  const toast = useToast();
  let token: string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }
  const { cart } = useReadCart({
    token: token,
  });

  const checkout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe is not available.");
      return;
    }

    const response = await fetch(
      "https://thi-api.onrender.com/api/user/checkout",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to create checkout session.");
      return;
    }

    const { sessionId } = await response.json();
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      router.push("/cart");
    } else {
      router.push("/order-placed");
    }
  };
  return (
    <Box mt={10}>
      <Button
        fontSize="1.2rem"
        onClick={checkout}
        bgColor={theme.colors.main}
        color={theme.colors.white}
        _hover={{
          bgColor: "transparent",
          color: theme.colors.main,
          border: `1px solid ${theme.colors.main}`,
        }}
      >
        Pay Online
      </Button>
    </Box>
  );
}
