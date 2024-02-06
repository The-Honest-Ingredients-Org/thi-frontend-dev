import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Field,
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import {
  ProductOffer,
  ProductOfferDto,
  createProductOffer,
} from "@/app/api/admin/admin";
import { theme } from "@/context/providers";
import { useAllProducts } from "@/swr/user/products/useFetchProduct";
import { Product } from "@/components/MainPageComponents/Slide/BestPickSlide";
import { products } from "@/data/productsData";

interface SelectedProduct {
  productId: string;
  name: string;
  size: number;
  count: number;
}

export default function OfferOnProductCounts({ setUpdate }: any) {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenInner,
    onOpen: onOpenInner,
    onClose: onCloseInner,
  } = useDisclosure();

  const { data, isLoading, error } = useAllProducts();
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const [inputCount, setInputCount] = useState<number>(1);
  const [inputSize, setInputSize] = useState<number>(0);

  useEffect(() => {
    setSearchProducts(data?.products);
  }, [data?.products]);

  const handleChange = (input: string) => {
    setSearchInput(input);
    setSearchProducts(
      data?.products?.filter((value: Product) =>
        value?.name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const toast = useToast();
  const initialValues: ProductOfferDto = {
    category: "product",
    discountType: "",
    value: 0,
    productCountMap: [],
    code: "",
    description: "",
  };
  
  const handleSubmit = async (
    values: ProductOfferDto,
    actions: FormikHelpers<ProductOfferDto>
  ) => {
    try {  
      const dataObj: ProductOfferDto = {
        category: "product",
        discountType: values.discountType,
        value: values.value,
        productCountMap: selectedProducts,
        code: values.code,
        description: values.description,
      };
    
      const res = await createProductOffer(dataObj);
  
      toast({
        title: "Offer created",
        description: "We've created the offer",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
  
      actions.resetForm();
      actions.setSubmitting(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      actions.setSubmitting(false);
    }
    actions.setSubmitting(false);
    setUpdate((prev: boolean) => !prev);
  };
  

  const validateAny = (val: any) => {
    return !val && "This field is required";
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps: FormikProps<ProductOfferDto>) => (
        <Form>
          <Flex direction="column" gap={5}>
            <Field name="discountType" validate={validateAny}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.discountType && form.touched.discountType
                  }
                >
                  <FormLabel htmlFor="discountType">Discount type</FormLabel>
                  <Select
                    placeholder="Select discount type"
                    id="discountType"
                    {...field}
                    onChange={(e) =>
                      form.setFieldValue("discountType", e.target.value)
                    }
                    onBlur={field.onBlur}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="amount">Amount</option>
                  </Select>
                  <FormErrorMessage>
                    {form.errors.discountType}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="value" validate={validateAny}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.value && form.touched.value}
                >
                  <FormLabel htmlFor="value">
                    Discount value/percentage
                  </FormLabel>
                  <Input
                    type="number"
                    id="value"
                    {...field}
                    placeholder="Enter percentage/amount discount"
                  />
                  <FormErrorMessage>{form.errors.value}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="code" validate={validateAny}>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.code && form.touched.code}>
                  <FormLabel htmlFor="code">Promo code</FormLabel>
                  <Input
                    type="text"
                    id="code"
                    {...field}
                    placeholder="Enter promo code"
                  />
                  <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description" validate={validateAny}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.description && form.touched.description
                  }
                >
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    id="description"
                    {...field}
                    placeholder="Few lines about the offer"
                  />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {selectedProducts.length > 0 && (
              <Box>
                <Text mb={5}>Selected products</Text>
                {selectedProducts?.map((product, index) => (
                  <Flex
                    key={index}
                    justifyContent="space-between"
                    gap={10}
                    alignItems="center"
                    mb={3}
                    width="full"
                  >
                    <Text>{product?.name}</Text>
                    <Text>{"size: " + product?.size + " gm"}</Text>
                    <Text>{"count: " + product?.count}</Text>
                    <Button
                      variant="solid"
                      colorScheme="red"
                      fontWeight="normal"
                      onClick={() =>
                        setSelectedProducts((prev) =>
                          prev?.filter(
                            (prod) => prod?.productId != product?.productId
                          )
                        )
                      }
                    >
                      Remove
                    </Button>
                  </Flex>
                ))}
              </Box>
            )}

            <Button fontWeight="normal" onClick={onOpen}>
              Add products
            </Button>

            <Modal
              size="4xl"
              scrollBehavior="inside"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader fontWeight="normal">Add products</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    type="text"
                    placeholder="search product"
                    mb={6}
                    value={searchInput}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <Box mt={6}>
                    {searchProducts?.map((product: Product) => (
                      <Flex
                        key={product?._id}
                        justifyContent="space-between"
                        mb={4}
                      >
                        <Text>{product?.name}</Text>
                        <Button
                          variant="solid"
                          colorScheme="green"
                          fontWeight="normal"
                          onClick={() => {
                            setSelectedProduct(product);
                            setInputSize(product?.variants[0]?.size);
                            setInputCount(1);
                            onOpenInner();
                          }}
                        >
                          Add
                        </Button>
                      </Flex>
                    ))}
                    <Modal
                      size="2xl"
                      scrollBehavior="inside"
                      isOpen={isOpenInner}
                      onClose={onCloseInner}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader fontWeight="normal">
                          Select size and count
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Text mb={5}>{selectedProduct?.name}</Text>
                          <Select
                            onChange={(e) =>
                              setInputSize(Number(e.target.value))
                            }
                          >
                            {selectedProduct?.variants?.map(
                              (variant, index) => (
                                <option key={index} value={variant?.size}>
                                  {variant?.size} gm
                                </option>
                              )
                            )}
                          </Select>
                          <Input
                            type="number"
                            defaultValue={1}
                            my={3}
                            onChange={(e) =>
                              setInputCount(Number(e.target.value))
                            }
                          />
                          <Button
                            variant="solid"
                            colorScheme="green"
                            fontWeight="normal"
                            onClick={() => {
                              setSelectedProducts((prev) => [
                                ...prev,
                                {
                                  productId: selectedProduct
                                    ? String(selectedProduct._id)
                                    : "",
                                  name: selectedProduct?.name || "",
                                  size: inputSize,
                                  count: inputCount,
                                },
                              ]);
                              onCloseInner();
                            }}
                          >
                            Add
                          </Button>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            colorScheme="blackAlpha"
                            mr={3}
                            onClick={onCloseInner}
                            fontWeight="normal"
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={onClose}
                    fontWeight="normal"
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Box mt={4}>
              <Button
                type="submit"
                fontWeight="normal"
                bgColor={`${theme.colors.main}`}
                color={`${theme.colors.whiteBg}`}
                isLoading={formikProps.isSubmitting}
                _hover={{
                  color: `${theme.colors.iconColor}`,
                  bgColor: `${theme.colors.hoverBg}`,
                }}
              >
                Submit
              </Button>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
