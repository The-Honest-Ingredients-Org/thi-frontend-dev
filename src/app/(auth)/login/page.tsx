"use client";

// imports
import React from "react";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import InformationPage from "@/components/RegistrationPage/Information";
import Login from "@/components/LoginPage/Login";

export default function LoginPage() {
  return (
    <>
      <Head>
        {/* community name here */}
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex height={"100vh"} width={"100%"}>
        <InformationPage />
        <Login />
      </Flex>
    </>
  );
}
