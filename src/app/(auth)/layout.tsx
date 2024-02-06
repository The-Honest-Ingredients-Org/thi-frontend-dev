import type { Metadata } from "next";
import { Providers } from "../../context/providers";

export const metadata: Metadata = {
  title: "THI | authentication",
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
