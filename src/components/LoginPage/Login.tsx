"use client";

import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <Flex
      height={"100%"}
      width={{base: "full", lg: "50%"}}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Text
        fontSize={{ base: "2xl", lg: "3xl" }}
      >
        Login Your Account
      </Text>
      <Flex mt={14} width={{base: "90%", lg: "80%"}}>
        <LoginForm />
      </Flex>
      <Flex mt={10} gap={2}>
        <Text>{"Don't have an account?"}</Text>
        <Text as={NextLink} color="blue.600" href="/register">Sign up</Text>
      </Flex>
        <Text mt={2} as={NextLink} color="blue.600" href="/forgot">Forgot password?</Text>
    </Flex>
  );
}
