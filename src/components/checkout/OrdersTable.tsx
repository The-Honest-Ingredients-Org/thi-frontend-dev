import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

interface OrderTableProps {
  products: {
    product: {
      _id: string;
      name: string;
      description: string;
      images: string[];
    };
    quantity: string;
    size: string;
    totalPrice: number;
    discountedPrice:number;
    _id: string;
  }[];
  totalAmount: number;
  discountedAmount: number;
}

export default function OrdersTable({
  products,
  totalAmount,
  discountedAmount
}: OrderTableProps) {
  return (
    <TableContainer my={10} border="1px solid gray" borderRadius={10}>
      <Table variant="simple">
        <Thead bgColor="gray.100">
          <Tr>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Size</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map((product) => (
            <Tr key={product?._id}>
              <Td>{product?.product.name}</Td>
              <Td>{product?.quantity}</Td>
              <Td>{product?.size}</Td>
              <Td>₹ {product?.discountedPrice.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot bgColor="gray.100">
          <Tr>
            <Th colSpan={3}>Subtotal</Th>
            <Th>
              ₹{" "}
              {totalAmount}
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={3}>Shipping</Th>
            <Th>₹ 0</Th>
          </Tr>
          <Tr>
            <Th colSpan={3}>Total After Offer</Th>
            <Th>
              ₹{" "}
              {discountedAmount}
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
