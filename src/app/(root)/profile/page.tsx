"use client";

import ProfileForm from "@/components/profile/ProfileForm";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
// imports
import React, { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  let token : string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  return (
    <Flex position="relative">
      <Box
        padding={{ base: "15px", md: "30px", lg: "70px" }}
        width={{ base: "100%", lg: "55%" }}
      >
        <Text fontSize="1.5rem">Welcome</Text>
        <Text mb={10}>* please fill all details for faster checkouts</Text>
        <ProfileForm />
      </Box>
      <Box
        display={{ base: "none", lg: "block" }}
        width="45%"
        height="90vh"
        bgImage="/assets/profileBg.svg"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        position="fixed"
        right={0}
        zIndex={-1}
      ></Box>
    </Flex>
  );
}
