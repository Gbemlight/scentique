import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Scentique",
  description: "Luxury Fragrance Experience",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable}`}
        style={{
          backgroundColor: "var(--color-background-cream)",
          color: "var(--color-text-charcoal)",
          fontFamily: "var(--font-inter)",
        }}
      >
        <Providers>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}