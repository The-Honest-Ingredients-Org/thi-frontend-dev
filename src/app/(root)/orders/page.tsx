/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import OrderesTab from "@/components/orders/OrdersTab";
import { theme } from "@/context/providers";
import { useReadOrders } from "@/swr/user/orders/useReadOrders";
import {
  Box,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function page() {
  let token: string = "";

  if(typeof window !== 'undefined') {
    token = localStorage.getItem("access_token") || "";
  }
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Pending");
  const { data, isLoading, error } = useReadOrders({
    token: token,
  });

  const filteredOrders = data?.orders.filter((order: { status: string }) =>
    order.status.toLowerCase().includes(selectedTab.toLowerCase())
  );

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/login");
    }
  }, [router]);

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

  return (
    <Box p={{ base: "20px", lg: "70px" }}>
      <Text fontSize={{ base: "1.5rem", lg: "1.7rem" }} mb={10}>
        Your orders
      </Text>
      <Tabs>
        <TabList mb={10}>
          <Tab onClick={() => setSelectedTab("Pending")}>Pending orders</Tab>
          <Tab onClick={() => setSelectedTab("Confirmed")}>
            Out for delivery
          </Tab>
          <Tab onClick={() => setSelectedTab("Delivered")}>Previous orders</Tab>
          <Tab onClick={() => setSelectedTab("Cancelled")}>
            Cancelled orders
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <OrderesTab orders={filteredOrders} />
          </TabPanel>
          <TabPanel>
            <OrderesTab orders={filteredOrders} />
          </TabPanel>
          <TabPanel>
            <OrderesTab orders={filteredOrders} />
          </TabPanel>
          <TabPanel>
            <OrderesTab orders={filteredOrders} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
