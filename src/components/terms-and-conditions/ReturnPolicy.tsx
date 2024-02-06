"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function ReturnPolicy() {
  return (
    <Box padding={{ base: "15px", md: "30px", lg: "70px" }}>
      <Text fontSize="1.7rem" mb={10}>Returns and Return Shipping</Text>
      Every product sold at thifood.com is covered under our 7-Day Return Policy. Notify us about problems, packaging issues, or damages within 7 days from the date of delivery, and we will either send a replacement product to you or refund your money. 
    </Box>
  );
}
