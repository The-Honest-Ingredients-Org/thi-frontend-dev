import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { theme } from "@/context/providers";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { updatePassword, verifyToken } from "@/app/api/user/user";

export default function ResetForm({
  token,
  _id,
}: {
  token: string;
  _id: string;
}) {
  const router = useRouter();
  const toast = useToast();

  const verifyUser = async () => {
    try {
      const res = await verifyToken({ forgotPasswordToken: token, _id });
      if (!res?.success) {
        toast({
          title: "Access denied",
          description: "Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        router.push("/forgot");
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "An error occured, please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  function validatePassword(value: string) {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "Password must be at least 8 characters";
    }
    return error;
  }

  const handleSubmit = async (values: any) => {
    const res = await updatePassword({ _id, newPassword: values?.password });
    try {
      if (res?.success) {
        toast({
          title: "Password updated successfully",
          description: "We've updated your password.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/login");
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "An error occured, please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={{ base: "90%", lg: "80%" }}
      mt={14}
    >
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors: any = {};
          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords do not match";
          }
          return errors;
        }}
      >
        {(props) => (
          <Form
            style={{
              height: "fit-content",
              width: "100%",
            }}
          >
            <Field name="password">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>New password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter new password"
                    bgColor={theme?.colors?.inputBg}
                    border={0}
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="confirmPassword">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.confirmPassword && form.touched.confirmPassword
                  }
                  mt={5}
                >
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm your new password"
                    bgColor={theme?.colors?.inputBg}
                    border={0}
                  />
                  <FormErrorMessage>
                    {form.errors.confirmPassword}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
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
              update password
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
