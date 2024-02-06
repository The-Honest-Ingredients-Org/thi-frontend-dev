"use client";

import React from "react";
import Head from "next/head";
import InformationPage from "@/components/RegistrationPage/Information";
import { Flex } from "@chakra-ui/react";
import Forgot from "@/components/Forgotpage/Forgot";

export default function ForgotPage({ params }: { params: { slug: string } }) {
  let token = "";
  let _id = "";
  if (params?.slug) {
    if(params?.slug[0]) token = params?.slug[0];
    if(params?.slug[1]) _id = params?.slug[1];
  }

  return (
    <>
      <Head>
        <title>Forgot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex height={"100vh"} width={"100%"}>
        <InformationPage />
        <Forgot token={token} _id={_id} />
      </Flex>
    </>
  );
}
