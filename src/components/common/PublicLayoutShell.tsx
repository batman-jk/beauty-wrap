"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import Navbar from "@/components/common/Navbar";
import MobileTabBar from "@/components/common/MobileTabBar";
import CartDrawer from "@/components/common/CartDrawer";
import SearchOverlay from "@/components/common/SearchOverlay";
import Footer from "@/components/common/Footer";
import ToastContainer from "@/components/common/ToastContainer";
import { ProductProvider } from "@/context/ProductContext";

export default function PublicLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <ProductProvider>
      {isAdmin ? (
        // Dedicated, distraction-free Admin workspace
        <main className="min-h-screen flex flex-col bg-[#F6EDE3]">{children}</main>
      ) : (
        // Public Storefront chrome
        <>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <MobileTabBar />
        </>
      )}
      <ToastContainer />
    </ProductProvider>
  );
}
