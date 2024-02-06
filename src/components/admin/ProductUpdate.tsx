import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import UpdateForm from "./Product/UpdateForm";
import AddForm from "./Product/AddForm";

export default function ProductUpdate() {
  const [option, setOption] = useState("create");
  return (
    <Flex direction="column">
      <Flex justifyContent="center" alignItems="center" gap={10} width="full">
        <Text>Choose option</Text>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<BiChevronDown />}
            fontWeight="normal"
          >
            {option}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setOption("create")}>Create</MenuItem>
            <MenuItem onClick={() => setOption("update")}>Update</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {option == "update" ? (
        <>
          <Text mt={5} fontSize="1.3rem">
            Update products
          </Text>
          <UpdateForm />
        </>
      ) : (
        <>
          <Text mt={5} mb={10} fontSize="1.3rem">
            Create product
          </Text>
          <AddForm />
        </>
      )}
    </Flex>
  );
}
