"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Search, Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useSearchStore } from "@/store/useSearchStore";

export default function MobileTabBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const { openDrawer, getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { openSearch } = useSearchStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCartCount = mounted ? getTotalItems() : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  const tabs = [
    { name: "Home", href: "/", icon: Home, isAction: false },
    { name: "Shop", href: "/shop", icon: Compass, isAction: false },
    { name: "Search", href: "#", icon: Search, isAction: true, onClick: openSearch },
    {
      name: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      isAction: false,
      badge: wishlistCount,
    },
    {
      name: "Bag",
      href: "#",
      icon: ShoppingBag,
      isAction: true,
      onClick: openDrawer,
      badge: totalCartCount,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#F6EDE3]/95 backdrop-blur-md border-t border-[#A9714B]/20 px-2 py-1.5 pb-safe shadow-[0_-4px_20px_rgba(58,36,22,0.06)]">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = !tab.isAction && pathname === tab.href;
          const Icon = tab.icon;

          if (tab.isAction) {
            return (
              <button
                key={tab.name}
                type="button"
                onClick={tab.onClick}
                className="flex flex-col items-center justify-center py-1 px-3 min-w-[56px] text-[#3A2416]/75 hover:text-[#A9714B] transition-colors relative"
                aria-label={tab.name}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-[#A9714B] text-[#F6EDE3] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-medium shadow-sm">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 font-medium tracking-tight">
                  {tab.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] transition-colors relative ${
                isActive ? "text-[#A9714B]" : "text-[#3A2416]/75 hover:text-[#A9714B]"
              }`}
              aria-label={tab.name}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 stroke-[1.5] ${isActive ? "text-[#A9714B]" : ""}`} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#A9714B] text-[#F6EDE3] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-medium shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.name}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#A9714B] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
