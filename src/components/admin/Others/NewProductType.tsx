import React, { useState } from "react";
import { theme } from "@/context/providers";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { addProductType } from "@/app/api/admin/admin";

interface ProductType {
  type: string;
  subTypes: string[];
}

function isLowerCaseAlphaOrHyphen(inputString: string) {
  const pattern = /^[a-z\-]+$/;
  return pattern.test(inputString);
}

export default function NewProductType() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productType, setProductType] = useState<string>("");
  const [productSubType, setProductSubType] = useState<string>("");
  const [productSubTypes, setProductSubTypes] = useState<string[]>([]);

  const toast = useToast();
  const handleNewProductType = async () => {
    let temp = false;
    if (productSubTypes?.length === 0) {
      temp = true;
    } else {
      productSubTypes.forEach((element) => {
        if (element.length === 0 || !isLowerCaseAlphaOrHyphen(element)) {
          temp = true;
        }
      });
    }

    if (
      productType.length === 0 ||
      !isLowerCaseAlphaOrHyphen(productType) ||
      temp
    ) {
      toast({
        title: "Error",
        description:
          "Must have atleast 1 type and subtype and Type and sub-types must have only english alphabets separated by '-', Example: 'dry-fruits'",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    } else {
      const requestData: ProductType = {
        type: productType,
        subTypes: productSubTypes,
      };

      const responseData = await addProductType(requestData);
      toast({
        title: "Success",
        description: responseData?.message,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      

      setProductType("");
      setProductSubTypes([]);
      setProductSubType("");

      // console.log(requestData);

      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="normal">Confirm action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This action is irreversible. Are you sure about adding a new product
            type
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              fontWeight="normal"
              bgColor={theme.colors.main}
              _hover={{
                bgColor: "transparent",
                color: theme.colors.main,
              }}
              onClick={handleNewProductType}
            >
              Yes
            </Button>
            <Button variant="ghost" fontWeight="normal" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box>
        <Text fontSize={{ base: "1.3rem", lg: "1.5rem" }} mb={6}>
          Add a new product type
        </Text>
        <FormLabel htmlFor="type">Product type</FormLabel>
        <Input
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          mb={5}
          id="type"
          name="type"
          type="text"
          placeholder="Example: Fruits"
        />

        <FormLabel>{productSubTypes?.length > 0 && "Sub-types"}</FormLabel>
        <Flex direction="column" gap={5} mb={5}>
          {productSubTypes?.map((subType, index) => (
            <Flex key={index} gap={5}>
              <Button
                variant="solid"
                fontWeight="normal"
                colorScheme="red"
                onClick={() =>
                  setProductSubTypes((prevTypes) =>
                    prevTypes?.filter((item, thisIndex) => thisIndex != index)
                  )
                }
              >
                Remove
              </Button>
              <Input placeholder={subType} disabled />
            </Flex>
          ))}
        </Flex>

        <FormLabel>Add sub-type</FormLabel>
        <Flex mb={10} gap={5}>
          <Button
            variant="solid"
            fontWeight="normal"
            colorScheme="green"
            onClick={() => {
              productSubType.length != 0 &&
                setProductSubTypes([...productSubTypes, productSubType]);
              productSubType.length != 0 && setProductSubType("");
            }}
          >
            Add
          </Button>
          <Input
            value={productSubType}
            onChange={(e) => setProductSubType(e.target.value)}
            placeholder="enter a sub-type"
          />
        </Flex>

        <Button
          bgColor={theme.colors.main}
          color="white"
          fontWeight="normal"
          _hover={{
            color: `${theme.colors.iconColor}`,
            bgColor: "#393939",
          }}
          onClick={onOpen}
        >
          Submit
        </Button>
        <Divider my={10} />
      </Box>
    </>
  );
}
