"use client";

import React from "react";
import { Button, Flex, Image } from "@chakra-ui/react";
import { theme } from "@/context/providers";
import { AiFillStar } from "react-icons/ai";

export default function TestimonialSlide() {
  const style = {
    color: theme.colors.iconColor,
  };
  return (
    <Flex
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
      direction="column"
      alignItems="center"
      gap={5}
    >
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: 0,
          width: "100%",
          height: "70%",
          background: theme.colors.main,
          borderRadius: "0.5rem",
          content: "",
        }}
      />
      <Flex
        height={{base: "170px", lg: "200px"}}
        width={{base: "170px", lg: "200px"}}
        zIndex="199999"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          borderRadius="full"
          //   boxSize="50px"
          objectFit="cover"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
      </Flex>
      <Flex
        height="10vh"
        width="100%"
        zIndex="199999"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          color={theme.colors.white}
          fontSize="1.5rem"
          textAlign="center"
        >
          Paarth Jain
        </Flex>
        <Flex
          height="40%"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <AiFillStar style={style} size={30} />
          <AiFillStar style={style} size={30} />
          <AiFillStar style={style} size={30} />
          <AiFillStar style={style} size={30} />
        </Flex>
      </Flex>
      <Flex
        
        width="100%"
        zIndex="199999"
        color={theme.colors.white}
        fontSize="1rem"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        background={theme.colors.main}
        borderRadius="0.5rem"
        pb={10}
        px={5}
      >
        &quot;The Honest Ingredient has transformed my snacking habits. Their
        quality of dry fruits is unmatched, and the flavors speak of
        authenticity with every bite. A loyal customer for life! &quot;
      </Flex>
    </Flex>
  );
}
