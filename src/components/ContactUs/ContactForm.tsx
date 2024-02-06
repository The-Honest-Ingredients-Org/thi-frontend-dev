import { createContact } from "@/app/api/user/user";
import { theme } from "@/context/providers";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import React from "react";

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  option: string;
  comment: string;
}

interface PropValues {
  type: number;
}

function validateEmail(value: string) {
  let error;
  if (value === "") {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

function validatePhno(value: string) {
  let error;
  if (value === "") {
    error = "Phone number is required";
  } else if (value < "1000000000" || value > "9999999999") {
    error = "Invalid phone number";
  }
  return error;
}

export default function ContactForm({ type }: PropValues) {
  const toast = useToast();
  const initialValues: FormValues = {
    name: "",
    email: "",
    phoneNumber: "",
    option: "",
    comment: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      await createContact({ role: type === 0 ? "customer" : "business", ...values });
      toast({
        title: "Contact information sent",
        description: "We will connect with you shortly",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      actions.resetForm();
    } catch {
      toast({
        title: "Error",
        description: "Cannont contact at this moment",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const validateAny = (val: any) => {
    return !val && "This field is required";
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps: FormikProps<FormValues>) => (
        <Form>
          <Flex direction="column" gap={5}>
            <Field name="name" validate={validateAny}>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">
                    {type === 0 ? "Name*" : "Business name*"}
                  </FormLabel>
                  <Input
                    type="text"
                    id="name"
                    {...field}
                    placeholder={type === 1 ? "Business name" : "Your name"}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email" validate={validateEmail}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email*</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    {...field}
                    placeholder="Your email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phoneNumber" validate={validatePhno}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.phoneNumber && form.touched.phoneNumber
                  }
                >
                  <FormLabel htmlFor="phoneNumber">Phone number*</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input
                      type="number"
                      id="phoneNumber"
                      {...field}
                      placeholder="Your phone number"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="option" validate={validateAny}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.option && form.touched.option}
                >
                  <FormLabel htmlFor="option">Select option*</FormLabel>
                  <Select
                    id="option"
                    {...field}
                    onChange={(e) =>
                      form.setFieldValue("option", e.target.value)
                    }
                    onBlur={field.onBlur}
                    placeholder="-- select --"
                  >
                    {type === 0 ? (
                      <>
                        <option value="Product related">Product related</option>
                        <option value="General">General</option>
                        <option value="Customer feedback">
                          Customer feedback
                        </option>
                        <option value="Order enquiry">Order enquiry</option>
                      </>
                    ) : (
                      <>
                        <option value="General">General</option>
                        <option value="Order enquiry">Business enquiry</option>
                        <option value="Order enquiry">
                          Partnership enquiry
                        </option>
                      </>
                    )}
                  </Select>
                  <FormErrorMessage>{form.errors.option}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="comment" validate={validateAny}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.comment && form.touched.comment}
                >
                  <FormLabel htmlFor="comment">Comment*</FormLabel>
                  <Textarea
                    id="comment"
                    {...field}
                    placeholder="Give a brief comment about your reason to contact us"
                  />
                  <FormErrorMessage>{form.errors.comment}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

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
