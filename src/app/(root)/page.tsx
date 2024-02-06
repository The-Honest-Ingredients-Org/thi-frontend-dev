"use client";

// imports
import React from "react";
import { Flex } from "@chakra-ui/react";
import TopPage from "@/components/MainPage/TopPage";
import BestPicks from "@/components/MainPage/BestPicks";
import TasteHonesty from "@/components/MainPage/TasteHonesty";
import Information from "@/components/MainPage/Information";
import Testimonials from "@/components/MainPage/Testimonials";

import ExtraAdverstisements from "@/components/MainPage/ExtraAdverstisements";
import FAQ from "@/components/MainPage/FAQ";
import TopPageMobile from "@/components/MainPage/TopPageMobile";

export default function Home() {
  return (
    <Flex
      height="fit-content"
      width="100%"
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
    >
      <TopPage />
      <TopPageMobile />
      {/* <Information /> */}
      <TasteHonesty />
      <BestPicks />
      <ExtraAdverstisements />
      <Testimonials />
      <FAQ />
    </Flex>
  );
}
