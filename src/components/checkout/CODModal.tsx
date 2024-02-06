import { theme } from "@/context/providers";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export default function CODModal({
  isOpen,
  onClose,
  setActiveSteps,
  completeOrder,
}: any) {
  const handleCOD = async () => {
    try {
      const res = await completeOrder("COD");
      if (res?.success) {
        setActiveSteps(2);
      } else {
        console.log("something went wrong!");
      }
    } catch (e) {}
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="normal">COD confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          This action is irreversible. Are you sure about paying cash on
          delivery?
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            fontWeight="normal"
            onClick={handleCOD}
            bgColor={theme.colors.main}
            _hover={{
              bgColor: "transparent",
              color: theme.colors.main,
            }}
          >
            Yes
          </Button>
          <Button variant="ghost" fontWeight="normal" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
