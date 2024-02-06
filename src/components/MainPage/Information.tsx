"use client";

// imports
import React from "react";
import { Flex } from "@chakra-ui/react";
import { theme } from "@/context/providers";
import InformationSlider from "../MainPageComponents/Sliders/InformationSlider";

export default function Information() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width="100%"
      bgColor={theme.colors.white}
      my={{base: "50px"}}
    >
      <Flex
        marginX={{base:"20px", lg: "70px"}}
        bgColor={theme.colors.main}
        borderRadius="1.2rem"
        overflow="hidden"
      >
        <InformationSlider />
      </Flex>
    </Flex>
  );
}
