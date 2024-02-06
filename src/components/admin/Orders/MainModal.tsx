import { theme } from "@/context/providers";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import OrderListModal from "./OrderListModal";
import UserModal from "./UserModal";
import UpdateModal from "./UpdateModal";

export default function MainModal({ isOpen, onClose, modal, order, cart }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="normal">
          {modal == "user" && "User detail"}
          {modal == "list" && "Order list"}
          {modal == "update" && "Update order"}
        </ModalHeader>
        <ModalCloseButton />

        {modal == "user" && (
          <UserModal
            name={order?.user?.name}
            email={order?.user?.email}
            phoneNumber={order?.user?.phoneNumber}
            shippingAddress={order?.user?.shippingAddress}
          />
        )}
        {modal == "list1" && <OrderListModal products={order?.products}  />}
        {modal == "list2" && <OrderListModal products={cart?.products}  />}
        {modal == "update" && <UpdateModal orderId={order?._id} />}
        <ModalFooter>
          <Button
            type="button"
            fontWeight="normal"
            bgColor={`${theme.colors.main}`}
            color={`${theme.colors.whiteBg}`}
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
  );
}
