"use client";

import React, { useState, useRef, useEffect } from "react";
import NextLink from "next/link";
import { Flex, MenuItem, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { products } from "@/data/productsData";
import { useRouter } from "next/navigation";
import TopBarDesktop from "./TopBarDesktop";
import TopBarMobile from "./TopBarMobile";
import { useAllProducts } from "@/swr/user/products/useFetchProduct";
import { theme } from "@/context/providers";

interface MenuItem {
  id: number;
  name: string;
}
interface MenuData {
  Spices: MenuItem[];
  DryFruits: MenuItem[];
}

export default function TopBar() {
  const [inputValue, setInputValue] = useState("");
  const { data, isLoading, error } = useAllProducts();

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleMenuClick = (category: any, selectedCategory: any) => {
    selectedCategory(category);
  };

  const setInput = (value: React.SetStateAction<string>) => {
    setInputValue(value);
  };

  const [navbar, setNavbar] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setNavbar(0);
      } else {
        setNavbar(1);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {navbar === 1 && (
        <TopBarDesktop
          products={data?.products}
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          initialRef={initialRef}
          finalRef={finalRef}
          inputValue={inputValue}
          setInput={setInput}
          router={router}
          handleMenuClick={handleMenuClick}
        />
      )}

      {navbar === 0 && (
        <TopBarMobile
          products={data?.products}
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          initialRef={initialRef}
          finalRef={finalRef}
          inputValue={inputValue}
          setInput={setInput}
          router={router}
          handleMenuClick={handleMenuClick}
        />
      )}
    </>
  );
}
