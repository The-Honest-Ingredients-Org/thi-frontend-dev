"use client";

// imports
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { theme } from "@/context/providers";
import { BiLeaf } from "react-icons/bi";
import { GiThreeLeaves } from "react-icons/gi";
import { ImFire } from "react-icons/im";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import MainPageImageSlider from "@/components/MainPageComponents/Sliders/MainPageImageSlider";
import { mainPageProducts } from "@/data/mainPageData";

import SwiperCore from "swiper";

function capitalizeWords(inputString: string) {
  const words = inputString.split("-");
  const capitalizedWords = words.map((word: string) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return "";
    }
  });
  const resultString = capitalizedWords.join(" ");
  return resultString;
}

export default function TopPage() {
  const [activeButton, setActiveButton] = useState(0);
  const [my_swiper, set_my_swiper] = useState<SwiperCore | null>(null);

  const productKeys = Object.keys(mainPageProducts);
  const styles = {
    btnStyles: {
      color: theme.colors.whiteBg,
      backgroundColor: "transparent",
    },
  };
  return (
    <Flex
      height="90vh"
      width="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="0.5em"
      position="relative"
      display={{base: "none", md: "flex"}}
    >
      <Flex
        position="absolute"
        left={0}
        zIndex={-1}
        width="50vw"
        height="full"
        bgImage="/assets/topPageBg.svg"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        {" "}
      </Flex>
      <Text
        textAlign="center"
        fontSize={{ base: "1.5rem", md: "2rem", xl: "2.4rem" }}
      >
        <span style={{ color: theme.colors.whiteBg }}>THE HONEST </span>
        INGREDIENT
      </Text>
      <Flex
        height="60vh"
        width="100%"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Flex
          width="35%"
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
          paddingX="5%"
          gap="4vh"
        >
          <Text
            fontSize={{ base: "2rem", xl: "2.5rem" }}
            color={theme.colors.white}
          >
            <Text as="span" color={`${theme.colors.iconColor}`}>
              Quality
            </Text>{" "}
            That&apos;s as Pure as{" "}
            <Text as="span" color={`${theme.colors.iconColor}`}>
              Nature
            </Text>{" "}
            Itself.
          </Text>
          <Flex
            fontSize={{ base: "1rem", xl: "1.2rem" }}
            color={theme.colors.whiteBg}
          >
            Unveiling Nature&apos;s Goodness: Explore The Honest
            Ingredient&apos; Delightful World of Dry Fruits, Nuts, and Spices!
          </Flex>
        </Flex>
        <Flex
          height="100%"
          width="30%"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            height={{ base: "200px", md: "250px", xl: "300px" }}
            width={{ base: "200px", md: "250px", xl: "300px" }}
            borderRadius="50%"
            border={"1px solid black"}
            overflow="hidden"
          >
            <MainPageImageSlider
              set_my_swiper={set_my_swiper}
              setActiveButton={setActiveButton}
            />
          </Flex>
        </Flex>
        <Flex
          height="100%"
          width="35%"
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          padding="2%"
          paddingRight="6%"
        >
          <Flex fontSize={{ base: "1.6rem", xl: "2rem" }}>
            {capitalizeWords(productKeys[activeButton])}
          </Flex>
          <Flex fontSize={{ xl: "1.2rem" }}>
            {mainPageProducts[productKeys[activeButton]]}
          </Flex>
          <Flex width="100%" alignItems="center" justifyContent="flex-start">
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
                marginRight="6%"
                onClick={() => {
                  my_swiper?.slideTo(index);
                }}
              >
                {productKey === "spices" && <ImFire size={25} />}
                {productKey === "dry-fruits" && <BiLeaf size={25} />}
              </Button>
            ))}
          </Flex>
          <Flex>
            <Link
              as={NextLink}
              href={`/products/${productKeys[activeButton]}`}
            >
              <Button
                height="100%"
                width="100%"
                bgColor={theme.colors.main}
                color={theme.colors.white}
                fontSize={{ base: "1rem", xl: "1.2rem" }}
                borderRadius="1rem"
                padding="1rem 4rem"
                fontWeight="light"
                _hover={{ color: theme.colors.iconColor }}
              >
                Explore Products
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
