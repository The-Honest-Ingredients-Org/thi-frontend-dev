import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import SingleOrder from "./SingleOrder";

interface OrderesTabProps {
  orders: {
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
  }[];
}

export default function OrderesTab({ orders }: OrderesTabProps) {
  return (
    <Flex direction="column" gap={10}>
      {orders.length != 0 ? orders.map((order) => (
        <SingleOrder key={order._id} order={order} />
      )) : <Text align="center" >No Items Here.</Text>}
    </Flex>
  );
}
