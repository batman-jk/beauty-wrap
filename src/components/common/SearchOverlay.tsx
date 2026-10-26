"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import { PRODUCTS, formatINR } from "@/data/products";
import { AnimatePresence, motion } from "framer-motion";

const POPULAR_SEARCHES = [
  "Baroque Pearls",
  "Gold Vermeil",
  "Bridal Choker",
  "Tennis Bracelet",
  "Dome Ring",
  "Herringbone Chain",
  "Anklets",
];

export default function SearchOverlay() {
  const { isOpen, closeSearch, searchQuery, setSearchQuery } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSearch]);

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.material.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          item.description.toLowerCase().includes(query)
        );
      }).slice(0, 8)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-[#3A2416]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="min-h-full px-4 text-center flex items-start justify-center pt-16 sm:pt-24 pb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-[#F6EDE3] rounded-2xl shadow-2xl border border-[#A9714B]/20 overflow-hidden text-left relative z-10"
            >
              {/* Search Bar Input */}
              <div className="p-4 sm:p-6 border-b border-[#A9714B]/20 flex items-center gap-3">
                <Search className="w-5 h-5 text-[#A9714B] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search earrings, pearls, 18k gold necklaces..."
                  className="w-full bg-transparent text-base sm:text-lg text-[#3A2416] placeholder-[#3A2416]/40 focus:outline-none font-serif tracking-wide"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-[#3A2416]/40 hover:text-[#3A2416]"
                    aria-label="Clear input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={closeSearch}
                  className="text-xs uppercase tracking-widest text-[#7A4A2B] hover:text-[#3A2416] ml-2 px-2 py-1 rounded-md hover:bg-[#EBD3BE]/60 transition-colors font-sans"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="p-5 max-h-[60vh] overflow-y-auto">
                {searchQuery.trim() === "" ? (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#7A4A2B] font-semibold mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
                      <span>Trending Curations</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-3.5 py-1.5 rounded-full text-xs bg-[#EBD3BE]/60 hover:bg-[#D9A98A]/50 text-[#3A2416] transition-colors border border-[#A9714B]/15"
                        >
                          {term}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#A9714B]/15">
                      <p className="text-xs uppercase tracking-widest text-[#7A4A2B] font-semibold mb-3">
                        Featured Categories
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["Necklaces", "Earrings", "Rings", "Bridal Sets"].map((cat) => (
                          <Link
                            key={cat}
                            href={`/shop?category=${encodeURIComponent(cat)}`}
                            onClick={closeSearch}
                            className="p-3 bg-white/60 rounded-xl border border-[#A9714B]/10 hover:border-[#A9714B]/40 transition-all text-xs text-[#3A2416] font-medium flex items-center justify-between group"
                          >
                            <span>{cat}</span>
                            <ArrowRight className="w-3 h-3 text-[#A9714B] group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#7A4A2B] mb-3">
                      <span>Found {filteredProducts.length} handcrafted pieces</span>
                      <Link
                        href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                        onClick={closeSearch}
                        className="text-[#A9714B] hover:underline font-medium flex items-center gap-1"
                      >
                        View all in Shop <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="font-serif text-lg text-[#3A2416]">No pieces found</p>
                        <p className="text-xs text-[#3A2416]/60 mt-1">
                          Try searching for &quot;Pearl&quot;, &quot;Gold&quot;, &quot;Choker&quot; or &quot;Ring&quot;
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filteredProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-[#A9714B]/15 hover:border-[#A9714B]/40 hover:shadow-xs transition-all group"
                          >
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#EBD3BE]/40">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs uppercase tracking-wider text-[#A9714B] font-medium">
                                {product.category}
                              </p>
                              <h4 className="font-serif text-sm font-medium text-[#3A2416] group-hover:text-[#A9714B] transition-colors truncate">
                                {product.name}
                              </h4>
                              <p className="text-xs font-semibold text-[#7A4A2B] mt-0.5">
                                {formatINR(product.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
