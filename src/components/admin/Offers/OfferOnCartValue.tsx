import React, { useEffect, useState } from "react";
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
import {
  CartOffer,
  CartOfferDto,
  ProductOffer,
  createCartOffer,
} from "@/app/api/admin/admin";
import { theme } from "@/context/providers";

export default function OfferOnCartValue({ setUpdate }: any) {
  const toast = useToast();
  const initialValues: CartOfferDto = {
    category: "cart",
    amount: 0,
    discountType: "",
    value: 0,
    code: "",
    description: "",
    isDisplaying: false,
  };

  const handleSubmit = async (
    values: CartOfferDto,
    actions: FormikHelpers<CartOfferDto>
  ) => {
    try {
      const dataObj = {
        category: "cart",
        amount: values?.amount,
        discountType: values?.discountType,
        value: values?.value,
        code: values?.code,
        description: values?.description,
        isDisplaying: false,
      };
      const res = await createCartOffer(dataObj);

      toast({
        title: "Offer created",
        description: "We've created the offer",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      // console.log("data", dataObj);
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
      {(formikProps: FormikProps<CartOfferDto>) => (
        <Form>
          <Flex direction="column" gap={5}>
            <Field name="amount" validate={validateAny}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.amount && form.touched.amount}
                >
                  <FormLabel htmlFor="amount">
                    Amount on which code will be applied
                  </FormLabel>
                  <Input
                    type="number"
                    id="amount"
                    {...field}
                    placeholder="Enter amount"
                  />
                  <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
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
