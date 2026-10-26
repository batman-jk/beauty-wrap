import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import Navbar from "@/components/common/Navbar";
import MobileTabBar from "@/components/common/MobileTabBar";
import CartDrawer from "@/components/common/CartDrawer";
import SearchOverlay from "@/components/common/SearchOverlay";
import ToastContainer from "@/components/common/ToastContainer";
import Footer from "@/components/common/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F6EDE3",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Her Beauty Wrap | Quiet Luxury Bronze, Gold Vermeil & Pearl Jewelry",
  description:
    "Discover Her Beauty Wrap: an intimate jewelry atelier crafting 18K gold vermeil, natural baroque pearls, and warm skin-toned bronze ornaments. Enjoy complimentary insured delivery across India.",
  keywords: [
    "Her Beauty Wrap",
    "gold vermeil jewelry India",
    "baroque pearl earrings",
    "quiet luxury jewelry",
    "bronze jewelry",
    "bridal kundan choker",
    "aesthetic everyday jewelry",
  ],
  openGraph: {
    title: "Her Beauty Wrap | Quiet Luxury Fine Jewelry",
    description:
      "Crafted for the modern muse. 18K gold vermeil, organic baroque pearls, and quiet bronze elegance.",
    url: "https://herbeautywrap.com",
    siteName: "Her Beauty Wrap",
    images: [
      {
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Her Beauty Wrap Jewelry Atelier",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Her Beauty Wrap | Quiet Luxury Jewelry",
    description: "Bathed in the warm glow of 18K gold vermeil and natural baroque pearls.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#F6EDE3] text-[#3A2416] antialiased selection:bg-[#EBD3BE] selection:text-[#3A2416]">
        {/* Top announcement bar */}
        <AnnouncementBar />

        {/* Sticky luxury navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Luxury Footer */}
        <Footer />

        {/* Global Overlays & Drawers */}
        <CartDrawer />
        <SearchOverlay />
        <MobileTabBar />
        <ToastContainer />
      </body>
    </html>
  );
}
