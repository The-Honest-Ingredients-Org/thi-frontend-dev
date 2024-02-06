"use client";

// imports
import React from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "@/context/providers";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import NextLink from "next/link";

export default function Footer() {
  const styles = {
    icons: {
      color: theme.colors.white,
      marginRight: "1.5rem",
      "&:hover": {
        color: theme.colors.iconColor,
      },
    },
    button: {
      color: theme.colors.white,
      backgroundColor: "transparent",
      padding: 0,
      margin: 0,
      fontWeight: "normal",
      "&:hover": {
        backgroundColor: "transparent",
        color: theme.colors.iconColor,
      },
    },
  };
  return (
    <Flex
      width="100%"
      bgColor={theme.colors.main}
      padding={{ base: "30px", md: "10vh" }}
      zIndex={10}
      justifyContent="space-between"
      // direction={{base: "column", lg: "row"}}
      flexWrap="wrap"
      gap={10}
    >
      <Flex width={{ lg: "33%" }} gap={10} direction="column">
        <Text
          width="100%"
          color={theme.colors.white}
          fontSize={{ base: "1rem", md: "1.1rem" }}
        >
          We invite you to savour life &apos;s true flavours, transforming
          ordinary moments into extraordinary memories with each bite.
        </Text>
        <Flex width="100%" alignItems="center">
          <Flex>
            <Image
              alt="iconlogo"
              src="/assets/logo.svg"
              height="70%"
              width="70%"
            />
          </Flex>
          <Flex direction="column" gap={4}>
            <Text color={theme.colors.white} textAlign="left">
              Connect with us
            </Text>
            <Flex width="100%" alignItems="center">
              <BsFacebook style={styles.icons} size={30} />
              <AiFillInstagram style={styles.icons} size={40} />
              <BsTwitter style={styles.icons} size={30} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        height="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          fontSize={{ base: "1.2rem", md: "1.4rem" }}
          color={theme.colors.white}
          alignItems="flex-start"
          justifyContent="flex-start"
          width="100%"
          marginBottom="1rem"
          direction="column"
        >
          <Flex width="100%" justifyContent="flex-start">
            Resources
          </Flex>
          <Flex width="40px" height="2px" bgColor={theme.colors.white}></Flex>
        </Flex>
        <Flex
          height="fit-content"
          width="100%"
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Button sx={styles.button} as={NextLink} href="/terms-and-conditions">
            Terms and Conditions
          </Button>
          <Button sx={styles.button} as={NextLink} href="/terms-and-conditions">
            Privacy Policy
          </Button>
          <Button sx={styles.button} as={NextLink} href="/terms-and-conditions">
            Shipping Policy
          </Button>
          <Button sx={styles.button} as={NextLink} href="/terms-and-conditions">
            Return and Refund Policy
          </Button>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        height="100%"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Flex
          fontSize={{ base: "1.2rem", md: "1.4rem" }}
          color={theme.colors.white}
          alignItems="flex-start"
          justifyContent="flex-start"
          width="100%"
          marginBottom="1rem"
          direction="column"
        >
          <Flex width="100%" justifyContent="flex-start">
            About
          </Flex>
          <Flex width="40px" height="2px" bgColor={theme.colors.white}></Flex>
        </Flex>
        <Button sx={styles.button} as={NextLink} href="/about-us">
          About Us
        </Button>
      </Flex>
      <Flex
        direction="column"
        height="100%"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Flex
          fontSize={{ base: "1.2rem", md: "1.4rem" }}
          color={theme.colors.white}
          alignItems="flex-start"
          justifyContent="flex-start"
          width="100%"
          marginBottom="1rem"
          direction="column"
        >
          <Flex width="100%" justifyContent="flex-start">
            Contact Us
          </Flex>
          <Flex width="40px" height="2px" bgColor={theme.colors.white}></Flex>
        </Flex>
        <Button sx={styles.button} as="a" href="/contact-us">Contact us</Button>
        <Button sx={styles.button}  as={NextLink}  href="tel:+918423118426">+919007174251</Button>
        <Button sx={styles.button} as="a" href="mailto:support@thifood.com">support@thifood.com</Button>
      </Flex>

      {/* <Image
        alt="footer-img"
        src="/assets/footerimg.svg"
        position="absolute"
        bottom="5vh"
        right="5vw"
        width="30vw"
        maxW="400px"
        display={{ base: "none", md: "block" }}
      /> */}
    </Flex>
  );
}
