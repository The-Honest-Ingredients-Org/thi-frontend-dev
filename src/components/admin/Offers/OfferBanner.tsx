import {
  CartOffer,
  ProductOffer,
  displayOffer,
  readCartOffers,
  readProductOffers,
} from "@/app/api/admin/admin";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function OfferBanner({ update, setUpdate }: any) {
  const [allOffers, setAllOffers] = useState<ProductOffer[] | CartOffer[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartOffers = await readCartOffers();
        const productOffers = await readProductOffers();
        const combinedOffers = [...productOffers, ...cartOffers];
        setAllOffers(combinedOffers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [update]);

  return (
    <Box>
      <Text fontSize={{ base: "1.3rem", lg: "1.5rem" }}>Offer Banner</Text>
      <Text color="red" mb={10}>
        *please refresh this page if new offers are not visible or deleted
        offers are visible
      </Text>
      <Box maxHeight="60vh" overflow="auto">
        {allOffers?.map((offer: ProductOffer | CartOffer, index: number) => (
          <Flex key={index} mb={12} direction="column" gap={3}>
            <Text>
              <b>Code:</b> {offer?.code}
            </Text>
            <Text>
              <b>Description:</b> {offer?.description}
            </Text>
            <Text>
              <b>Discount value:</b> {offer?.value}
            </Text>
            {offer?.isDisplaying ? (
              <Text color="blue" textDecoration="underline">
                Currently on banner
              </Text>
            ) : (
              <Button
                maxWidth="200px"
                colorScheme="green"
                variant="outline"
                fontWeight="normal"
                onClick={() => {
                  displayOffer(offer?._id);
                  setUpdate((prev: boolean) => !prev);
                }}
              >
                Display on banner
              </Button>
            )}
          </Flex>
        ))}
      </Box>
      <Divider my={10} />
    </Box>
  );
}
