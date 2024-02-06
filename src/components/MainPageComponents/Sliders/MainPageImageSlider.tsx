"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "@chakra-ui/react";
import "swiper/css/effect-fade";

export default function MainPageImageSlider({set_my_swiper, setActiveButton}: any) {
  return (
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay,Pagination, Navigation, EffectFade]}
      className="mySwiper"
      onInit={(ev) => {
        set_my_swiper(ev)
      }}
      onSlideChange={() => setActiveButton((prevIndex: number) => (prevIndex >= 1 ? 0 : prevIndex + 1))}
      effect="fade"
    >
      <SwiperSlide>
        <Image
          src="/assets/spices.svg"
          alt="logo"
          height={"100%"}
          width={"100%"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/dryFruits.svg"
          alt="logo"
          height={"100%"}
          width={"100%"}
        />
      </SwiperSlide>
    </Swiper>
  );
}
