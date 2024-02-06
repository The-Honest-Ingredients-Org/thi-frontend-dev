"use client";

import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import RegistrationForm from "./RegistrationForm";
import NextLink from "next/link";

export default function Registration() {
  return (
    <Flex
      height={"100%"}
      width={{ base: "full", lg: "50%" }}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Text fontSize={{ base: "2xl", lg: "3xl" }}>Create Your Account</Text>
      <Flex marginTop={"5"} width={{ base: "90%", lg: "80%" }}>
        <RegistrationForm />
      </Flex>
      <Flex mt={10} gap={2}>
        <Text>Already have an account?</Text>
        <Text as={NextLink} color="blue.600" href="/login">Login</Text>
      </Flex>
    </Flex>
  );
}
