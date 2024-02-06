import React, { useState, useEffect } from "react";
import { theme } from "@/context/providers";
import {
  Badge,
  Box,
  Button,
  Flex,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import MainModal from "./Orders/MainModal";
import { useFetchAllOrders } from "@/swr/admin/orders/useFetchOrders";

interface OrderProp {
  _id: string;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
    shippingAddress: string;
  };
  orderId: string;
  receiptNumber: string;
  modeOfPayment: string;
  products: {
    product: { name: string };
    quantity: string;
    size: string;
    totalPrice: number;
    discountedPrice: number;
    _id: string;
  }[];
  totalAmount: number;
  discountedAmount: number;
  createdAt: string;
  confirmedAt: string;
  arrivingAt: string;
  deliveredAt: string;
  cancelledAt: string;
  status: string;
  shippingAddress: string;
}

interface CsvData {
  name: string;
  email: string;
  phoneNumber: string;
  orderId: string;
  receiptNumber: string;
  orders: string;
  modeOfPayment: string;
  totalAmount: number;
  discountedAmount: number;
  createdAt: string;
  confirmedAt: string;
  arrivingAt: string;
  deliveredAt: string;
  cancelledAt: string;
  status: string;
  shippingAddress: string;
}

export default function Orders() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState("user");
  const { data, isLoading, error } = useFetchAllOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderProp | null>(null);
  const [csvData, setCsvData] = useState<CsvData[]>([]);

  console.log("orderData", data);
  

  useEffect(() => {
    if (data) {
      const mappedData: CsvData[] = data.map((order: OrderProp) => {
        const formattedOrders = order.products
          .map(
            (product) =>
              `${product.product.name} (${product.size}gm) x ${product.quantity}`
          )
          .join(", ");
        

        return {
          name: order.user.name,
          email: order.user.email,
          phoneNumber: order.user.phoneNumber,
          orderId: order.orderId,
          receiptNumber: order.receiptNumber,
          orders: formattedOrders.toString(),
          modeOfPayment: order.modeOfPayment,
          totalAmount: order.totalAmount.toFixed(2),
          discountedAmount:
            order.discountedAmount === 0
              ? order.totalAmount.toFixed(2)
              : order.discountedAmount.toFixed(2),
          createdAt: order.createdAt,
          confirmedAt: order.confirmedAt,
          arrivingAt: order.arrivingAt,
          deliveredAt: order.deliveredAt,
          cancelledAt: order.cancelledAt,
          status: order.status,
          shippingAddress: order.shippingAddress,
        };
      });

      setCsvData(mappedData);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedOrder(data[0]);
    }
  }, [data]);

  const headers = [
    { label: "Order number", key: "orderId" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone no.", key: "phoneNumber" },
    { label: "Address", key: "shippingAddress" },
    { label: "Receipt no.", key: "receiptNumber" },
    { label: "Orders", key: "orders" },
    { label: "Payment mode", key: "modeOfPayment" },
    { label: "Cost", key: "totalAmount" },
    { label: "Final cost after offer", key: "discountedAmount" },
    { label: "Order D&T", key: "createdAt" },
    { label: "Confirmation D&T", key: "confirmedAt" },
    { label: "Arriving D&T", key: "arrivingAt" },
    { label: "Delivered D&T", key: "deliveredAt" },
    { label: "Cancellation D&T", key: "cancelledAt" },
    { label: "Status", key: "status" },
  ];

  function formatDate(inputDate: string | number | Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const date = new Date(inputDate);
    return date
      .toLocaleDateString("en-US", options)
      .replace(
        /(\d+)\/(\d+)\/(\d+), (\d+:\d+:\d+) (AM|PM)/,
        "$1/$2/$3 at $4 $5"
      );
  }

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
    <Box>
      <MainModal
        isOpen={isOpen}
        onClose={onClose}
        modal={modal}
        order={selectedOrder}
      />
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1.3rem">Orders</Text>
        <Button
          type="button"
          fontWeight="normal"
          bgColor={`${theme.colors.main}`}
          color={`${theme.colors.whiteBg}`}
          _hover={{
            color: `${theme.colors.iconColor}`,
            bgColor: `${theme.colors.hoverBg}`,
          }}
        >
          <CSVLink
            data={csvData}
            headers={headers}
            filename={"orders.csv"}
            target="_blank"
          >
            Download CSV
          </CSVLink>
        </Button>
      </Flex>
      <TableContainer mt={10} border="1px solid gray" borderRadius={10}>
        <Table>
          <Thead>
            <Tr>
              <Th>S.NO.</Th>
              <Th>Order No.</Th>
              <Th>Receipt No.</Th>
              <Th>Order List</Th>
              <Th>Payment mode</Th>
              <Th>Cost</Th>
              <Th>{"Final cost(after applying offer)"}</Th>
              <Th>Order D&T</Th>
              <Th>Confirmation D&T</Th>
              <Th>Arriving D&T</Th>
              <Th>Delivered D&T</Th>
              <Th>Cancelled D&T</Th>
              <Th>Status</Th>
              <Th>Update</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((order: OrderProp, index: number) => (
              <Tr key={order._id}>
                <Td>{index + 1}</Td>
                <Td>
                  <Link
                    color="blue.500"
                    onClick={() => {
                      setSelectedOrder(order);
                      setModal("user");
                      onOpen();
                    }}
                  >
                    {order.orderId}
                  </Link>
                </Td>
                <Td>{order.receiptNumber ? order.receiptNumber : "NA"}</Td>
                <Td>
                  <Link
                    color="blue.500"
                    onClick={() => {
                      setSelectedOrder(order);
                      setModal("list1");
                      onOpen();
                    }}
                  >
                    list
                  </Link>
                </Td>
                <Td>{order.modeOfPayment}</Td>
                <Td>₹ {order.totalAmount.toFixed(2)}</Td>
                <Td>
                  ₹{" "}
                  {order.discountedAmount === 0
                    ? order.totalAmount.toFixed(2)
                    : order.discountedAmount.toFixed(2)}
                </Td>
                <Td>{formatDate(order.createdAt)}</Td>
                <Td>
                  {order.confirmedAt != ""
                    ? formatDate(order.confirmedAt)
                    : "NA"}
                </Td>
                <Td>
                  {order.arrivingAt != "" ? formatDate(order.arrivingAt) : "NA"}
                </Td>
                <Td>
                  {order.deliveredAt != ""
                    ? formatDate(order.deliveredAt)
                    : "NA"}
                </Td>
                <Td>
                  {order.cancelledAt != ""
                    ? formatDate(order.cancelledAt)
                    : "NA"}
                </Td>
                <Td>
                  <Badge colorScheme={getStatusColorScheme(order.status)}>
                    {order.status}
                  </Badge>
                </Td>
                <Td>
                  <Link
                    color="blue.500"
                    onClick={() => {
                      setSelectedOrder(order);
                      setModal("update");
                      onOpen();
                    }}
                  >
                    update
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
