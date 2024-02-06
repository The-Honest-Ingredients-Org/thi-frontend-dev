import React, { useState } from "react";
import {
  Badge,
  Box,
  ModalBody,
  Flex,
  Button,
  useToast,
  Input,
  Text,
} from "@chakra-ui/react";
import { theme } from "@/context/providers";
import { changeProductStatus } from "@/app/api/admin/admin";
import { useFetchAllOrders } from "@/swr/admin/orders/useFetchOrders";

export default function UpdateModal(orderId: string | any) {
  const toast = useToast();
  const statusOptions = ["Delivered", "Confirmed", "Cancelled", "Pending"];
  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [receiptNumber, setRecieptNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // State for capturing date
  const { mutate } = useFetchAllOrders();

  const getStatusColorScheme = (status: string) => {
    switch (status) {
      case "Delivered":
        return "green";
      case "Confirmed":
        return "yellow";
      case "Cancelled":
        return "red";
      case "Pending":
        return "blue";
      default:
        return "gray";
    }
  };

  const handleStatusClick = (newStatus: string) => {
    setCurrentStatus(newStatus);
  };

  const handleDateChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedDate(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      const requestData = {
        newStatus: currentStatus,
        orderId,
        date: selectedDate,
        receiptNumber: receiptNumber,
      };
      if (currentStatus === "Confirmed" && (selectedDate.length === 0 || receiptNumber.length === 0)) {
        toast({
          title: "Error",
          description: "Enter both expected delivery date and receipt number",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      } else {
        await changeProductStatus(requestData);
        toast({
          title: "Order status updated",
          description: "We've updated order status",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        mutate();
      }
    } catch (error) {
      toast({
        title: "Some error occurred",
        description: "Failed to update order status",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("Error updating order status:", error);
    }
  };

  return (
    <ModalBody maxHeight="70vh" overflow="scroll">
      <Box mb={5}>
        <label color="black">Current Status : </label>
        <Badge colorScheme={getStatusColorScheme(currentStatus)}>
          {currentStatus}
        </Badge>
      </Box>
      <Flex
        style={{
          marginBottom: "5vh",
        }}
      >
        {statusOptions.map((status) => (
          <Badge
            key={status}
            colorScheme={getStatusColorScheme(status)}
            cursor="pointer"
            mr={2}
            onClick={() => handleStatusClick(status)}
          >
            {status}
          </Badge>
        ))}
      </Flex>
      <Flex>
        {currentStatus === "Confirmed" && (
          <Flex direction="column" width="100%">
            <Text>Select the expected date of delivery : </Text>
            <Input
              size="md"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <Text mt={5}>Enter receipt number : </Text>
            <Input
              placeholder="Example: THI/dd-mm-yyyy/#####"
              size="md"
              type="text"
              value={receiptNumber}
              onChange={(e) => setRecieptNumber(e.target.value)}
            />
          </Flex>
        )}
      </Flex>
      <Button
        size="sm"
        mt={4}
        onClick={handleUpdateStatus}
        bgColor={`${theme.colors.main}`}
        color={`${theme.colors.whiteBg}`}
        _hover={{
          color: `${theme.colors.iconColor}`,
        }}
        fontWeight="normal"
      >
        Update
      </Button>
    </ModalBody>
  );
}
