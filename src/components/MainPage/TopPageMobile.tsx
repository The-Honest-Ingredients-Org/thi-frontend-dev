"use client";

// imports
import React, { useState } from "react";
import NextLink from "next/link";
import { theme } from "@/context/providers";
import { BiLeaf } from "react-icons/bi";
import { ImFire } from "react-icons/im";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { mainPageProducts } from "@/data/mainPageData";

import SwiperCore from "swiper";
import MobileSlider from "../MainPageComponents/Sliders/MobileSlider";

export default function TopPageMobile() {
  const [activeButton, setActiveButton] = useState(0);
  const [my_swiper, set_my_swiper] = useState<SwiperCore | null>(null);

  const productKeys = Object.keys(mainPageProducts);

  return (
    <Box
      display={{ base: "block", md: "none" }}
      width="100%"
      position="relative"
      textAlign="center"
      mb="25px"
    >
      <Flex mb={5} alignItems="center" justifyContent="center">
        <Flex overflow="hidden">
          <MobileSlider
            set_my_swiper={set_my_swiper}
            setActiveButton={setActiveButton}
          />
        </Flex>
      </Flex>
      <Flex direction="column" gap={6} px="30px">
        <Text fontSize={{ base: "1.6rem", xl: "2rem" }}>
          {productKeys[activeButton] === "DryFruits" ? "Dry fruits" : "Spices"}
        </Text>
        <Text fontSize={{ xl: "1.2rem" }} maxWidth="500px" mx="auto">
          {mainPageProducts[productKeys[activeButton]]}
        </Text>
        <Flex alignItems="center" gap={8} justifyContent="center">
          {productKeys.map((productKey, index) => (
            <Button
              key={index}
              alignItems="center"
              justifyContent="center"
              height="50px"
              width="50px"
              backgroundColor={
                activeButton === index ? theme.colors.main : "none"
              }
              borderRadius="50%"
              border={`1px solid ${
                activeButton === index
                  ? theme.colors.iconColor
                  : theme.colors.main
              }`}
              color={
                activeButton === index
                  ? theme.colors.iconColor
                  : theme.colors.main
              }
              _hover={{}}
              onClick={() => {
                my_swiper?.slideTo(index);
              }}
            >
              {productKey === "Spices" && <ImFire size={25} />}
              {productKey === "DryFruits" && <BiLeaf size={25} />}
            </Button>
          ))}
        </Flex>
        <Flex justifyContent="center">
          <Button
            height="100%"
            width="100%"
            maxWidth="300px"
            bgColor={theme.colors.main}
            color={theme.colors.white}
            fontSize={{ base: "1rem", xl: "1.2rem" }}
            borderRadius="1rem"
            padding="1rem 4rem"
            fontWeight="light"
            _hover={{ color: theme.colors.iconColor }}
            as={NextLink}
            href={`/products/${
              productKeys[activeButton] == "DryFruits" ? "dry-fruits" : "spices"
            }`}
          >
            Explore Products
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
