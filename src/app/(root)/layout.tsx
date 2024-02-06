// imports
import type { Metadata } from "next";
import { Providers } from "../../context/providers";
import TopBar from "@/components/TopBar/TopBar";
import "./style.css";
import Footer from "@/components/MainPage/Footer";

export const metadata: Metadata = {
  title: "The Honest Ingredient",
  description: "Best ingredients across the globe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopBar />
          <div style={{
            paddingTop: "10vh"
          }}>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
