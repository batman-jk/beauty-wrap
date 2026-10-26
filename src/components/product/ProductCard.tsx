"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Sparkles, Check } from "lucide-react";
import { Product, formatINR } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useToastStore } from "@/store/useToastStore";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addToast } = useToastStore();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes ? product.sizes[0] : undefined, 1);
    setIsAdded(true);
    addToast({
      title: "Added to Bag",
      description: `${product.name} has been placed in your indulgence bag.`,
      type: "success",
    });
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    addToast({
      title: added ? "Saved to Wishlist" : "Removed from Wishlist",
      description: `${product.name} ${added ? "is saved for later." : "was removed."}`,
      type: "info",
    });
  };

  return (
    <div
      className="group relative flex flex-col bg-white/60 hover:bg-white/95 rounded-2xl border border-[#A9714B]/15 overflow-hidden transition-all duration-400 hover:shadow-xl hover:border-[#A9714B]/35"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Hover Swap */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#EBD3BE]/30">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
              product.images[1] ? (isHovered ? "opacity-0" : "opacity-100") : "opacity-100"
            }`}
          />

          {/* Secondary Image for Hover Swap */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-opacity duration-700 ease-out absolute inset-0 ${
                isHovered ? "opacity-100 scale-105" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.inStock === false && (
            <span className="bg-[#3A2416] text-[#F6EDE3] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-md border border-[#C9A66B]/30">
              Sold Out
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && product.inStock !== false && (
            <span className="bg-[#A9714B] text-[#F6EDE3] text-[10px] font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              {product.discountPercent}% Off
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#3A2416] text-[#EBD3BE] text-[10px] font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#C9A66B]" />
              Bestseller
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span className="bg-[#7A4A2B] text-[#F6EDE3] text-[10px] font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isFavorited
              ? "bg-[#A9714B] text-white shadow-md scale-105"
              : "bg-white/80 backdrop-blur-xs text-[#3A2416] hover:text-[#A9714B] hover:bg-white shadow-xs"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFavorited ? "fill-white stroke-white scale-110" : "stroke-[1.6]"
            }`}
          />
        </button>

        {/* Quick Add Button Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden sm:block">
          <button
            type="button"
            disabled={product.inStock === false}
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs uppercase tracking-widest font-medium transition-all shadow-md flex items-center justify-center gap-2 ${
              product.inStock === false
                ? "bg-stone-700/80 text-stone-300 cursor-not-allowed"
                : isAdded
                ? "bg-emerald-700 text-white"
                : "bg-[#3A2416]/90 hover:bg-[#3A2416] text-[#F6EDE3] backdrop-blur-xs hover:shadow-lg"
            }`}
          >
            {product.inStock === false ? (
              <span>Sold Out</span>
            ) : isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C9A66B]" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#A9714B] font-medium uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-[#3A2416]/80 font-sans">
              <Star className="w-3 h-3 fill-[#C9A66B] stroke-[#C9A66B]" />
              <span className="font-mono text-xs">{product.rating}</span>
              <span className="text-[10px] text-[#3A2416]/50">({product.reviewsCount})</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-base font-medium text-[#3A2416] group-hover:text-[#A9714B] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#3A2416]/60 mt-1 line-clamp-1">
            {product.subtitle || product.material}
          </p>
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="mt-3 pt-3 border-t border-[#A9714B]/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-semibold text-[#7A4A2B]">
              {formatINR(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#3A2416]/40 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Compact Mobile Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="sm:hidden p-2 rounded-lg bg-[#3A2416] text-[#F6EDE3] hover:bg-[#A9714B] transition-colors"
            aria-label="Add to bag"
          >
            {isAdded ? <Check className="w-4 h-4 text-emerald-300" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
