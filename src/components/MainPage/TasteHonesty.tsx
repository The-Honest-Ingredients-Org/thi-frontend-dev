"use client";

// imports
import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "@/context/providers";

export default function TasteHonesty() {
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      margin="5vh 0"
    >
      <Flex
        bgColor={theme.colors.main}
        height="100%"
        alignItems="center"
        marginX={{ base: "15px", md: "30px", lg: "70px" }}
        borderRadius="1rem"
        overflow="hidden"
        direction={{ base: "column", lg: "row" }}
      >
        <Flex
          height="100%"
          width={{ base: "100%", lg: "65%" }}
          textAlign={{ base: "center", lg: "left" }}
          direction="column"
          justifyContent="center"
          padding={{base: "6%", md:"4%"}}
          gap="25px"
        >
          <Text
            color={theme.colors.iconColor}
            fontSize={{ base: "1.7rem", md: "2rem", xl: "2.5rem" }}
          >
            Taste the Honesty
          </Text>
          <Text
            color={theme.colors.white}
            fontSize={{ base: "1rem", md: "1.1rem", xl: "1.3rem" }}
          >
            From the garden to your table, our handpicked herbs are the secret
            to adding aromatic perfection to your culinary journey.
          </Text>
        </Flex>
        <Flex height={{base: "200px", lg: "100%"}} width={{base: "100%", lg: "35%"}}>
          <Image
            alt="img"
            src="/assets/tastehonesty.svg"
            objectFit="cover"
            height="100%"
            width="100%"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
