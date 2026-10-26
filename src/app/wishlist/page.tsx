"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { useToastStore } from "@/store/useToastStore";
import { formatINR } from "@/data/products";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { addToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMoveToCart = (product: (typeof items)[0]) => {
    addItem(product, product.sizes ? product.sizes[0] : undefined, 1);
    removeItem(product.id);
    addToast({
      title: "Moved to Indulgence Bag",
      description: `${product.name} has been placed in your bag.`,
      type: "success",
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-[70vh] bg-[#F6EDE3] flex items-center justify-center">
        <div className="font-serif text-lg text-[#3A2416] animate-pulse">
          Opening Your Saved Curations...
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#F6EDE3] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center p-8 sm:p-10 bg-white/70 rounded-3xl border border-[#A9714B]/20 shadow-md">
          <div className="w-16 h-16 rounded-full bg-[#EBD3BE]/60 text-[#A9714B] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 stroke-[1.2]" />
          </div>
          <h1 className="font-serif text-3xl text-[#3A2416] mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#3A2416]/70 mb-6 font-light leading-relaxed">
            Save pieces that catch your eye while exploring our 18K gold vermeil and baroque pearl creations.
          </p>
          <Link
            href="/shop"
            className="btn-luxury px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 shadow-md"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6EDE3] py-10 sm:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#A9714B]/20 pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>Personal Curations</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light">
              Your Saved Pieces ({items.length})
            </h1>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-[#3A2416]/60 hover:text-red-700 font-medium transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="group bg-white/70 rounded-2xl border border-[#A9714B]/15 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg transition-all"
            >
              <div className="relative aspect-square bg-[#EBD3BE]/30 overflow-hidden">
                <Link href={`/product/${product.slug}`} className="block w-full h-full">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#3A2416]/70 hover:text-red-600 transition-colors shadow-xs"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A9714B] font-semibold">
                    {product.category}
                  </span>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-serif text-base font-medium text-[#3A2416] hover:text-[#A9714B] transition-colors truncate mt-0.5">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#3A2416]/60 truncate mt-0.5">
                    {product.material}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#A9714B]/15 flex items-center justify-between">
                  <div className="font-serif text-lg font-semibold text-[#7A4A2B]">
                    {formatINR(product.price)}
                  </div>
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="btn-luxury px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C9A66B]" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
