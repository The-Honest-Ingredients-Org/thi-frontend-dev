"use client";

import ContactUs from "@/components/admin/ContactUs";
import Offers from "@/components/admin/Offers";
import Orders from "@/components/admin/Orders";
import Others from "@/components/admin/Others";
import ProductUpdate from "@/components/admin/ProductUpdate";
import UserData from "@/components/admin/UserData";
import WebsiteUpdate from "@/components/admin/WebsiteUpdate";
import { theme } from "@/context/providers";
import useGetUser from "@/swr/user/auth/useGetUser";
import {
  Button,
  Flex,
  Input,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
// imports
import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [text, showText] = useState(false);

  const checkAdminPassword = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      setPassword("");
      showText(true);
    }
  };
  let token: string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }

  const { user, isLoading, error } = useGetUser({
    token: token,
  });

  useEffect(() => {
    if (user?.email != process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      router.push("/");
    }
  }, [router, user?.email]);

  if (isLoading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor={theme.colors.gray}
          color={theme.colors.ci}
          size="md"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Text
          style={{
            color: "red",
          }}
          size="1.2rem"
          align="center"
        >
          Error loading data
        </Text>
      </Flex>
    );
  }

  if (!isAdmin) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
        flexDirection="column"
      >
        <Text textAlign="center" fontSize="1.5rem" marginY="2vh">
          Admin panel
        </Text>
        <Text fontSize="1.2rem">Please enter the admin password</Text>
        <Flex flexDirection="column">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please enter admin password"
          />
          <Button
            onClick={checkAdminPassword}
            mt="1rem"
            bgColor={theme.colors.main}
            color={theme.colors.white}
            _hover={{
              bgColor: "transparent",
              color: theme.colors.main,
              border: `1px solid ${theme.colors.main}`,
            }}
          >
            Submit
          </Button>
        </Flex>
        {text && (
          <Text color="red.400">Please enter the correct password.</Text>
        )}
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <Text textAlign="center" fontSize="1.5rem" marginY="5vh">
        Admin panel
      </Text>
      <Tabs isFitted variant="enclosed">
        <Flex justifyContent="center">
          <TabList mb="5vh" width="50%">
            {/* <Tab>Website update</Tab> */}
            <Tab>Offers</Tab>
            <Tab>Product</Tab>
            <Tab>Orders</Tab>
            <Tab>User data</Tab>
            <Tab>Contact us</Tab>
            <Tab>Others</Tab>
          </TabList>
        </Flex>
        <TabPanels px="70px">
          <TabPanel>
            {/* <WebsiteUpdate /> */}
            <Offers />
          </TabPanel>
          <TabPanel>
            <ProductUpdate />
          </TabPanel>
          <TabPanel>
            <Orders />
          </TabPanel>
          <TabPanel>
            <UserData />
          </TabPanel>
          <TabPanel>
            <ContactUs />
          </TabPanel>
          <TabPanel>
            <Others />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
