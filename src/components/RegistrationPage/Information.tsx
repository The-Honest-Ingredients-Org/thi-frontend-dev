"use client";

// imports
import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "@/context/providers";

export default function InformationPage() {
  return (
    <Flex
      height={"100%"}
      width={"50%"}
      bgColor={theme.colors.main}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap="5vh"
      display={{base: "none", lg: "flex"}}
    >
      <Flex
        height={"15vh"}
        width={"80%"}
        alignItems={"center"}
        fontSize={"2.2rem"}
        color={theme.colors.whiteBg}
      >
        <Image
          src="/assets/logo.svg"
          alt="logo"
          height={"100%"}
          width={"100%"}
        />
      </Flex>
      <Text
        width={"80%"}
        fontSize={"1.5rem"}
        color={theme.colors.whiteBg}
        textAlign="center"
      >
        Uncompromising Quality, One Bite at a Time.
      </Text>
      <Text
        width={"80%"}
        fontSize={"1.0rem"}
        color={theme.colors.whiteBg}
        textAlign="center"
      >
        Unlock Flavorful Delights: THI Login - Your Gateway to a World of Spices and Dry Fruits. Join Our Community of Culinary Enthusiasts.
      </Text>
      <Flex
        width={"80%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image
          alt="pic"
          src={"/assets/registrationPage.svg"}
          height={"30vh"}
          width={"100%"}
        />
      </Flex>
    </Flex>
  );
}
