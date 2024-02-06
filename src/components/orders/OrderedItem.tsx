import { theme } from "@/context/providers";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

interface OrderedItemProps {
  product: {
    product: {
      _id: string;
      name: string;
      description: string;
      images: [string];
      type: string;
    };
    quantity: number;
    size: string;
    totalPrice: number;
  };
}

export default function OrderedItem({ product }: OrderedItemProps) {
  const router = useRouter();
  return (
    <Flex
      height="20vh"
      width="100%"
      marginBottom="2vh"
      paddingBottom="2vh"
      borderBottom="2px solid #3e3e3e11"
    >
      <Flex height="100%" mr="2vw" alignItems="center" justifyContent="center">
        <Image
          alt="Product"
          src={product.product.images[0]}
          height="100%"
          borderRadius={"10px"}
        />
      </Flex>
      <Flex
        height="100%"
        width="70%"
        direction="column"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Flex fontSize="1.1rem">{product.product.name}</Flex>
        <Flex fontSize="1.3rem" color={theme.colors.iconColor}>
          &#x20B9; {product.totalPrice}
        </Flex>
        <Flex width="60%" alignItems="center" gap={5}>
          <Flex alignItems="center" justifyContent="center">
            <Text marginRight="1.1rem" fontSize="1rem">
              Size:
            </Text>
            <Text marginRight="1.1rem" fontSize="1rem" color="gray">
              {product.size}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <Text marginRight="1.2rem" fontSize="1rem">
              Quantity:
            </Text>
            <Text marginRight="1.2rem" fontSize="1rem" color="gray">
              {product.quantity}
            </Text>
          </Flex>
        </Flex>
        <Button
          fontWeight="normal"
          bgColor="transparent"
          padding="0"
          color="blue.300"
          textDecoration="underline"
          _hover={{
            color: "blue.500",
          }}
          onClick={() => router.push(
            `/products/${product.product.type}/${product.product._id}`
          )}
        >
          View Product
        </Button>
      </Flex>
    </Flex>
  );
}
