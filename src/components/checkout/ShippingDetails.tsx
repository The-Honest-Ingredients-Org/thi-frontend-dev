/* eslint-disable react/no-children-prop */
import React from "react";
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
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { updateUser } from "@/app/api/user/user";
import useGetUser from "@/swr/user/auth/useGetUser";
interface FormValues {
  name: string;
  email: string;
  phoneNumber: number;
  state: string;
  city: string;
  pincode: number;
  shippingAddress: string;
}

export default function ShippingDetails({ setActiveStep, profile }: any) {
  let token: string = "";

  if(typeof window !== 'undefined') {
    token = localStorage.getItem("access_token") || "";
  }
  const { user, mutate } = useGetUser({
    token: token,
  });
  const initialValues: FormValues = {
    name: profile?.name,
    email: profile?.email,
    phoneNumber: profile?.phoneNumber,
    state: profile?.state,
    city: profile?.city,
    pincode: profile?.pincode,
    shippingAddress: profile?.shippingAddress,
  };

  function validateEmail(value: string) {
    let error;
    if (value === "") {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const res = await updateUser({ values });
    mutate();
    setActiveStep(1);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formikProps: FormikProps<FormValues>) => (
        <Form>
          <Text fontSize="1.2rem" mb={5}>
            * Please confirm and update all shipping details
          </Text>
          <Flex direction="column" gap={5}>
            <Field
              name="name"
              validate={(val: string) => (!val || val === "") && "name required"}
            >
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    {...field}
                    placeholder="Enter your name"
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
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    {...field}
                    placeholder="Enter your email"
                    color="gray.500"
                    readOnly
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              name="phoneNumber"
              validate={(val: number) =>
                (!val || val < 1000000000 || val > 9999999999) &&
                "enter correct phone number"
              }
            >
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.phoneNumber && form.touched.phoneNumber
                  }
                >
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="+91" />
                    <Input
                      type="tel"
                      id="phoneNumber"
                      {...field}
                      placeholder="Enter your phone number"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              name="state"
              validate={(val: string) => (!val || val === "") && "state required"}
            >
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.state && form.touched.state}
                >
                  <FormLabel htmlFor="state">State</FormLabel>
                  <Input
                    type="text"
                    id="state"
                    {...field}
                    placeholder="Enter your state"
                  />
                  <FormErrorMessage>{form.errors.state}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              name="city"
              validate={(val: string) =>(!val || val === "") && "city required"}
            >
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.city && form.touched.city}>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <Input
                    type="text"
                    id="city"
                    {...field}
                    placeholder="Enter your city"
                  />
                  <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              name="pincode"
              validate={(val: number) =>
                (!val || val < 100000 || val > 999999) && "enter correct pin code"
              }
            >
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.pincode && form.touched.pincode}
                >
                  <FormLabel htmlFor="pincode">Pin code</FormLabel>
                  <Input
                    type="number"
                    id="pincode"
                    {...field}
                    placeholder="Enter your pin code"
                  />
                  <FormErrorMessage>{form.errors.pincode}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              name="shippingAddress"
              validate={(val: string) => !val && "address is required"}
            >
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.shippingAddress && form.touched.shippingAddress
                  }
                >
                  <FormLabel htmlFor="shippingAddress">
                    Shipping address
                  </FormLabel>
                  <Textarea
                    id="shippingAddress"
                    {...field}
                    placeholder="Give your address"
                  />
                  <FormErrorMessage>
                    {form.errors.shippingAddress}
                  </FormErrorMessage>
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
                spinner={
                  <Spinner
                    thickness="2px"
                    speed="0.65s"
                    emptyColor={theme.colors.hoverBg}
                    color={theme.colors.iconColor}
                    size="md"
                  />
                }
              >
                Update shipping details
              </Button>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
