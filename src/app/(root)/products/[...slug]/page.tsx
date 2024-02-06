"use client";

import BestPickSlide, {
  BestPickSlideProps,
  Product,
} from "@/components/MainPageComponents/Slide/BestPickSlide";
import {
  Button,
  Flex,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { theme } from "@/context/providers";
import { mainPageProducts } from "@/data/mainPageData";
import { useAllProducts } from "@/swr/user/products/useFetchProduct";
import MainProductPage from "@/components/MainPageComponents/MainProductPage";
import Filter from "@/components/AllProducts/Filter";

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

export default function ProductsPage({ params }: { params: { slug: string } }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const name = capitalize(params.slug[0]);
  const description = mainPageProducts[name];

  const { data, isLoading, error } = useAllProducts();

  const style = {
    input: {
      width: "40%",
      fontSize: "1rem",
    },
    text: {
      fontSize: "2.5rem",
    },
  };

  if (isLoading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor={theme.colors.gray}
          color={theme.colors.ci}
          size="md"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Text
          style={{
            color: "red",
          }}
          size="1.2rem"
          align="center"
        >
          Error loading data
        </Text>
      </Flex>
    );
  }
  return (
    <>
      {params.slug.length > 1 ? (
        <MainProductPage _id={params.slug[1]} />
      ) : (
        <Flex height="fit-content" width="100%" direction="column">
          <Flex
            height="fit-content"
            width="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            direction="column"
            padding="2% 4%"
            marginBottom="5vh"
          >
            <Flex fontSize={{ base: "1.7rem", lg: "2.3rem" }}>
              {name === "All" ? "Our products" : capitalizeWords(name)}
            </Flex>
            <Flex fontSize="1.1rem" marginBottom={{ base: "20px", lg: "30px" }}>
              Elevate your dishes with our collection of premium ingredients, thoughtfully sourced and prepared for exceptional taste.
            </Flex>
            <Flex
              width="fit-content"
              alignItems="center"
              justifyContent="flex-start"
              marginBottom="4vh"
            >
              <Button
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
                leftIcon={<FaFilter size={15} />}
                style={{
                  backgroundColor: theme.colors.main,
                  color: theme.colors.iconColor,
                }}
                fontWeight="normal"
                paddingY="1.2em"
              >
                Filter Results
              </Button>
              <Filter isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
              {params.slug[0] === "all"
                ? data?.products.map((product: Product) => (
                    <BestPickSlide key={product._id} product={product} />
                  ))
                : data?.products
                    .filter(
                      (product: Product) => product.type === params.slug[0]
                    )
                    .map((product: Product) => (
                      <BestPickSlide key={product._id} product={product} />
                    ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      )}
    </>
  );
}
