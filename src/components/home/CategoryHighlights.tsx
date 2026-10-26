"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORY_ITEMS = [
  {
    name: "Necklaces",
    count: "4 Pieces",
    href: "/shop?category=Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    tagline: "Liquid Gold & Layered Chains",
  },
  {
    name: "Earrings",
    count: "4 Pieces",
    href: "/shop?category=Earrings",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
    tagline: "Baroque Drops & Molten Huggies",
  },
  {
    name: "Rings",
    count: "4 Pieces",
    href: "/shop?category=Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    tagline: "Satin Domes & Stacking Bands",
  },
  {
    name: "Bracelets",
    count: "3 Pieces",
    href: "/shop?category=Bracelets",
    image: "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=800&auto=format&fit=crop",
    tagline: "Cuffs & Diamond Tennis Wraps",
  },
  {
    name: "Bangles",
    count: "3 Pieces",
    href: "/shop?category=Bangles",
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800&auto=format&fit=crop",
    tagline: "Architectural & Temple Kadas",
  },
  {
    name: "Anklets",
    count: "3 Pieces",
    href: "/shop?category=Anklets",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
    tagline: "Gleaming Chimes & Seed Pearls",
  },
  {
    name: "Bridal Sets",
    count: "3 Pieces",
    href: "/shop?category=Bridal+Sets",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    tagline: "Regal Kundan & Collet Chokers",
  },
  {
    name: "Gifting",
    count: "2 Curations",
    href: "/shop?category=Gifting",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    tagline: "Fawn Velvet Keepsake Boxes",
  },
];

export default function CategoryHighlights() {
  return (
    <section className="py-16 sm:py-20 bg-[#F6EDE3] border-b border-[#A9714B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold block mb-2">
              Curated Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light">
              Explore by Silhouette
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest text-[#7A4A2B] hover:text-[#3A2416] font-semibold inline-flex items-center gap-1.5 mt-3 md:mt-0 transition-colors group"
          >
            <span>View All Creations</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 8-Grid Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {CATEGORY_ITEMS.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#EBD3BE]/40 border border-[#A9714B]/15 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-4 sm:p-5"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2416]/85 via-[#3A2416]/20 to-transparent group-hover:from-[#3A2416]/95 transition-all duration-300" />

              {/* Text content */}
              <div className="relative z-10 text-white">
                <span className="text-[10px] tracking-widest uppercase text-[#C9A66B] font-medium block">
                  {cat.count}
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-[#F6EDE3] group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#EBD3BE]/80 line-clamp-1 mt-0.5 font-light">
                  {cat.tagline}
                </p>
              </div>

              {/* Top right icon button */}
              <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
