import {
  ModalBody,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

interface Product {
  product: {
    _id: string;
    name: string;
    description: string;
    type: string;
    images: string[];
  };
  quantity: string;
  size: string;
  totalPrice: number;
  discountedPrice: number;
  _id: string;
}

interface Order {
  products: Product[];
}

export default function OrderListModal({ products }: Order) {
  return (
    <ModalBody maxHeight="70vh" overflow="scroll">
      <TableContainer mt={10} border="1px solid gray" borderRadius={10}>
        <Table>
          <Thead>
            <Tr>
              <Th>S.NO.</Th>
              <Th>Product</Th>
              <Th>Size</Th>
              <Th>Quantity</Th>
              <Th>Original Price</Th>
              <Th>Discounted Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((product, index) => (
              <Tr key={product?._id} >
                <Td>{index + 1}</Td>
                <Td>{product?.product.name}</Td>
                <Td>{product?.size}</Td>
                <Td>{product?.quantity}</Td>
                <Td>₹ {product?.totalPrice}</Td>
                <Td>₹ {product?.discountedPrice}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ModalBody>
  );
}
