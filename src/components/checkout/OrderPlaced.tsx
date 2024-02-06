/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import { theme } from "@/context/providers";
import { Box, Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import OrdersTable from "@/components/checkout/OrdersTable";

export default function OrderPlaced({currentOrder}: any) {
  const router = useRouter();
  let token: string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }

  function formatDate(inputDate: string | number | Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <Box padding="2%">
      <Text fontSize="1.5rem">Congratulations!!</Text>
      <Text mb={10}>Your spicy order has been placed and ready</Text>
      <Flex direction="column" gap={5}>
        <Flex gap={10}>
          <Text>Order number</Text>
          <Text color="gray">{currentOrder?.orderId}</Text>
        </Flex>
        <Flex gap={10}>
          <Text>Date and time</Text>
          <Text color="gray">{formatDate(currentOrder?.createdAt)}</Text>
        </Flex>
        <Flex gap={10}>
          <Text>Payment mode</Text>
          <Text color="gray">{currentOrder?.modeOfPayment}</Text>
        </Flex>
        <Flex gap={10}>
          <Text>Shipping address</Text>
          <Box color="gray">
            <p>{currentOrder?.user?.name}</p>
            <p>{currentOrder?.shippingAddress}</p>
            <p>{currentOrder?.user?.city}</p>
            <p>{currentOrder?.user?.pincode}</p>
            <p>{currentOrder?.user?.state}</p>
            <p>{currentOrder?.user?.phoneNumber}</p>
            <p>{currentOrder?.user?.email}</p>
          </Box>
        </Flex>
      </Flex>
      <OrdersTable
        products={currentOrder?.products}
        totalAmount={currentOrder?.totalAmount}
        discountedAmount={currentOrder?.discountedAmount}
      />
      <Button
        type="submit"
        fontWeight="normal"
        bgColor={`${theme.colors.main}`}
        color={`${theme.colors.whiteBg}`}
        mt={10}
        _hover={{
          color: `${theme.colors.iconColor}`,
          bgColor: `${theme.colors.hoverBg}`,
        }}
        onClick={() => router.push("/orders")}
      >
        Go to orders
      </Button>
    </Box>
  );
}
