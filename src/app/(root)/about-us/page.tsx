"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { theme } from "@/context/providers";
import { Flex, Image, Text } from "@chakra-ui/react";
import React, { CSSProperties } from "react";
import SingleElement from "@/components/aboutus/SingleElement";

const swiperData = [
  {
    heading: "Nurturing the Earth",
    content:
      "Our journey begins with a deep commitment to the land. We carefully irrigate our fields, ensuring that every spice and dry fruit we produce receives the purest, most natural nourishment.",
  },
  {
    heading: "Nature's Bounty",
    content:
      "With each season, we handpick the ripest treasures from our fields. Our dedicated farmers bring you the finest spices and dry fruits, harvested at the peak of flavor and aroma.",
  },
  {
    heading: "Crafting Perfection",
    content:
      "From field to factory, our rigorous processing methods maintain the integrity of our produce. We employ time-tested techniques to bring out the best flavors, colors, and aromas.",
  },
  {
    heading: "Creating Culinary Magic",
    content:
      "Our spices are ground to perfection, revealing their essence in every dish. Hathkut artisans bring their expertise to handcraft unique blends, and our final products are meticulously packed to grace your kitchen with flavor and freshness.",
  },
  {
    heading: "Beginning with Care",
    content:
      "It all starts with the selection of the finest fruit-bearing trees. We nurture these trees with precision and patience, ensuring they bear fruit of the highest quality, rich in flavor and nutrition.",
  },
  {
    heading: "Harvesting the Bounty",
    content:
      "When the fruits reach their peak ripeness, our skilled harvesters delicately handpick them. This careful selection guarantees that our dry fruits are bursting with natural sweetness and goodness.",
  },
  {
    heading: "Preserving Flavor and Nutrients",
    content:
      "After harvest, the fruits are gently dried using advanced techniques that preserve their flavors, colors, and essential nutrients. This process ensures that you enjoy the full richness of the fruit in every bite.",
  },
  {
    heading: "Sealing in Freshness",
    content:
      "Our dry fruits are then carefully packaged to lock in their freshness. Each package is a testament to our commitment to providing you with the most exquisite and nutritious dry fruits available.",
  },
];

export default function StoresPage() {
  return (
    <Flex direction="column">
      <Flex height="50vh">
        <Swiper
          slidesPerView={1}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          style={
            {
              "--swiper-pagination-color": "#F7D966",
            } as CSSProperties
          }
        >
          {swiperData.map((data, index) => (
            <SwiperSlide key={index}>
              <SingleElement data={data} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
      <Flex
        direction="column"
        textAlign="center"
        gap="4vh"
        alignItems="center"
        bgColor="#292929"
        paddingY="10vh"
        paddingX={{ base: "15px", md: "30px", lg: "70px" }}
      >
        <Text
          fontSize={{ base: "1.5rem", lg: "1.6rem" }}
          color={`${theme.colors.iconColor}`}
        >
          About THI
        </Text>
        <Text fontSize={{ base: "0.9rem", lg: "1rem" }} color="white" textAlign="justify">
          The Honest Ingredient is more than a brand, it&apos;s a journey into
          the realm of nature&apos;s finest offerings. With an unwavering
          commitment to quality, we meticulously source premium dry fruits,
          nuts, spices, and herbs that elevate your culinary experience. Our
          products tell tales of authenticity, handpicked from bountiful
          orchards and delivered to your doorstep. At &apos;The Honest
          Ingredient,&apos; we invite you to savor life&apos;s true flavors,
          transforming ordinary moments into extraordinary memories with each
          bite. The Honest Ingredient is more than a brand; it&apos;s a journey
          into the realm of nature&apos;s finest offerings. With an unwavering
          commitment to quality, we meticulously source premium dry fruits,
          nuts, spices, and herbs that
        </Text>
      </Flex>
      <Flex alignItems="center" direction={{base: "column", lg: "row"}}>
        <Text my={10} marginX={{ base: "15px", md: "30px", lg: "70px" }} fontSize={{ base: "1rem", lg: "1.1rem" }} textAlign="justify">
          At THI, we are not just spice and dry fruit providers; we are
          custodians of a rich tradition. Our journey is a celebration of
          nature&apos;s gifts, transformed with care into culinary delights that
          elevate every meal. Join us on this flavorful adventure and experience
          the essence of THI.
        </Text>
        <Image src="/assets/aboutus/lastSection.svg" width={{base: "100%", lg:"30%"}} alt="about"  />
      </Flex>
    </Flex>
  );
}
