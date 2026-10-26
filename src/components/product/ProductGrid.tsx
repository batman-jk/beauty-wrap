"use client";

import React from "react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  emptyMessage = "No handcrafted pieces match your selection.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white/40 rounded-2xl border border-[#A9714B]/15">
        <p className="font-serif text-xl text-[#3A2416] mb-2">{emptyMessage}</p>
        <p className="text-xs text-[#3A2416]/60">
          Try adjusting your filters or search keywords to view other pieces.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
