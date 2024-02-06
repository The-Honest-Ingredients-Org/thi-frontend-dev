import {
  CartOffer,
  ProductOffer,
  deleteOffer,
  readCartOffers,
  readProductOffers,
} from "@/app/api/admin/admin";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function DeleteOffer({update, setUpdate}: any) {
  const [allOffers, setAllOffers] = useState<ProductOffer[] | CartOffer[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartOffers = await readCartOffers();
        const productOffers = await readProductOffers();
        const combinedOffers = [...productOffers, ...cartOffers];
        setAllOffers(combinedOffers);

        // console.log(combinedOffers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [update]);

  return (
    <Box>
      <Text fontSize={{ base: "1.3rem", lg: "1.5rem" }}>Delete Offer</Text>
      <Text color="red" mb={10}>
        *please refresh this page if new offers are not visible
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

            <Button
              maxWidth="200px"
              colorScheme="red"
              variant="solid"
              fontWeight="normal"
              onClick={() => {
                deleteOffer(offer?._id);
                setUpdate((prev: boolean) => !prev);
              }}
            >
              Delete
            </Button>
          </Flex>
        ))}
      </Box>
      <Divider my={10} />
    </Box>
  );
}
