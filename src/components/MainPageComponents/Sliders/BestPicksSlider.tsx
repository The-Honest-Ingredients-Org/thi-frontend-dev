"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BestPickSlide, { Product } from "../Slide/BestPickSlide";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { theme } from "@/context/providers";
import { useAllProducts } from "@/swr/user/products/useFetchProduct";

export default function BestPicksSlider() {
  const [my_swiper, set_my_swiper] = useState<SwiperCore | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const styles = {
    btnStyle: {
      padding: "10px",
      borderRadius: "50%",
      backgroundColor: theme.colors.main,
      "&:hover": { backgroundColor: "#4b4b4b" },
      display: { base: "none", lg: "block" },
    },
  };

  const { data, isLoading, error } = useAllProducts();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1200) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }

      if (my_swiper) {
        my_swiper.params.slidesPerView = slidesPerView;
        my_swiper.update();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [my_swiper, slidesPerView]);

  if (isLoading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor={theme.colors.gray}
          color={theme.colors.ci}
          size="md"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width={"100%"}
        height={"100vh"}
      >
        <Text
          style={{
            color: "red",
          }}
          size="1.2rem"
          align="center"
        >
          Error loading data
        </Text>
      </Flex>
    );
  }

  return (
    <Flex width="90%" alignItems="center" gap="3vw" mb={10}>
      <Button sx={styles.btnStyle} onClick={() => my_swiper?.slidePrev()}>
        <BsChevronLeft size={20} color={theme.colors.iconColor} />
      </Button>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={40}
        autoplay={slidesPerView <= 2 && {
          delay: 5000,
          disableOnInteraction: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onInit={(ev) => {
          set_my_swiper(ev);
        }}
      >
        {data?.products ? data?.products
          .sort((a: Product, b: Product) => b.rating - a.rating)
          .map((product: Product) => (
            <SwiperSlide key={product._id}>
              <BestPickSlide product={product} />
            </SwiperSlide>
          )) : <Flex>No products here.</Flex>}
      </Swiper>
      <Button sx={styles.btnStyle} onClick={() => my_swiper?.slideNext()}>
        <BsChevronRight size={20} color={theme.colors.iconColor} />
      </Button>
    </Flex>
  );
}
