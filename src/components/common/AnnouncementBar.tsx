"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const ANNOUNCEMENTS = [
  "Complimentary insured shipping on all orders over ₹1,999",
  "Use code HERLUXE at checkout for 10% off your first indulgence",
  "Handcrafted in 18K Gold Vermeil & Natural Baroque Pearls",
  "Each order arrives in our signature keepsake fawn-velvet box",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#3A2416] text-[#EBD3BE] text-xs tracking-widest uppercase font-light py-2 px-4 relative z-40 border-b border-[#7A4A2B]/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-[11px] opacity-75">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
          <span>Quiet Luxury • Skin-Toned Glow</span>
        </div>

        <div className="flex-1 text-center truncate transition-all duration-500 font-sans tracking-wide">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B] animate-ping" />
            {ANNOUNCEMENTS[index]}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px]">
          <Link
            href="/shop"
            className="hover:text-[#F6EDE3] transition-colors flex items-center gap-1 group text-[#C9A66B]"
          >
            Explore New In
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <span className="opacity-40">|</span>
          <span className="font-mono text-[#D9A98A]">INR (₹)</span>
        </div>
      </div>
    </div>
  );
}
