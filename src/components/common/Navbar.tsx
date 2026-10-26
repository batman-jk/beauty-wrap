"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useSearchStore } from "@/store/useSearchStore";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Shop All", href: "/shop" },
  { name: "Necklaces", href: "/shop?category=Necklaces" },
  { name: "Earrings", href: "/shop?category=Earrings" },
  { name: "Rings", href: "/shop?category=Rings" },
  { name: "Bridal Sets", href: "/shop?category=Bridal+Sets" },
  { name: "Gifting", href: "/shop?category=Gifting" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const { openDrawer, getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { openSearch } = useSearchStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const totalCartCount = mounted ? getTotalItems() : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F6EDE3]/95 backdrop-blur-md shadow-sm border-b border-[#A9714B]/15 py-3"
            : "bg-[#F6EDE3]/80 backdrop-blur-xs py-4 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Hamburger & Desktop Navigation */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#3A2416] hover:text-[#A9714B] transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>

              <nav className="hidden lg:flex items-center space-x-7">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href.includes("category") &&
                      typeof window !== "undefined" &&
                      window.location.search.includes(link.href.split("=")[1]));

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-xs uppercase tracking-widest transition-colors font-medium relative group py-1 ${
                        isActive
                          ? "text-[#A9714B]"
                          : "text-[#3A2416]/85 hover:text-[#A9714B]"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 bottom-0 w-full h-[1.5px] bg-[#A9714B] origin-left transition-transform duration-300 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Brand Logo */}
            <div className="text-center">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl lg:text-3xl tracking-[0.2em] uppercase font-light text-[#3A2416] block group-hover:text-[#A9714B] transition-colors">
                  Her Beauty Wrap
                </span>
                <span className="block text-[9px] tracking-[0.35em] uppercase text-[#7A4A2B] -mt-1 opacity-80 font-sans">
                  Fine Bronze & Pearl Atelier
                </span>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={openSearch}
                className="p-2 text-[#3A2416] hover:text-[#A9714B] transition-colors relative"
                aria-label="Search Catalog"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              <Link
                href="/wishlist"
                className="p-2 text-[#3A2416] hover:text-[#A9714B] transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#A9714B] text-[#F6EDE3] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-medium shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={openDrawer}
                className="p-2 text-[#3A2416] hover:text-[#A9714B] transition-colors relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalCartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#7A4A2B] text-[#F6EDE3] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-medium shadow-sm animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#3A2416]/50 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[82vw] max-w-sm bg-[#F6EDE3] z-50 shadow-2xl flex flex-col p-6 border-r border-[#A9714B]/20"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#A9714B]/20">
                <div>
                  <span className="font-serif text-xl tracking-[0.15em] uppercase text-[#3A2416] block">
                    Her Beauty Wrap
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#7A4A2B]">
                    Quiet Luxury Atelier
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#3A2416] hover:text-[#A9714B]"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              <div className="py-6 flex-1 overflow-y-auto space-y-1">
                <p className="text-[11px] uppercase tracking-widest text-[#7A4A2B] font-semibold mb-3 px-3">
                  Collections & Atelier
                </p>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[#3A2416] hover:bg-[#EBD3BE]/60 transition-colors tracking-wide"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#A9714B]/60" />
                  </Link>
                ))}

                <div className="pt-6 mt-6 border-t border-[#A9714B]/20 space-y-1">
                  <p className="text-[11px] uppercase tracking-widest text-[#7A4A2B] font-semibold mb-3 px-3">
                    Concierge & Help
                  </p>
                  <Link
                    href="/contact"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#3A2416]/80 hover:bg-[#EBD3BE]/60 transition-colors"
                  >
                    <span>Concierge & Styling</span>
                    <ChevronRight className="w-4 h-4 text-[#A9714B]/60" />
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#3A2416]/80 hover:bg-[#EBD3BE]/60 transition-colors"
                  >
                    <span>Our Craftsmanship & Story</span>
                    <ChevronRight className="w-4 h-4 text-[#A9714B]/60" />
                  </Link>
                </div>
              </div>

              {/* Mobile Drawer Bottom Banner */}
              <div className="pt-4 border-t border-[#A9714B]/20">
                <div className="p-3 bg-[#EBD3BE]/40 rounded-xl flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#C9A66B] shrink-0" />
                  <p className="text-xs text-[#3A2416] leading-tight">
                    <strong className="block font-medium">Free insured delivery</strong>
                    On all orders over ₹1,999 in India
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
