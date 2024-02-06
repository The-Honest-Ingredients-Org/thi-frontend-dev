import {
  Box,
  Flex,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MainModal from "./Orders/MainModal";
import { useFetchAllCarts } from "@/swr/admin/cart/useFetchCarts";
import { theme } from "@/context/providers";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  orders: any[];
  cart: string;
  city: string;
  phoneNumber: string;
  pincode: number;
  shippingAddress: string;
  state: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  type: string;
  images: string[];
}

interface CartProduct {
  product: Product;
  quantity: string;
  size: string;
  totalPrice: number;
  _id: string;
}

interface Cart {
  _id: string;
  user: User;
  products: CartProduct[];
  totalAmount: number;
  discountedAmount: number;
  totalProductDiscounts: number;
  __v: number;
}

export default function UserData() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState("user");
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  const { data, isLoading, error } = useFetchAllCarts();

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
      <MainModal
        isOpen={isOpen}
        onClose={onClose}
        modal={modal}
        cart={selectedCart}
      />
      <Text fontSize={{ base: "1.3rem", lg: "1.5rem" }}>User Data</Text>
      <Text>List of users having non empty cart sorted by total value</Text>
      <TableContainer
        my={10}
        border="1px solid gray"
        borderRadius={10}
        height="50vh"
      >
        <Table>
          <Thead>
            <Tr>
              <Th>S.NO.</Th>
              <Th>Name</Th>
              <Th>Ph. no.</Th>
              <Th>Cart items</Th>
              <Th>Cart value</Th>
              <Th>Discounted value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((cart: Cart, index: number) => (
              <Tr key={cart._id}>
                <Td>{index + 1}</Td>
                <Td>{cart.user.name}</Td>
                <Td>{cart.user.phoneNumber}</Td>
                <Td>
                  <Link
                    color="blue.500"
                    onClick={() => {
                      setSelectedCart(cart);
                      setModal("list2");
                      onOpen();
                    }}
                  >
                    list
                  </Link>
                </Td>
                <Td>₹ {cart.totalAmount.toFixed(2)}</Td>
                <Td>₹ {cart.totalProductDiscounts.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
