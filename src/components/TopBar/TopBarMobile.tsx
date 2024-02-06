import {
  Accordion,
  Box,
  Button,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import NextLink from "next/link";
import { theme } from "@/context/providers";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BsLink } from "react-icons/bs";
import { allProducts } from "@/data/allProductsData";
import { CgProfile } from "react-icons/cg";
import TopBarAccordion from "./TopBarAccordion";
import { Product } from "../MainPageComponents/Slide/BestPickSlide";
import useGetUser from "@/swr/user/auth/useGetUser";
import {
  CartOffer,
  ProductOffer,
  getProductTypes,
} from "@/app/api/admin/admin";
import { readDisplayedOffers } from "@/app/api/user/user";

const styles = {
  iconStyles: {
    color: theme.colors.main,
  },
  container: {
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    width: "40px",
    backgroundColor: theme.colors.whiteBg,
    borderRadius: "50%",
    _hover: {
      backgroundColor: theme.colors.iconColor,
    },
  },
  flexBox: {
    width: "100%",
    borderRadius: "8px",
  },
};
interface singleType {
  _id: string;
  type: string;
}

interface AllTypes {
  allTypes: singleType[];
  message: string;
}

export default function TopBarMobile({
  products,
  onOpen,
  isOpen,
  onClose,
  initialRef,
  finalRef,
  inputValue,
  setInput,
  router,
}: any) {
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };
  const handleLogin = () => {
    router.push("/login");
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [offer, setOffer] = useState<ProductOffer | CartOffer>();
  const [closeOffer, setCloseOffer] = useState<boolean>(true);

  const filteredProducts = selectedCategory
    ? products?.filter(
        (product: { type: string }) => product.type === selectedCategory
      )
    : products;

  let token: string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }

  const { user } = useGetUser({
    token: token,
  });

  const [productTypes, setProductTypes] = useState<AllTypes>();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProductTypes();
        setProductTypes(data);
      } catch (error) {
        console.error("Error fetching product types", error);
      }
      const tempOffer = await readDisplayedOffers();
      setOffer(tempOffer);
    }
    fetchData();
  }, []);

  return (
    <Flex width={"100%"} direction="column" position="fixed" zIndex={100}>
      {offer && closeOffer && (
        <Flex
          p={2}
          alignItems="center"
          justifyContent="center"
          backgroundColor="green.200"
        >
          <Text maxWidth="90%">
            {offer?.description}
            <Link
              as={NextLink}
              href="/cart"
              textDecoration="underline"
              ml={2}
              onClick={() => setCloseOffer(false)}
            >
              explore
            </Link>
          </Text>
          <CloseButton
            alignSelf="flex-start"
            position="absolute"
            top={1}
            right={4}
            onClick={() => setCloseOffer(false)}
          />
        </Flex>
      )}
      <Flex
        height={"10vh"}
        width={"100%"}
        bgColor={theme.colors.main}
        justifyContent="space-between"
        alignItems="center"
        paddingX="15px"
      >
        <Box width="40%">
          <Button onClick={drawerOnOpen} p={0}>
            <BiMenu />
          </Button>
          <Drawer
            isOpen={drawerIsOpen}
            placement="left"
            onClose={drawerOnClose}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader></DrawerHeader>

              <DrawerBody pt={5}>
                <Accordion allowToggle>
                  {productTypes?.allTypes?.map(
                    (category: singleType, index: number) => (
                      <Box
                        onClick={() => setSelectedCategory(category?.type)}
                        key={index}
                      >
                        <TopBarAccordion
                          router={router}
                          filteredProducts={filteredProducts}
                          category={category?.type}
                          drawerOnClose={drawerOnClose}
                        />
                        <Divider my={5} />
                      </Box>
                    )
                  )}
                </Accordion>
                <Box>
                  <Link
                    fontWeight="bold"
                    mb={2}
                    onClick={() => {
                      router.push(`/about-us`);
                      drawerOnClose();
                    }}
                  >
                    About us
                  </Link>
                  <Divider my={5} />
                </Box>
                <Box>
                  <Link
                    fontWeight="bold"
                    mb={2}
                    onClick={() => {
                      router.push(`/contact-us`);
                      drawerOnClose();
                    }}
                  >
                    Contact us
                  </Link>
                  <Divider my={5} />
                </Box>
                <Box>
                  <Link
                    fontWeight="bold"
                    mb={2}
                    onClick={() => {
                      router.push(`/products/all`);
                      drawerOnClose();
                    }}
                  >
                    Products
                  </Link>
                  <Divider my={5} />
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={3}>
                    User
                  </Text>
                  {user?._id && !user?.isAdmin && (
                    <Text
                      mb={3}
                      onClick={() => {
                        router.push(`/profile`);
                        drawerOnClose();
                      }}
                    >
                      My profile
                    </Text>
                  )}
                  {user?._id && !user?.isAdmin && (
                    <Text
                      mb={3}
                      onClick={() => {
                        router.push(`/orders`);
                        drawerOnClose();
                      }}
                    >
                      My orders
                    </Text>
                  )}
                  {user?._id && user?.isAdmin && (
                    <Text
                      onClick={() => {
                        router.push(`/admin`);
                        drawerOnClose();
                      }}
                    >
                      Admin panel
                    </Text>
                  )}
                  {!user?._id && <Text onClick={handleLogin}>Login</Text>}
                  {user?._id && <Text onClick={handleLogout}>Logout</Text>}
                  <Divider my={5} />
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
        <Flex height="100%" width="20%" as={NextLink} href="/">
          <Image src="/assets/logo.svg" alt="logo" height="100%" width="100%" />
        </Flex>
        <Flex alignItems="center" width="45%" justifyContent="flex-end">
          <Flex alignItems="center" gap="4vw">
            <Flex sx={styles.container} as={NextLink} href="/cart">
              <AiOutlineShoppingCart size={20} style={styles.iconStyles} />
            </Flex>
            <Flex sx={styles.container} onClick={onOpen}>
              <AiOutlineSearch size={20} style={styles.iconStyles} />
            </Flex>
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
              size={"xl"}
              colorScheme="purple"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <AiOutlineSearch color="gray.300" size={24} />
                    </InputLeftElement>
                    <Input
                      ref={initialRef}
                      border="none"
                      placeholder="Search the products"
                      focusBorderColor="transparent"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </InputGroup>
                </ModalHeader>
                {inputValue.length !== 0 && (
                  <ModalBody
                    style={{
                      overflow: "auto",
                      maxHeight: "50vh",
                      marginBottom: "2vh",
                    }}
                  >
                    {products
                      ?.filter((product: Product) => {
                        const searchValue = inputValue.toLowerCase();
                        const productName = product.name.toLowerCase();
                        return (
                          searchValue && productName.startsWith(searchValue)
                        );
                      })
                      .map((product: Product) => (
                        <Flex
                          key={product._id}
                          style={styles.flexBox}
                          alignItems="center"
                          justifyContent="flex-start"
                          _hover={{
                            backgroundColor: theme.colors.inputBg,
                            cursor: "pointer",
                          }}
                          mb="20px"
                          onClick={() => {
                            router.push(
                              `/products/${product.type}/${product._id}`
                            );
                            onClose();
                          }}
                        >
                          <Flex
                            height={{ base: "80px", md: "100px" }}
                            mr="20px"
                          >
                            <Image
                              alt="product-img"
                              src={product.images[0]}
                              objectFit="cover"
                              width="100%"
                              borderRadius="5px"
                            />
                          </Flex>
                          <Flex
                            width="full"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Flex
                              height="100%"
                              alignItems="flex-start"
                              justifyContent="space-evenly"
                              direction="column"
                            >
                              <Text>{product?.name}</Text>
                              <Text fontSize="1.1rem">
                                &#8377; {product?.variants[0]?.price}
                                {" ("}
                                {product?.variants[0]?.size}
                                {")"}
                              </Text>
                              <Text fontSize="0.8rem">
                                Available sizes:
                                {product?.variants?.map((variant, index) => (
                                  <span key={index}>{variant?.size}, </span>
                                ))}
                              </Text>
                            </Flex>

                            <BsLink size={24} />
                          </Flex>
                        </Flex>
                      ))}
                    {products?.filter((product: Product) => {
                      const searchValue = inputValue.toLowerCase();
                      const productName = product.name.toLowerCase();
                      return searchValue && productName.startsWith(searchValue);
                    }).length === 0 && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        height="10vh"
                      >
                        <Text>No products found</Text>
                      </Flex>
                    )}
                  </ModalBody>
                )}
              </ModalContent>
            </Modal>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
