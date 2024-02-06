import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { theme } from "@/context/providers";
import {
  AiFillCaretDown,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsLink } from "react-icons/bs";
import { Product } from "../MainPageComponents/Slide/BestPickSlide";
import useGetUser from "@/swr/user/auth/useGetUser";
import {
  CartOffer,
  ProductOffer,
  getProductTypes,
} from "@/app/api/admin/admin";
import { readDisplayedOffers } from "@/app/api/user/user";

const styles = {
  btnStyles: {
    padding: 0,
    color: theme.colors.whiteBg,
    backgroundColor: "transparent",
    fontWeight: "normal",
    _hover: { color: `${theme.colors.iconColor}` },
    _expanded: { bgColor: "transparent" },
    _focus: { bgColor: "transparent", boxShadow: "none" },
  },
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
  modalContainer: {
    backgroundColor: theme.colors.main,
    border: `1px solid ${theme.colors.white}`,
    width: "50%",
    height: "50vh",
  },
  input: {
    border: "none",
  },
  flexBox: {
    width: "100%",
    borderRadius: "8px",
  },
};

interface MenuItem {
  id: number;
  name: string;
}
interface MenuData {
  Spices: MenuItem[];
  DryFruits: MenuItem[];
}
interface singleType {
  _id: string;
  type: string;
  subTypes: string[];
}

interface AllTypes {
  allTypes: singleType[];
  message: string;
}

export default function TopBarDesktop({
  handleMenuClick,
  onOpen,
  isOpen,
  onClose,
  initialRef,
  finalRef,
  inputValue,
  setInput,
  router,
  products,
}: any) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const [productTypes, setProductTypes] = useState<AllTypes>();

  const [offer, setOffer] = useState<ProductOffer | CartOffer>();
  const [closeOffer, setCloseOffer] = useState<boolean>(true);

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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };
  const handleLogin = () => {
    router.push("/login");
  };

  const filteredProducts = selectedCategory
    ? products?.filter(
        (product: { type: string }) => product.type === selectedCategory
      )
    : products;

  // console.log("filteredProducts", filteredProducts);
  // console.log("productTypes", productTypes);

  let token: string = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token") || "";
  }

  const { user } = useGetUser({
    token: token,
  });

  function capitalizeWords(inputString: string) {
    const words = inputString.split("-");
    const capitalizedWords = words.map((word: string) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return "";
      }
    });
    const resultString = capitalizedWords.join(" ");
    return resultString;
  }

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
        paddingX="70px"
      >
        <Flex gap="2vw" alignItems="center" width="45%">
          {productTypes?.allTypes?.map(
            (category: singleType, index: number) => (
              <div
                key={category?._id}
                onMouseLeave={() =>
                  setOpenMenus((prev) => prev.filter((item) => item !== index))
                }
              >
                <Menu isOpen={openMenus.includes(index)}>
                  <MenuButton
                    as={Button}
                    rightIcon={<AiFillCaretDown />}
                    sx={styles.btnStyles}
                    onMouseEnter={() => {
                      setOpenMenus((prev) => [...prev, index]);
                      handleMenuClick(category?.type, setSelectedCategory);
                    }}
                    onClick={() => router.push(`/products/${category?.type}`)}
                  >
                    {capitalizeWords(category?.type)}
                  </MenuButton>
                  <MenuList
                    position="absolute"
                    top={-2}
                    width={{ sm: "60vw", lg: "50vw", xl: "40vw" }}
                  >
                    {productTypes?.allTypes
                      ?.find((prod) => prod?.type === selectedCategory)
                      ?.subTypes?.map((subType, index) => (
                        <Box key={index}>
                          {index != 0 && <Divider mt={5} />}
                          <Text ml={3} my={3} fontWeight="bold">
                            {capitalizeWords(subType)}
                          </Text>
                          <Grid templateColumns="repeat(12, 1fr)" gap={3}>
                            {filteredProducts
                              ?.filter(
                                (prod: Product) => prod?.subType === subType
                              )
                              ?.map(
                                (product: {
                                  _id: React.Key | null | undefined;
                                  name:
                                    | string
                                    | number
                                    | boolean
                                    | React.ReactElement<
                                        any,
                                        | string
                                        | React.JSXElementConstructor<any>
                                      >
                                    | Iterable<React.ReactNode>
                                    | React.ReactPortal
                                    | React.PromiseLikeOfReactNode
                                    | null
                                    | undefined;
                                }) => (
                                  <GridItem colSpan={6} key={product._id}>
                                    <MenuItem
                                      key={product._id}
                                      _hover={{ bgColor: theme.colors.inputBg }}
                                      onClick={() => {
                                        router.push(
                                          `/products/${category?.type}/${product._id}`
                                        );
                                        onClose();
                                      }}
                                    >
                                      {product.name}
                                    </MenuItem>
                                  </GridItem>
                                )
                              )}
                          </Grid>
                        </Box>
                      ))}
                  </MenuList>
                </Menu>
              </div>
            )
          )}
          <Link
            color="white"
            _hover={{ color: `${theme.colors.iconColor}` }}
            as={NextLink}
            href="/products/all"
          >
            Products
          </Link>
          <Link
            color="white"
            _hover={{ color: `${theme.colors.iconColor}` }}
            as={NextLink}
            href="/about-us"
          >
            About us
          </Link>
          <Link
            color="white"
            _hover={{ color: `${theme.colors.iconColor}` }}
            as={NextLink}
            href="/contact-us"
          >
            Contact us
          </Link>
        </Flex>

        <Flex height="100%" width="10%" as={NextLink} href="/">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            height={"100%"}
            width={"100%"}
          />
        </Flex>
        <Flex alignItems="center" width="45%" justifyContent="flex-end">
          <Flex alignItems="center" gap="2vw">
            <Flex sx={styles.container} as={NextLink} href="/cart">
              <AiOutlineShoppingCart size={25} style={styles.iconStyles} />
            </Flex>
            <Flex sx={styles.container} onClick={onOpen}>
              <AiOutlineSearch size={25} style={styles.iconStyles} />
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
                      style={styles.input}
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
                          <Flex height="100px" mr="20px">
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
                              <Text fontSize="1.1rem">{product?.name}</Text>
                              <Text fontSize="1.3rem">
                                &#8377; {product?.variants[0]?.price}
                                {" ("}
                                {product?.variants[0]?.size}
                                {")"}
                              </Text>
                              <Text>
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
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<CgProfile size={25} style={styles.iconStyles} />}
                sx={styles.container}
              ></MenuButton>
              <MenuList>
                {user?._id && !user?.isAdmin && (
                  <MenuItem as={NextLink} href="/profile">
                    Profile
                  </MenuItem>
                )}
                {user?._id && user?.isAdmin && (
                  <MenuItem as={NextLink} href="/admin">
                    Admin panel
                  </MenuItem>
                )}
                {user?._id && (
                  <MenuItem as={NextLink} href="/orders">
                    My orders
                  </MenuItem>
                )}
                {user?._id && (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
                {!user?._id && <MenuItem onClick={handleLogin}>Login</MenuItem>}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
