import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import RightForm from "./RightForm";
import { useAllProducts } from "@/swr/admin/products/useFetchProducts";
import { theme } from "@/context/providers";
import { Product } from "@/components/MainPageComponents/Slide/BestPickSlide";

export default function UpdateForm() {
  const { data, isLoading, error } = useAllProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);

  useEffect(() => {
    setSearchProducts(data?.products);
  }, [data?.products]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleChange = (input: string) => {
    setSearchInput(input);
    setSearchProducts(
      data?.products?.filter((value: Product) =>
        value?.name.toLowerCase().includes(input.toLowerCase())
      )
    );
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
    <Flex gap={20} mt={10}>
      <Flex width="25%" direction="column">
        <Input
          type="text"
          placeholder="search product"
          mb={6}
          value={searchInput}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Flex direction="column" maxHeight="80vh" overflow="auto">
          {searchProducts?.map((product: Product) => (
            <Button
              variant="ghost"
              key={product._id}
              py={2}
              mb={5}
              fontWeight="normal"
              justifyContent="flex-start"
              onClick={() => handleProductSelect(product)}
            >
              {product.name}
            </Button>
          ))}
        </Flex>
      </Flex>
      {selectedProduct ? (
        <Box width="75%">
          <Text fontSize="1.3rem" mb={5}>
            {selectedProduct?.name || ""}
          </Text>
          {/* Pass the selectedProduct to RightForm */}
          <RightForm selectedProduct={selectedProduct} />
        </Box>
      ) : (
        <Box width="75%" alignItems="center" justifyContent="center">
          <Text fontSize="1.3rem" mb={5}>
            Please Select the Product from the Sidebar
          </Text>
        </Box>
      )}
    </Flex>
  );
}
