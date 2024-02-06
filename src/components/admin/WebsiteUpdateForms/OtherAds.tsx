import React, { useRef, useState } from "react";
import { theme } from "@/context/providers";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";

interface FormValues {
  image: any;
  heading: string;
  content: string;
}

interface OtherAdsProps {
  selectedOption: string;
}

export default function OtherAds({ selectedOption }: OtherAdsProps) {
  const initialValues: FormValues = {
    image: "",
    heading: "",
    content: "",
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    // console.log(values);
    actions.setSubmitting(false);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps: FormikProps<FormValues>) => (
        <Form>
          <Flex direction="column" gap={5}>
            <Field
              name="image"
              validate={(image: any) => image == "" && "image required"}
            >
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.image && form.touched.image}
                >
                  <FormLabel htmlFor="image">Image</FormLabel>
                  <Input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(event) => {
                      const selectedFile = event.currentTarget.files?.[0];
                      if (selectedFile) {
                        formikProps.setFieldValue("image", selectedFile);
                        setSelectedFileName(selectedFile.name);
                      }
                    }}
                  />
                  <Button
                    onClick={handleFileInputClick}
                    borderWidth="1px"
                    borderRadius="md"
                    _hover={{
                      bgColor: "gray.200",
                    }}
                  >
                    Select Image
                  </Button>
                  <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {selectedOption === "Other Advertisement" && (
              <>
                {/* Display the selected file name */}
                {selectedFileName && (
                  <Text fontSize="sm" color="gray.500">
                    Selected File :{" "}
                    <span style={{ color: "#1F1F1F", fontWeight: "900" }}>
                      {selectedFileName}
                    </span>
                  </Text>
                )}
                <Field
                  name="heading"
                  validate={(heading: string) =>
                    heading == "" && "Heading cannot be empty"
                  }
                >
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.heading && form.touched.heading}
                    >
                      <FormLabel htmlFor="heading">Heading</FormLabel>
                      <Input type="text" id="heading" {...field} />
                      <FormErrorMessage>{form.errors.heading}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field
                  name="content"
                  validate={(content: string) =>
                    content == "" && "Content cannot be empty"
                  }
                >
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.content && form.touched.content}
                    >
                      <FormLabel htmlFor="content">Content</FormLabel>
                      <Textarea id="content" {...field} />
                      <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </>
            )}
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
            <Divider width={"100%"} />
            {/* PREVIEW */}
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
