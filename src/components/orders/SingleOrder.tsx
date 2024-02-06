import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import OrderedItem from "./OrderedItem";

interface OrderProps {
  order: {
    _id: string;
    orderId: string;
    products: [
      {
        product: {
          _id: string;
          name: string;
          description: string;
          images: [string];
          type: string;
        };
        quantity: number;
        size: string;
        totalPrice: number;
      }
    ];
    status: string;
    totalAmount: number;
    discountedAmount: number;
    createdAt: string;
    confirmedAt: string;
    arrivingAt: string;
    deliveredAt: string;
    cancelledAt: string;
  };
}

export default function SingleOrder({ order }: OrderProps) {
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
    <Box border="1px solid gray" borderRadius={5}>
      <Flex
        gap={10}
        justifyContent="space-between"
        p={5}
        bgColor="gray.100"
        mb={2}
        borderTopRadius={5}
      >
        <Flex gap={10}>
          <Box>
            <Text fontSize="0.8rem">ORDER PLACED</Text>
            <Text>{formatDate(order.createdAt)}</Text>
          </Box>
          {order.status != "Pending" ? (
            order.cancelledAt != "" ? (
              <Box>
                <Text fontSize="0.8rem">CANCELLED AT</Text>
                <Text>{formatDate(order.cancelledAt)}</Text>
              </Box>
            ) : order.deliveredAt != "" ? (
              <Box>
                <Text fontSize="0.8rem">DELIVERED AT</Text>
                <Text>{formatDate(order.deliveredAt)}</Text>
              </Box>
            ) : order.arrivingAt != "" ? (
              <Box>
                <Text fontSize="0.8rem">ARRIVING AT</Text>
                <Text>{formatDate(order.arrivingAt)}</Text>
              </Box>
            ) : order.confirmedAt != "Pending" ? (
              <Box>
                <Text fontSize="0.8rem">ARRIVING AT</Text>
                <Text>{formatDate(order.confirmedAt)}</Text>
              </Box>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          <Box>
            <Text fontSize="0.8rem">TOTAL</Text>
            <Text>₹ {order.totalAmount.toFixed(2)}</Text>
          </Box>
          <Box>
            <Text fontSize="0.8rem">TOTAL AFTER DISCOUNT</Text>
            <Text>₹ {order.discountedAmount.toFixed(2)}</Text>
          </Box>
        </Flex>
        <Box>
          <Text fontSize="0.8rem">ORDER</Text>
          <Text>{order.orderId}</Text>
        </Box>
      </Flex>
      <Box p={5}>
        {order.products.map((product) => (
          <OrderedItem key={product.product._id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
