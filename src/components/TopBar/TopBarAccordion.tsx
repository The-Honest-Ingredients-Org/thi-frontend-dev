import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Link,
} from "@chakra-ui/react";
import React from "react";

export default function TopBarAccordion({ router, filteredProducts, category, drawerOnClose }: any) {
  function capitalizeWords(inputString: string) {
    const words = inputString.split('-');
    const capitalizedWords = words.map((word: string) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return '';
      }
    });
    const resultString = capitalizedWords.join(' ');
    return resultString;
  }

  return (
      <AccordionItem border={0}>
        <h2>
          <AccordionButton p={0}>
            <Box as="span" flex="1" textAlign="left" fontWeight="bold">
              {capitalizeWords(category)}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        {filteredProducts?.map((product: any, index: number) => (
          <AccordionPanel pb={3} key={index} >
            <Link
              onClick={() => {
                router.push(`/products/${category}/${product?._id}`);
                drawerOnClose();
              }}
            >
              {product?.name}
            </Link>
          </AccordionPanel>
        ))}
      </AccordionItem>
  );
}
