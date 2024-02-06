import {
  Box,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import OfferOnCartValue from "./OfferOnCartValue";
import OfferOnProductCounts from "./OfferOnProductCounts";

export default function AddOffers({ setUpdate }: any) {
  return (
    <Box>
      <Text fontSize={{ base: "1.3rem", lg: "1.5rem" }} mb={6}>
        Add new offers
      </Text>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList mb={5}>
          <Tab fontWeight="normal">Offer on cart value</Tab>
          <Tab fontWeight="normal">Offer on product counts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <OfferOnCartValue setUpdate={setUpdate} />
          </TabPanel>
          <TabPanel>
            <OfferOnProductCounts setUpdate={setUpdate} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box></Box>
      <Divider my={10} />
    </Box>
  );
}
