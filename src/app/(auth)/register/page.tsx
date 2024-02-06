"use client";

// imports
import React from "react";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import Registration from "@/components/RegistrationPage/Registration";
import InformationPage from "@/components/RegistrationPage/Information";

export default function SignupPage() {
  return (
    <>
      <Head>
        {/* community name here */}
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex height={"100vh"} width={"100%"}>
        <InformationPage />
        <Registration />
      </Flex>
    </>
  );
}
