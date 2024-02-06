"use client";

// imports
import React from "react";
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";

const accordionData = [
  {
    heading: "Where do you source your spices and dry fruits?",
    content:
      "We meticulously source our products from trusted growers across India, ensuring the highest quality and authenticity.",
  },
  {
    heading: "Are your products organic?",
    content:
      "Yes, we are committed to providing organic and natural options. Look for the 'organic' label on our product descriptions.",
  },
  {
    heading: "How can I store the spices and dry fruits for maximum freshness?",
    content:
      "Store in a cool, dry place, away from direct sunlight. Use airtight containers to preserve the flavor and aroma.",
  },
  {
    heading: "Are your products gluten-free and allergen-friendly?",
    content:
      "Most of our products are naturally gluten-free. For specific allergen information, check individual product labels or contact us.",
  },
  {
    heading: "Can I purchase your products in bulk for commercial use?",
    content:
      "Absolutely! We offer bulk purchasing options for businesses. Contact our sales team for personalized assistance.",
  },
  {
    heading: "Do you ship internationally?",
    content:
      "No, currently we are open to ship our products across certain states in India only but with your support we will ship internationally one day.",
  },
  {
    heading: "Are there any discount programs available?",
    content:
      "Yes, we often run promotions and discount programs. Also keep a check on promo codes available before ordering to avail for offers.",
  },
  {
    heading: "How do I track my order?",
    content:
      "Once your order is booked we will sed you a confirmation email with details of expected delivery date.",
  }
];

export default function FAQ() {
  return (
    <Flex
      width="100%"
      paddingX={{ base: "30px", lg: "15vw" }}
      direction="column"
      mt={10}
    >
      <Text textAlign="center" fontSize={{ base: "1.5rem", xl: "1.7rem" }}>
        Frequently Asked Questions
      </Text>
      <Accordion allowToggle width="100%" marginY="4rem">
        {accordionData.map((data, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontSize={{ base: "1rem", md: "1.2rem" }}
                >
                  {data?.heading}
                </Box>
                <AccordionIcon color="#F7D966" />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{data?.content}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
}
