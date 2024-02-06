"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { theme } from "@/context/providers";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Checkbox,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { registerUser } from "@/app/api/user/user";

export default function RegistrationForm() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const toast = useToast();
  function validateName(value: string) {
    const forbiddenCharacters = /[-?!@#$%^&*()_+|~=`{}\[\]:;"'<>,.?/]/;
    let error;

    if (!value) {
      error = "Name is required";
    } else if (forbiddenCharacters.test(value)) {
      error = "Name contains forbidden characters";
    }

    return error;
  }

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  function validatePassword(value: string) {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "Password must be at least 8 characters";
    }
    return error;
  }

  const styles = {
    fieldStyle: {
      paddingBottom: "2vh",
    },
    labelStyle: {
      fontSize: "1rem",
    },
    inputStyle: {
      backgroundColor: theme.colors.inputBg,
      border: "none",
    },
    googleBtnStyle: {
      height: "6vh",
      width: "100%",
      color: "black",
      border: "1px solid black",
    },
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (values, actions) => {
          try {
            await registerUser(values);
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            router.push("/login");
          } catch (error) {
            console.error("Error registering:", error);
            if (axios.isAxiosError(error)) {
              toast({
                title: "Some error occured.",
                description: error.response?.data,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: "An error occured.",
                description: "An error occurred while processing your request.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }

          actions.setSubmitting(false);
        }}
      >
        {(props: { isSubmitting: any }) => (
          <Form
            style={{
              height: "fit-content",
              width: "100%",
            }}
          >
            <Field name="name" validate={validateName}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.name && form.touched.name}
                  style={styles.fieldStyle}
                >
                  <FormLabel style={styles.labelStyle}>Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    style={styles.inputStyle}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email" validate={validateEmail}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                  style={styles.fieldStyle}
                >
                  <FormLabel style={styles.labelStyle}>Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    style={styles.inputStyle}
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password" validate={validatePassword}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                  style={styles.fieldStyle}
                >
                  <FormLabel style={styles.labelStyle}>Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    style={styles.inputStyle}
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Checkbox defaultChecked colorScheme="yellow">
              I agree to all terms and conditions
            </Checkbox>
            <Button
              isLoading={props.isSubmitting}
              type="submit"
              mt={8}
              bgColor={`${theme.colors.main}`}
              color="white"
              width="full"
              fontWeight="normal"
              _hover={{
                color: `${theme.colors.iconColor}`,
                bgColor: `${theme.colors.hoverBg}`
              }}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      {/* <Box position="relative" width={"100%"} style={{ padding: "5vh 1vh" }}>
        <Divider
          style={{
            width: "100%",
            color: "black",
            border: "1px solid grey",
          }}
        />
        <AbsoluteCenter bg={theme.colors.whiteBg} color={"grey"} px="4">
          or continue with
        </AbsoluteCenter>
      </Box>
      <Button
        leftIcon={<FcGoogle />}
        style={styles.googleBtnStyle}
        colorScheme="transparent"
        variant="solid"
        onClick={() => signIn("google")}
      >
        Google
      </Button> */}
    </Flex>
  );
}
