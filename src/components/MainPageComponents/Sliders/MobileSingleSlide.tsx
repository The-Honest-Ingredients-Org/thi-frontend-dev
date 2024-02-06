import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function MobileSingleSlide({ image }: any) {
  return (
    <Flex
      bgImage={`/assets/${image}.svg`}
      bgRepeat="no-repeat"
      bgPos="center"
      bgSize="cover"
      height={"40vh"}
      width={"100%"}
      color="white"
    >
      <Flex bgColor="#0000006a" height="full"
       width="full" direction="column"
       justifyContent="center" >
        <Text
          textAlign="center"
          fontSize={{ base: "1.7rem", md: "2rem" }}
          mb={2}
        >
          THE HONEST <br />
          INGREDIENT
        </Text>

        <Text fontSize={{ base: "1.2rem", md: "1.5rem" }} px="20px">
          Quality That&apos;s as Pure as Nature Itself.
        </Text>
      </Flex>
    </Flex>
  );
}
