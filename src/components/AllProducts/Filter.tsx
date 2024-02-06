import {
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function Filter({ isOpen, onClose, btnRef }: any) {
  const [value, setValue] = React.useState("1");

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontSize="1.3rem" fontWeight="normal">
          Filter Results
        </DrawerHeader>

        <DrawerBody>
          <Text fontSize="1.2rem" mb={2}>
            Price range
          </Text>
          {/* <Flex
                alignItems="center"
                justifyContent="space-between"
                marginBottom="3vh"
              >
                <Input placeholder="&#x20B9; INR" style={style.input} />
                <Text>To</Text>
                <Input placeholder="&#x20B9; INR" style={style.input} />
              </Flex> */}
          <RadioGroup onChange={setValue} value={value} colorScheme="gray">
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Radio value="1">Low to High</Radio>
              <Radio value="2">High To Low</Radio>
            </Stack>
          </RadioGroup>
          <Text fontSize="1.2rem" margin="3vh 0">
            Sizes
          </Text>
          <CheckboxGroup
            colorScheme="gray"
            defaultValue={["150", "200", "250", "500", "1000"]}
          >
            <SimpleGrid columns={[2, 2]} spacing="20px">
              <Checkbox value="150">150g</Checkbox>
              <Checkbox value="200">200g</Checkbox>
              <Checkbox value="250">250g</Checkbox>
              <Checkbox value="500">500g</Checkbox>
              <Checkbox value="1000">1kg</Checkbox>
            </SimpleGrid>
          </CheckboxGroup>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onClose}
            fontWeight="normal"
          >
            Cancel
          </Button>
          <Button colorScheme="yellow" fontWeight="normal">
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
