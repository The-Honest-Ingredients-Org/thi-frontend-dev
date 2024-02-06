"use client";

import React, { CSSProperties, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "@chakra-ui/react";

export default function InformationSlider() {
  const [imageType, setImageType] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setImageType(1);
      } else {
        setImageType(0);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      style={
        {
          "--swiper-pagination-color": "#F7D966",
        } as CSSProperties
      }
    >
      <SwiperSlide>
        <Image
          src={
            imageType === 1
              ? "/assets/mobileAd.svg"
              : "/assets/informationimg.svg"
          }
          alt="logo"
          maxHeight="400px"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={
            imageType === 1
              ? "/assets/mobileAd.svg"
              : "/assets/informationimg.svg"
          }
          alt="logo"
          maxHeight="400px"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={
            imageType === 1
              ? "/assets/mobileAd.svg"
              : "/assets/informationimg.svg"
          }
          alt="logo"
          maxHeight="400px"
        />
      </SwiperSlide>
    </Swiper>
  );
}
