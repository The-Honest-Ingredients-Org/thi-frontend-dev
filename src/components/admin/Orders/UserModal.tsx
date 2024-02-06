import { Box, ModalBody, Text } from "@chakra-ui/react";
import React from "react";

interface UserProps {
  name: string;
  email: string;
  phoneNumber: string;
  shippingAddress: string;
}

export default function UserModal({name, email, phoneNumber, shippingAddress}: UserProps) {
  return (
    <ModalBody maxHeight="70vh" overflow="scroll">
      <Box mb={5}>
        <Text color="black">Name :</Text>
        <Text>{name}</Text>
      </Box>
      <Box mb={5}>
        <Text color="black">Email :</Text>
        <Text>{email}</Text>
      </Box>
      <Box mb={5}>
        <Text color="black">Phone no. :</Text>
        <Text>{phoneNumber}</Text>
      </Box>
      <Box mb={5}>
        <Text color="black">Address :</Text>
        <Text>{shippingAddress}</Text>
      </Box>
    </ModalBody>
  );
}
