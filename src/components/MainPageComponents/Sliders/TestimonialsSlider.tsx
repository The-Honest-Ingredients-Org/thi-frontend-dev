"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TestimonialSlide from "../Slide/TestimonialSlide";
import { Button, Flex } from "@chakra-ui/react";
import { theme } from "@/context/providers";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const styles = {
  btnStyle: {
    padding: "10px",
    borderRadius: "50%",
    backgroundColor: theme.colors.main,
    "&:hover": { backgroundColor: "#4b4b4b" },
    display: { base: "none", lg: "block" },
  },
};

export default function TestimonialsSlider() {
  const [my_swiper, set_my_swiper] = useState<SwiperCore | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(3);

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

  return (
    <Flex width="90%" alignItems="center" gap="3vw">
      <Button sx={styles.btnStyle} onClick={() => my_swiper?.slidePrev()}>
        <BsChevronLeft size={20} color={theme.colors.iconColor} />
      </Button>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={30}
        navigation={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onInit={(ev) => {
          set_my_swiper(ev);
        }}
      >
        <SwiperSlide>
          <TestimonialSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialSlide />
        </SwiperSlide>
      </Swiper>
      <Button sx={styles.btnStyle} onClick={() => my_swiper?.slideNext()}>
        <BsChevronRight size={20} color={theme.colors.iconColor} />
      </Button>
    </Flex>
  );
}
