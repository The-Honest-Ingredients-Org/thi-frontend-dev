"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Flex, Image, Text } from "@chakra-ui/react";
import "swiper/css/effect-fade";
import MobileSingleSlide from "./MobileSingleSlide";

export default function MobileSlider({ set_my_swiper, setActiveButton }: any) {
  return (
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      className="mySwiper"
      onInit={(ev) => {
        set_my_swiper(ev);
      }}
      onSlideChange={() =>
        setActiveButton((prevIndex: number) =>
          prevIndex >= 1 ? 0 : prevIndex + 1
        )
      }
      effect="fade"
    >
      <SwiperSlide>
        <MobileSingleSlide image="spices" />
      </SwiperSlide>
      <SwiperSlide>
        <MobileSingleSlide image="dryFruits" />
      </SwiperSlide>
    </Swiper>
  );
}
