import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";

interface PropsInterface {
  heading: string;
  items: string[];
}

export default function MenuComponent(props: PropsInterface) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<AiFillCaretDown />}>
        {props.heading}
      </MenuButton>
      <MenuList>
        {props.items.map((item, index) => (
          <MenuItem key={index}>{item}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
