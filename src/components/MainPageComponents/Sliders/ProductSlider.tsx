import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";

import { Box, Divider, Flex, Image } from "@chakra-ui/react";

interface Props {
  images: string[]; // Change the type to an array of strings
}

export default function ProductSlider(props: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper: {
    activeIndex: React.SetStateAction<number>;
  }) => {
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <Flex
      alignItems="center"
      direction="column"
      justifyContent="space-between"
      height="100%"
      width="100%"
    >
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        style={{
          height: "80%",
          width: "100%",
          borderRadius: "1rem",
        }}
        onSlideChange={handleSlideChange}
      >
        {props.images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image alt="img" src={image} />{" "}
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        style={{
          height: "20%",
          width: "100%",
          marginTop: "1.5rem",
        }}
      >
        {props.images.map((image, index) => (
          <SwiperSlide key={index} className={`swiper-slide`}>
            <Image alt="img" src={image} mb="2px" borderRadius="5px" />
            {activeSlide === index && (
              <Box height="1px" border="2px solid black"></Box>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
}
