"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLiveProducts } from "@/context/ProductContext";

type TabType = "bestsellers" | "newArrivals" | "bridal";

export default function FeaturedCollections() {
  const [activeTab, setActiveTab] = useState<TabType>("bestsellers");
  const { products } = useLiveProducts();

  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const bridal = products.filter((p) => p.category === "Bridal Sets" || p.occasion === "Bridal & Wedding").slice(0, 4);

  const displayProducts =
    activeTab === "bestsellers"
      ? (bestsellers.length > 0 ? bestsellers : products.slice(0, 4))
      : activeTab === "newArrivals"
      ? (newArrivals.length > 0 ? newArrivals : products.slice(0, 4))
      : (bridal.length > 0 ? bridal : products.slice(0, 4));

  return (
    <section className="py-16 sm:py-20 bg-[#F6EDE3]/60 border-b border-[#A9714B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#A9714B] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
            <span>Handpicked Adornments</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light">
            Crafted for Continuous Radiance
          </h2>
          <p className="text-xs sm:text-sm text-[#3A2416]/70 mt-2 font-light">
            Every creation is designed to be worn effortlessly every day or layered for momentous celebrations.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#EBD3BE]/70 border border-[#A9714B]/20 shadow-inner">
            <button
              onClick={() => setActiveTab("bestsellers")}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeTab === "bestsellers"
                  ? "bg-[#3A2416] text-[#F6EDE3] shadow-md"
                  : "text-[#3A2416]/80 hover:text-[#3A2416]"
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setActiveTab("newArrivals")}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeTab === "newArrivals"
                  ? "bg-[#3A2416] text-[#F6EDE3] shadow-md"
                  : "text-[#3A2416]/80 hover:text-[#3A2416]"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("bridal")}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeTab === "bridal"
                  ? "bg-[#3A2416] text-[#F6EDE3] shadow-md"
                  : "text-[#3A2416]/80 hover:text-[#3A2416]"
              }`}
            >
              Bridal & Heritage
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 btn-luxury px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold shadow-md"
          >
            <span>Explore All 24+ Treasures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
