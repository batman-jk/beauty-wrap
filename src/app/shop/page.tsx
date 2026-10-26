"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  PRODUCTS,
  CATEGORIES,
  MATERIALS,
  OCCASIONS,
  Product,
} from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import {
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹2,500", min: 0, max: 2500 },
  { label: "₹2,500 - ₹5,000", min: 2500, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Featured & Popular", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Customer Rating", value: "rating" },
  { label: "New Arrivals", value: "newest" },
];

function ShopInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPriceRangeIndex, setSelectedPriceRangeIndex] = useState<number>(0);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("All");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price range
    const priceRange = PRICE_RANGES[selectedPriceRangeIndex];
    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Material
    if (selectedMaterial !== "All") {
      result = result.filter((p) => p.material === selectedMaterial);
    }

    // Occasion
    if (selectedOccasion !== "All") {
      result = result.filter((p) => p.occasion === selectedOccasion);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedPriceRangeIndex,
    selectedMaterial,
    selectedOccasion,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedPriceRangeIndex !== 0 ||
    selectedMaterial !== "All" ||
    selectedOccasion !== "All" ||
    searchQuery !== "";

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRangeIndex(0);
    setSelectedMaterial("All");
    setSelectedOccasion("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#F6EDE3] pb-24">
      {/* Hero Header Strip */}
      <div className="bg-[#EBD3BE]/40 border-b border-[#A9714B]/15 py-10 sm:py-14 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
            <span>The Complete Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A2416] font-light">
            All Fine Jewelry
          </h1>
          <p className="text-xs sm:text-sm text-[#3A2416]/75 max-w-md mx-auto mt-2 font-light">
            Individually inspected, stamped 925, and sealed with proprietary anti-tarnish bronze luster.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Horizontal Pill Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#A9714B]/15 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 font-medium ${
                selectedCategory === cat
                  ? "bg-[#3A2416] text-[#F6EDE3] shadow-md"
                  : "bg-white/60 hover:bg-white text-[#3A2416] border border-[#A9714B]/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter bar & Sorting row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#A9714B]/20 text-xs font-semibold uppercase tracking-wider text-[#3A2416]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#A9714B]" />
            <span>Refine Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#A9714B]" />
            )}
          </button>

          <div className="text-xs text-[#3A2416]/70">
            Showing <strong className="text-[#3A2416]">{filteredProducts.length}</strong> of {PRODUCTS.length} creations
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-[#3A2416]/70 hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/80 border border-[#A9714B]/25 rounded-xl px-4 py-2 pr-9 text-xs text-[#3A2416] font-medium focus:outline-none focus:border-[#A9714B] cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#A9714B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#A9714B]/15 mb-6">
            <span className="text-[11px] text-[#7A4A2B] uppercase tracking-wider font-semibold mr-1">
              Active Filters:
            </span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBD3BE] text-xs text-[#3A2416]">
                Query: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery("")} aria-label="Remove search query">
                  <X className="w-3 h-3 text-[#7A4A2B]" />
                </button>
              </span>
            )}

            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBD3BE] text-xs text-[#3A2416]">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory("All")} aria-label="Remove category">
                  <X className="w-3 h-3 text-[#7A4A2B]" />
                </button>
              </span>
            )}

            {selectedPriceRangeIndex !== 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBD3BE] text-xs text-[#3A2416]">
                Price: {PRICE_RANGES[selectedPriceRangeIndex].label}
                <button onClick={() => setSelectedPriceRangeIndex(0)} aria-label="Remove price range">
                  <X className="w-3 h-3 text-[#7A4A2B]" />
                </button>
              </span>
            )}

            {selectedMaterial !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBD3BE] text-xs text-[#3A2416]">
                Material: {selectedMaterial}
                <button onClick={() => setSelectedMaterial("All")} aria-label="Remove material">
                  <X className="w-3 h-3 text-[#7A4A2B]" />
                </button>
              </span>
            )}

            {selectedOccasion !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBD3BE] text-xs text-[#3A2416]">
                Occasion: {selectedOccasion}
                <button onClick={() => setSelectedOccasion("All")} aria-label="Remove occasion">
                  <X className="w-3 h-3 text-[#7A4A2B]" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-[#A9714B] hover:text-[#7A4A2B] hover:underline font-medium inline-flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block space-y-6">
            {/* Price Range Filter */}
            <div className="bg-white/50 p-5 rounded-2xl border border-[#A9714B]/15">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#7A4A2B] mb-3">
                Price (INR)
              </h3>
              <div className="space-y-2">
                {PRICE_RANGES.map((range, index) => (
                  <label
                    key={range.label}
                    className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer hover:text-[#A9714B]"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRangeIndex === index}
                      onChange={() => setSelectedPriceRangeIndex(index)}
                      className="accent-[#A9714B] w-3.5 h-3.5"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="bg-white/50 p-5 rounded-2xl border border-[#A9714B]/15">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#7A4A2B] mb-3">
                Precious Material
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer hover:text-[#A9714B]">
                  <input
                    type="radio"
                    name="material"
                    checked={selectedMaterial === "All"}
                    onChange={() => setSelectedMaterial("All")}
                    className="accent-[#A9714B] w-3.5 h-3.5"
                  />
                  <span>All Materials</span>
                </label>
                {MATERIALS.map((mat) => (
                  <label
                    key={mat}
                    className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer hover:text-[#A9714B]"
                  >
                    <input
                      type="radio"
                      name="material"
                      checked={selectedMaterial === mat}
                      onChange={() => setSelectedMaterial(mat)}
                      className="accent-[#A9714B] w-3.5 h-3.5"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="bg-white/50 p-5 rounded-2xl border border-[#A9714B]/15">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#7A4A2B] mb-3">
                Occasion & Vibe
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer hover:text-[#A9714B]">
                  <input
                    type="radio"
                    name="occasion"
                    checked={selectedOccasion === "All"}
                    onChange={() => setSelectedOccasion("All")}
                    className="accent-[#A9714B] w-3.5 h-3.5"
                  />
                  <span>All Occasions</span>
                </label>
                {OCCASIONS.map((occ) => (
                  <label
                    key={occ}
                    className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer hover:text-[#A9714B]"
                  >
                    <input
                      type="radio"
                      name="occasion"
                      checked={selectedOccasion === occ}
                      onChange={() => setSelectedOccasion(occ)}
                      className="accent-[#A9714B] w-3.5 h-3.5"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Slide Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#3A2416]/50 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#F6EDE3] z-50 shadow-2xl flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#A9714B]/20">
                <h3 className="font-serif text-lg text-[#3A2416] uppercase tracking-wider">
                  Filter Catalog
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-[#3A2416]/70 hover:text-[#3A2416]"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-6 flex-1">
                {/* Price */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#7A4A2B] mb-3">
                    Price (INR)
                  </h4>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((range, index) => (
                      <label
                        key={range.label}
                        className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="mobilePriceRange"
                          checked={selectedPriceRangeIndex === index}
                          onChange={() => setSelectedPriceRangeIndex(index)}
                          className="accent-[#A9714B] w-4 h-4"
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Material */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#7A4A2B] mb-3">
                    Precious Material
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer">
                      <input
                        type="radio"
                        name="mobileMaterial"
                        checked={selectedMaterial === "All"}
                        onChange={() => setSelectedMaterial("All")}
                        className="accent-[#A9714B] w-4 h-4"
                      />
                      <span>All Materials</span>
                    </label>
                    {MATERIALS.map((mat) => (
                      <label
                        key={mat}
                        className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="mobileMaterial"
                          checked={selectedMaterial === mat}
                          onChange={() => setSelectedMaterial(mat)}
                          className="accent-[#A9714B] w-4 h-4"
                        />
                        <span>{mat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#7A4A2B] mb-3">
                    Occasion
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer">
                      <input
                        type="radio"
                        name="mobileOccasion"
                        checked={selectedOccasion === "All"}
                        onChange={() => setSelectedOccasion("All")}
                        className="accent-[#A9714B] w-4 h-4"
                      />
                      <span>All Occasions</span>
                    </label>
                    {OCCASIONS.map((occ) => (
                      <label
                        key={occ}
                        className="flex items-center gap-2.5 text-xs text-[#3A2416] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="mobileOccasion"
                          checked={selectedOccasion === occ}
                          onChange={() => setSelectedOccasion(occ)}
                          className="accent-[#A9714B] w-4 h-4"
                        />
                        <span>{occ}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Apply Button */}
              <div className="pt-4 border-t border-[#A9714B]/20 flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 btn-outline-luxury py-2.5 rounded-xl text-xs uppercase font-medium"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 btn-luxury py-2.5 rounded-xl text-xs uppercase font-medium"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6EDE3] flex items-center justify-center">
          <div className="text-center font-serif text-lg text-[#3A2416] animate-pulse">
            Loading Her Beauty Wrap Atelier...
          </div>
        </div>
      }
    >
      <ShopInner />
    </Suspense>
  );
}
