"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
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
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/api/user/user";
// import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const toast = useToast();

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
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, actions) => {
          try {
            await loginUser(values);
            toast({
              title: "Logged In.",
              description: "We've logged you in your account.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            router.push("/");
          } catch (e) {
            toast({
              title: "Login Failed.",
              description: "Failed to login to your account.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
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
              mt={12}
              isLoading={props.isSubmitting}
              type="submit"
              bgColor={`${theme.colors.main}`}
              color="white"
              width="full"
              fontWeight="normal"
              _hover={{
                color: `${theme.colors.iconColor}`,
                bgColor: `${theme.colors.hoverBg}`,
              }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
