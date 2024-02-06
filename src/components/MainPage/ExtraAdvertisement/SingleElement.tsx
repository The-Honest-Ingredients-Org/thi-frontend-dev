"use client";

import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { theme } from "@/context/providers";

export default function SingleElement({ data }: any) {
  return (
    <Flex
      my={{ base: "50px" }}
      marginX={{ base: "15px", md: "30px", lg: "70px" }}
      bgColor={theme.colors.main}
      borderRadius={"20px"}
      textAlign="left"
      direction={{ base: "column-reverse", lg: "row" }}
    >
      <Flex
        direction="column"
        padding={{ base: "6%", lg: "4%" }}
        gap="30px"
        width={{ base: "100%", lg: "60%" }}
      >
        <Text
          color={theme.colors.iconColor}
          fontSize={{ base: "1.6rem", lg: "2rem", xl: "2.5rem" }}
        >
          {data?.heading}
        </Text>
        <Text
          color="white"
          fontSize={{ base: "0.9rem ", lg: "1rem", xl: "1.2rem" }}
        >
          {data?.content}
        </Text>
      </Flex>
      <Flex
        width={{ base: "100%", lg: "40%" }}
        // height={{ base: "300px", lg: "" }}
      >
        <Image
          alt="img"
          src={`/assets/${data?.image}`}
          objectFit="cover"
          width="100%"
          height="100%"
          borderRadius={{ base: "20px 20px 0 0", lg: "0 20px 20px 0" }}
        />
      </Flex>
    </Flex>
  );
}
