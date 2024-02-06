import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { theme } from "@/context/providers";
import ResetForm from "./ResetForm";
import { verify } from "@/app/api/user/user";

export default function Forgot({ token, _id }: { token: string; _id: string }) {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const isEmailValid = (email: string) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleClick = async () => {
    if (isEmailValid(email)) {
      try {
        const res = await verify({ email });
        if (res?.success) {
          toast({
            title: "Email sent",
            description: "We've have sent you an email, please verify.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
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
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      height={"100%"}
      width={{ base: "full", lg: "50%" }}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Text fontSize={{ base: "2xl", lg: "3xl" }}>Forgot password</Text>
      {!token && (
        <Box mt={14} width={{ base: "90%", lg: "80%" }}>
          <label>Email</label>
          <Input
            placeholder="Enter your email"
            bgColor={theme.colors.inputBg}
            border={0}
            mt={1}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            mt={12}
            type="button"
            bgColor={`${theme.colors.main}`}
            color="white"
            width="full"
            fontWeight="normal"
            _hover={{
              color: `${theme.colors.iconColor}`,
              bgColor: `${theme.colors.hoverBg}`,
            }}
            onClick={handleClick}
          >
            continue
          </Button>
        </Box>
      )}
      {token && <ResetForm token={token} _id={_id} />}
    </Flex>
  );
}
