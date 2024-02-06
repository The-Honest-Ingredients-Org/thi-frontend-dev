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
import OtherAds from "./WebsiteUpdateForms/OtherAds";

const menuData = [
  "Main Advertisement",
  "Sales Advertisement",
  "Other Advertisement",
];

export default function WebsiteUpdate() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

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
            {selectedOption.length != 0 ? selectedOption : menuData[0]}
          </MenuButton>
          <MenuList>
            {menuData.map((data, index) => (
              <MenuItem
                key={index}
                onClick={() => handleOptionSelect(data)}
              >
                {data}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <OtherAds selectedOption={selectedOption} />
    </Flex>
  );
}
