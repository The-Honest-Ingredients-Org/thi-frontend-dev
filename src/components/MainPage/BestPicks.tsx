"use client";

// imports
import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import BestPicksSlider from "../MainPageComponents/Sliders/BestPicksSlider";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { theme } from "@/context/providers";

const styles = {
  btnStyle: {
    padding: "5px",
    borderRadius: "50%",
    backgroundColor: theme.colors.main,
    "&:hover": { backgroundColor: "#4b4b4b" },
  },
};

export default function BestPicks() {
  return (
    <Flex
      height="fit-content"
      width="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Flex
        height="15vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
        fontSize={{ base: "1.5rem", xl: "1.7rem" }}
      >
        OUR BEST PICKS
      </Flex>

      <BestPicksSlider />
    </Flex>
  );
}
