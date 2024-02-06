"use client";

// imports
import React from "react";
import { Flex } from "@chakra-ui/react";
import TestimonialsSlider from "../MainPageComponents/Sliders/TestimonialsSlider";

export default function Testimonials() {
  return (
    <Flex
      height="fit-content"
      width="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
      margin="8vh 0"
    >
      <Flex
        height="20vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Flex fontSize={{ base: "1.5rem", xl: "1.7rem" }}>TESTIMONIALS</Flex>
        <Flex fontSize="1.2rem" textAlign="center" px="30px">
          Whispers of Delight from Our Satisfied Customers
        </Flex>
      </Flex>

      <TestimonialsSlider />
    </Flex>
  );
}
