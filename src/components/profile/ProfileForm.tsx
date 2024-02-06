/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import { UpdateProps, updateUser } from "@/app/api/user/user";
import { theme } from "@/context/providers";
import useGetUser from "@/swr/user/auth/useGetUser";
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase/index.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
export interface FormValues {
  name: string;
  email: string;
  phoneNumber: number;
  state: string;
  city: string;
  pincode: number;
  shippingAddress: string;
}

export default function ProfileForm() {
  const router = useRouter();
  let token: string = "";
  const toast = useToast();

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }
  const { user, isLoading, mutate } = useGetUser({
    token: token,
  });

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/login");
    }
  }, [router]);

  const initialValues: FormValues = {
    name: user ? user.name : "",
    email: user ? user.email : "",
    phoneNumber: user ? user.phoneNumber : 0,
    state: user ? user.state : "",
    city: user ? user.city : "",
    pincode: user ? user.pincode : 0,
    shippingAddress: user ? user.shippingAddress : "",
  };

  const [formStates, setFormStates] = useState<FormValues>({
    ...initialValues,
  });

  function validateEmail(value: string) {
    let error;
    if (value === "") {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const [isLoad, setLoad] = useState(false);
  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (values.phoneNumber != user.phoneNumber) {
      try {
        const newState = { ...formStates };
        newState.phoneNumber = values.phoneNumber;
        setFormStates(newState);
        await handleVerify("+91" + values.phoneNumber.toString());
      } catch (e) {
        console.log(e);
      }
    } else {
      await updateUser({ values });
      mutate();
      actions.setSubmitting(false);
    }
  };

  const style = {
    pinInput: {
      marginRight: "2vh",
    },
  };

  const handleChange = (value: any) => {
    setValue(value);
  };
  const handleComplete = (value: string) => {
    // console.log("this", value);
    setLoad(true);
    window.confirmationResult
      .confirm(value)
      .then(async (result: { user: any }) => {
        // console.log(result.user);
        if (result.user.accessToken.length > 0) {
          toast({
            title: "Number Verified",
            description: "Phone number verification done.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          await updateUser({ values: formStates });
          mutate();
          setLoad(false);
          onClose();
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Please enter the correct OTP",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoad(false);
      });
    setLoad(false);
  };
  const handleVerify = async (number: string) => {
    const appVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "normal",
      callback: (response: any) => {
        onOpen();
        signInWithPhoneNumber(auth, number, appVerifier)
          .then((confirmationResult) => {
            // console.log(confirmationResult);
            toast({
              title: "Success",
              description: "OTP sent to your mobile, please verify.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            window.confirmationResult = confirmationResult;
          })
          .catch((error) => {
            console.log(error);
            toast({
              title: "Error",
              description: "Error sending OTP, please try again.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
      },
    });

    appVerifier.render();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formikProps: FormikProps<FormValues>) => (
        <Form>
          <>
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader fontWeight="normal">Verify Number</ModalHeader>
                <ModalCloseButton />
                <ModalBody maxHeight="70vh" overflow="scroll">
                  <Box mt={4}>
                    <FormLabel htmlFor="phoneNumber">
                      Enter OTP (One Time Password)
                    </FormLabel>
                    <PinInput
                      defaultValue=""
                      value={value}
                      onChange={handleChange}
                      // onComplete={handleComplete}
                    >
                      <PinInputField style={style.pinInput} />
                      <PinInputField style={style.pinInput} />
                      <PinInputField style={style.pinInput} />
                      <PinInputField style={style.pinInput} />
                      <PinInputField style={style.pinInput} />
                      <PinInputField style={style.pinInput} />
                    </PinInput>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="button"
                    fontWeight="normal"
                    isLoading={isLoad}
                    bgColor={`${theme.colors.main}`}
                    color={`${theme.colors.whiteBg}`}
                    _hover={{
                      color: `${theme.colors.iconColor}`,
                    }}
                    mr={3}
                    onClick={() => {
                      onClose;
                      handleComplete(value);
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
                    Submit
                  </Button>
                  <Button
                    type="button"
                    fontWeight="normal"
                    bgColor={`transparent`}
                    color={`${theme.colors.main}`}
                    border={`1px solid ${theme.colors.main}`}
                    _hover={{
                      color: `${theme.colors.iconColor}`,
                    }}
                    mr={3}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          <Flex direction="column" gap={5}>
            <Field
              name="name"
              validate={(val: string) => val == "" && "name required"}
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
                    readOnly
                    color="gray.500"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              name="phoneNumber"
              validate={(val: number) =>
                (val < 1000000000 || val > 9999999999) &&
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
              validate={(val: string) => val == "" && "state required"}
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
              validate={(val: string) => val == "" && "city required"}
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
                (val < 100000 || val > 999999) && "enter correct pin code"
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
                Update profile
              </Button>
            </Box>
            <div id="recaptcha-container"></div>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
