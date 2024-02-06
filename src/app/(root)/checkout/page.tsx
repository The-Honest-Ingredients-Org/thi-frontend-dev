/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import OrderPlaced from "@/components/checkout/OrderPlaced";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ShippingDetails from "@/components/checkout/ShippingDetails";
import {
  Box,
  Flex,
  Spinner,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useGetUser from "@/swr/user/auth/useGetUser";
import { theme } from "@/context/providers";
import { useReadCart } from "@/swr/user/cart/cart";
import { ItemProps } from "@/components/CartPage/CartItem";

const steps = [
  { title: "First", description: "Shipping details" },
  { title: "Second", description: "Payment method" },
  // { title: "Third", description: "Order placed" },
];

export default function page() {
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const router = useRouter();
  const toast = useToast();

  let token: string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }

  const { user, isLoading, error } = useGetUser({
    token: token,
  });

  const {
    cart,
    isLoading: isLoad,
    error: isError,
  } = useReadCart({
    token: token,
  });

  useEffect(() => {
    const redirectToLoginPage = () => {
      if (!localStorage.getItem("access_token")) {
        router.push("/login");
      }
    };

    if (!cart || !cart?.userCart || cart?.userCart?.products?.length === 0) {
      router.push("/");
    } else if (
      cart &&
      cart?.userCart &&
      cart?.userCart?.products?.length !== 0
    ) {
      let flag = true;
      cart?.userCart?.products?.map((product: ItemProps) => {
        const variantSelected = product?.product?.variants?.find(
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
          flag = false;
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

      !flag && router.push("/cart");
    } else {
      redirectToLoginPage();
    }
  }, [cart, router, toast]);

  if (isLoading || isLoad) {
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

  if (error || isError) {
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
    <Box padding={{ base: "15px", md: "30px", lg: "70px" }}>
      <Text mb={10} fontSize="1.5rem">
        Checkout
      </Text>
      <Stepper size="lg" index={activeStep} mb={10}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0" display={{ base: "none", md: "block" }}>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <ShippingDetails profile={user} setActiveStep={setActiveStep} />
      )}
      {activeStep === 1 && (
        <PaymentMethod
          setActiveStep={setActiveStep}
          setCurrentOrder={setCurrentOrder}
        />
      )}
      {activeStep === 2 && <OrderPlaced currentOrder={currentOrder} />}
    </Box>
  );
}
