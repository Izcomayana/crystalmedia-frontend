import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AOSInit } from "./aos";
import Providers from "../components/Providers.tsx";

const montserrat = Montserrat({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CrystalMediatech",
  description: "A media agency",
  keywords:
    "design, public relations, social media marketing, influencer marketing, campaign management, content strategy creation",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "CrystalMediatech",
    description: "A media agency",
    url: "https://crystalmedia-fe.vercel.app/",
    images: [
      {
        url: "/favicon.ico",
        width: 800,
        height: 600,
        alt: "CrystalMediatech-Logo",
      },
    ],
    siteName: "CrystalMeditech",
  },
  twitter: {
    card: "summary_large_image",
    site: "@CrystalMTech",
    creator: "@CrystalMTech",
    title: "CrystalMediatech",
    description: "A media agency",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AOSInit />
      <body className={poppins.className}>
        <div className="bg-[#000309] pb-16 lg:pb-28">
          <Header />
        </div>
        <>
          <Providers>{children}</Providers>
        </>
        <Footer />
      </body>
    </html>
  );
}
