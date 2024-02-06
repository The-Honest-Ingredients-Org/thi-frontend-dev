"use client";

import React, { CSSProperties } from "react";
import SingleElement from "./ExtraAdvertisement/SingleElement";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Flex } from "@chakra-ui/react";

const carouselData = [
  {
    heading: "THE HONEST INGREDIENT",
    content:
      "The Honest Ingredient is more than a brand; it's a journey into the realm of nature's finest offerings. With an unwavering commitment to quality, we meticulously source premium dry fruits, nuts, spices, and herbs that elevate your culinary experience. Our products tell tales of authenticity, handpicked from bountiful orchards and delivered to your doorstep. At 'The Honest Ingredient,' we invite you to savor life's true flavors, transforming ordinary moments into extraordinary memories with each bite.",
    image: "advertisement1.png",
  },
  {
    heading: "THE HONEST INGREDIENT",
    content:
      "The Honest Ingredient is more than a brand; it's a journey into the realm of nature's finest offerings. With an unwavering commitment to quality, we meticulously source premium dry fruits, nuts, spices, and herbs that elevate your culinary experience. Our products tell tales of authenticity, handpicked from bountiful orchards and delivered to your doorstep. At 'The Honest Ingredient,' we invite you to savor life's true flavors, transforming ordinary moments into extraordinary memories with each bite.",
    image: "advertisement1.png",
  },
];

export default function ExtraAdverstisements() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      style={
        {
          "--swiper-pagination-color": "#F7D966",
        } as CSSProperties
      }
    >
      {carouselData.map((data, index) => (
        <SwiperSlide key={index}>
          <SingleElement data={data} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
