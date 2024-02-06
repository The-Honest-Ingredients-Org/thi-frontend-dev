"use client";

import ContactForm from "@/components/ContactUs/ContactForm";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function page() {
  return (
    <Box padding={{ base: "15px", md: "30px", lg: "70px" }}>
      <Text mb={10} fontSize="1.5rem">
        Contact
      </Text>
      <Text mb={2}>Select your role from here</Text>
      <Tabs variant="soft-rounded" colorScheme="yellow">
        <TabList gap={5}>
          <Tab fontWeight="normal">Customer</Tab>
          <Tab fontWeight="normal">Business</Tab>
        </TabList>
        <TabPanels mt={10}>
          <TabPanel>
            <ContactForm type={0} />
          </TabPanel>
          <TabPanel>
            <ContactForm type={1} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
