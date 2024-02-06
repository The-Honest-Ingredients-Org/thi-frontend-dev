import { theme } from "@/context/providers";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsQrCode, BsTruck } from "react-icons/bs";
import OnlinePayment from "./OnlinePayment";
import CODModal from "./CODModal";
import { useReadCart } from "@/swr/user/cart/cart";
import { createOrder } from "@/app/api/user/user";

export default function PaymentMethod({ setActiveStep, setCurrentOrder }: any) {
  const [mode, setMode] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  let token: string = "";

  if(typeof window !== 'undefined') {
    token = localStorage.getItem("access_token") || "";
  }

  const { cart, isLoading, error } = useReadCart({
    token: token,
  });

  let isCOD = true;
  let isOnline = true;

  for (const product of cart?.userCart?.products ?? []) {
    if (!product.product.paymentOptions.includes("COD")) {
      isCOD = false;
    }
    if (!product.product.paymentOptions.includes("Online")) {
      isOnline = false;
    }
    if (!isCOD && !isOnline) {
      break;
    }
  }

  const completeOrder = async (modeOfPayment: string) => {
    try {
      const res = await createOrder({
        products: cart?.userCart?.products,
        totalAmount: cart?.userCart?.totalAmount,
        discountedAmount: cart?.userCart?.discountedAmount,
        modeOfPayment,
        shippingAddress: cart?.userCart?.user?.shippingAddress
      });
      if (
        res?.message == "Invalid product or variant selected" ||
        res?.message == "Internal server error" ||
        !res?.newOrder
      ) {
        toast({
          title: "Some error occured",
          description: "Failed to place an order, sorry for the inconvinience.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return { error: "Cannot place order" };
      } else {
        toast({
          title: "Order placed successfully",
          description: "We've placed your order",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setCurrentOrder(res?.newOrder)
        return { success: "Order placed", newOrder: res?.newOrder };
      }
    } catch (error) {
      toast({
        title: "Some error occured",
        description: "Failed to place an order, sorry for the inconvinience.",
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
    <Box>
      <Text fontSize="1.2rem" mb={5}>
        Select the payment mode
      </Text>
      <Flex gap={{ base: 10, md: 20 }}>
        {isCOD && (
          <Flex
            direction="column"
            alignItems="center"
            gap={5}
            p={6}
            bgColor={theme.colors.main}
            borderRadius={10}
            color={mode === 0 ? theme.colors.iconColor : "white"}
            _hover={{ bgColor: theme.colors.hoverBg }}
            cursor="pointer"
            onClick={() => setMode(0)}
          >
            <BsTruck size={50} />
            <Text textAlign="center">Cash on delivery</Text>
          </Flex>
        )}
        {isOnline && (
          <Flex
            direction="column"
            alignItems="center"
            gap={5}
            p={6}
            bgColor={theme.colors.main}
            borderRadius={10}
            color={mode === 1 ? theme.colors.iconColor : "white"}
            _hover={{ bgColor: theme.colors.hoverBg }}
            cursor="pointer"
            onClick={() => setMode(1)}
          >
            <BsQrCode size={50} />
            <Text textAlign="center">Online payment</Text>
          </Flex>
        )}
      </Flex>
      {mode === 1 && <OnlinePayment completeOrder={completeOrder} />}
      <Flex gap={10}>
        <Button
          type="submit"
          fontWeight="normal"
          bgColor={`${theme.colors.main}`}
          color={`${theme.colors.whiteBg}`}
          mt={10}
          onClick={() => setActiveStep(0)}
          _hover={{
            color: `${theme.colors.iconColor}`,
            bgColor: `${theme.colors.hoverBg}`,
          }}
        >
          {"< Back"}
        </Button>
        {mode === 0 && (
          <Button
            type="submit"
            fontWeight="normal"
            bgColor={`${theme.colors.main}`}
            color={`${theme.colors.whiteBg}`}
            mt={10}
            // onClick={() => setActiveStep(2)}
            onClick={onOpen}
            _hover={{
              color: `${theme.colors.iconColor}`,
              bgColor: `${theme.colors.hoverBg}`,
            }}
          >
            {"Confirm COD"}
          </Button>
        )}
        <CODModal
          isOpen={isOpen}
          onClose={onClose}
          setActiveSteps={setActiveStep}
          completeOrder={completeOrder}
        />
      </Flex>
    </Box>
  );
}
