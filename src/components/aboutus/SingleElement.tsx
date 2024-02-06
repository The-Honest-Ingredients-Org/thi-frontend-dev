import { Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function SingleElement({ data, index }: any) {
  return (
    <Flex
      direction="column"
      height="full"
      alignItems="center"
      justifyContent="center"
      bgImage="/assets/aboutus/1.svg"
      bgRepeat="no-repeat"
      bgSize="cover"
      color="white"
    >
      <Text>Story of our{index < 4 ? " spices" : " dry fruits"}</Text>
      <Divider width="15%" />
      <Text fontSize={{ base: "1.5rem", lg: "1.7rem" }}>{data?.heading}</Text>
      <Text width={{ base: "90%", md: "70%", lg: "50%" }} mt="2vh">
        {data?.content}
      </Text>
    </Flex>
  );
}
