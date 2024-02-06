// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Alice } from "next/font/google";

const colors = {
  main: "#1F1F1F",
  secondary: "",
  tertiary: "",
  inputBg: "#fffae8",
  whiteBg: "#FFF9F7",
  hoverBg: "#343434",
  iconColor: "#F7D966",
};

const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const alice = Alice({
  subsets: ["latin"],
  weight: "400",
});

export const theme = extendTheme({
  colors,
  fonts: {
    heading: "var(--font-alice)",
    body: "var(--font-alice)",
  },
  breakpoints,
});
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-alice: ${alice.style.fontFamily};
          }
        `}
      </style>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
    </>
  );
}
