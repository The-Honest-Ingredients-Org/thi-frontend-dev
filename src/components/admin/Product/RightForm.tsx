import React, { useEffect, useState } from "react";
import { Product } from "@/components/MainPageComponents/Slide/BestPickSlide";
import { theme } from "@/context/providers";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
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
import { getProductTypes, updateProduct } from "@/app/api/admin/admin";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

interface FormValues {
  name: string;
  type: string;
  subType: string;
  description: string;
  images: File[];
  variants: { size: number; price: number; count: number; discount: number }[];
}

interface RightFormProps {
  selectedProduct: Product;
}

interface singleType {
  _id: string;
  type: string;
  subTypes: string[];
}

interface AllTypes {
  allTypes: singleType[];
  message: string;
}

const LINK = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/`;
export default function RightForm({ selectedProduct }: RightFormProps) {
  const toast = useToast();
  const [initValues, setInitValues] = useState({
    name: selectedProduct?.name || "",
    type: selectedProduct?.type || "",
    subType: selectedProduct?.subType || "",
    description: selectedProduct?.description || "",
    images: [],
    variants: selectedProduct?.variants || [],
  });

  useEffect(() => {
    setInitValues({
      name: selectedProduct?.name || "",
      type: selectedProduct?.type || "",
      subType: selectedProduct?.subType || "",
      description: selectedProduct?.description || "",
      images: [],
      variants: selectedProduct?.variants || [],
    });
  }, [selectedProduct]);

  const initialValues: FormValues = initValues;

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const updatedImages: string[] = [];

      // Upload files to AWS S3
      for (const file of values.images) {
        const arrayBuffer = await file.arrayBuffer();
        const Body = Buffer.from(arrayBuffer);
        const uploadResponse = await s3.send(
          new PutObjectCommand({ Bucket, Key: file.name, Body })
        );
        // console.log("Uploaded:", uploadResponse);

        const imageLink = LINK + file.name;
        updatedImages.push(imageLink);
      }

      const dataObj = {
        name: values.name,
        type: values.type,
        subType: values.subType,
        images: updatedImages,
        description: values.description,
        variants: values.variants,
      };

      // console.log("dataObj", dataObj);

      const res = updateProduct({ dataObj, productId: selectedProduct?._id });
      toast({
        title: "Product updated",
        description: "We've updated the product",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      actions.setSubmitting(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      actions.setSubmitting(false);
    }
  };

  const [productTypes, setProductTypes] = useState<AllTypes>();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProductTypes();
        setProductTypes(data);
      } catch (error) {
        console.error("Error fetching product types", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<FormValues>) => (
        <Form>
          <Flex direction="column" gap={5}>
            <Field name="name">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    {...field}
                    placeholder="Updated name of product"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="type">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.type && form.touched.type}>
                  <FormLabel htmlFor="type">Type</FormLabel>
                  <Select
                    id="type"
                    {...field}
                    onChange={(e) => form.setFieldValue("type", e.target.value)}
                    onBlur={field.onBlur}
                    value={form.values.type}
                  >
                    {productTypes?.allTypes?.map(
                      (type: singleType, index: number) => (
                        <option key={index} value={type?.type}>
                          {type?.type}
                        </option>
                      )
                    )}
                  </Select>
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="subType">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.subType && form.touched.subType}
                >
                  <FormLabel htmlFor="subType">Sub-type</FormLabel>
                  <Select
                    id="subType"
                    {...field}
                    onChange={(e) =>
                      form.setFieldValue("subType", e.target.value)
                    }
                    value={form.values.subType}
                    onBlur={field.onBlur}
                  >
                    {productTypes?.allTypes
                      ?.find(
                        (singleType) => singleType?.type === form.values.type
                      )
                      ?.subTypes?.map((subType: string, index: number) => (
                        <option value={subType} key={index}>
                          {subType}
                        </option>
                      ))}
                  </Select>
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description">
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
                    placeholder="Few lines about the product"
                  />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <FieldArray name="images">
              {({ push, remove }: any) => (
                <Box>
                  {formikProps.values.images.map((image, index) => (
                    <Box key={index}>
                      <Flex gap={2}>
                        <Input
                          name={`images.${index}`}
                          type="file"
                          onChange={(e: any) => {
                            formikProps.setFieldValue(
                              `images.${index}`,
                              e.currentTarget.files[0]
                            );
                          }}
                          border="none"
                          margin={0}
                          padding={0}
                          borderRadius={0}
                        />
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          padding={0}
                          bgColor="transparent"
                          fontWeight="normal"
                          color="red.300"
                          _hover={{ color: "red" }}
                        >
                          Remove
                        </Button>
                      </Flex>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    onClick={() => push(null)}
                    mt={5}
                    fontWeight="normal"
                    bgColor={`${theme.colors.main}`}
                    color={`${theme.colors.whiteBg}`}
                    isLoading={formikProps.isSubmitting}
                    _hover={{
                      color: `${theme.colors.iconColor}`,
                      bgColor: `${theme.colors.hoverBg}`,
                    }}
                  >
                    Add Image
                  </Button>
                </Box>
              )}
            </FieldArray>
            <Box>
              <FieldArray name="variants">
                {({ push, remove }: any) => (
                  <Box>
                    {formikProps.values.variants.map((variant, index) => (
                      <Box key={index}>
                        <Flex gap={10}>
                          <Field name={`variants[${index}].size`} type="number">
                            {({ field }: any) => (
                              <FormControl>
                                <FormLabel htmlFor={`variants[${index}].size`}>
                                  Size
                                </FormLabel>
                                <Input
                                  id={`variants[${index}].size`}
                                  type="string"
                                  {...field}
                                  placeholder="enter size"
                                  onWheel={(e) =>
                                    (e.target as HTMLInputElement).blur()
                                  }
                                />
                              </FormControl>
                            )}
                          </Field>
                          <Field
                            name={`variants[${index}].count`}
                            type="number"
                          >
                            {({ field }: any) => (
                              <FormControl>
                                <FormLabel htmlFor={`variants[${index}].count`}>
                                  Quantity
                                </FormLabel>
                                <Input
                                  id={`variants[${index}].count`}
                                  type="number"
                                  {...field}
                                  placeholder="enter quantity"
                                  onWheel={(e) =>
                                    (e.target as HTMLInputElement).blur()
                                  }
                                />
                              </FormControl>
                            )}
                          </Field>
                          <Field
                            name={`variants[${index}].price`}
                            type="number"
                          >
                            {({ field }: any) => (
                              <FormControl>
                                <FormLabel htmlFor={`variants[${index}].price`}>
                                  Price
                                </FormLabel>
                                <Input
                                  id={`variants[${index}].price`}
                                  type="number"
                                  {...field}
                                  placeholder="enter price"
                                  onWheel={(e) =>
                                    (e.target as HTMLInputElement).blur()
                                  }
                                />
                              </FormControl>
                            )}
                          </Field>
                          <Field
                            name={`variants[${index}].discount`}
                            type="number"
                          >
                            {({ field }: any) => (
                              <FormControl>
                                <FormLabel
                                  htmlFor={`variants[${index}].discount`}
                                >
                                  Discount
                                </FormLabel>
                                <Input
                                  id={`variants[${index}].discount`}
                                  type="number"
                                  {...field}
                                  placeholder="enter discount"
                                  onWheel={(e) =>
                                    (e.target as HTMLInputElement).blur()
                                  }
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Flex>

                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          padding={0}
                          bgColor="transparent"
                          fontWeight="normal"
                          color="red.300"
                          _hover={{ color: "red" }}
                        >
                          remove
                        </Button>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        push({ size: 0, quantity: 0, price: 0, discount: 0 })
                      }
                      mt={5}
                      fontWeight="normal"
                      bgColor={`${theme.colors.main}`}
                      color={`${theme.colors.whiteBg}`}
                      isLoading={formikProps.isSubmitting}
                      _hover={{
                        color: `${theme.colors.iconColor}`,
                        bgColor: `${theme.colors.hoverBg}`,
                      }}
                    >
                      Add Size
                    </Button>
                  </Box>
                )}
              </FieldArray>
            </Box>
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
