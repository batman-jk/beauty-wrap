"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Product,
  formatINR,
} from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useToastStore } from "@/store/useToastStore";
import {
  Heart,
  ShoppingBag,
  Star,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronDown,
  Share2,
  PackageCheck,
  Plus,
  Minus,
} from "lucide-react";

import { useLiveProducts } from "@/context/ProductContext";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product: initialProduct, relatedProducts }: Props) {
  const { products } = useLiveProducts();
  const product =
    products.find((p) => p.slug === initialProduct.slug || p.id === initialProduct.id) ||
    initialProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string>("details");
  const [isZoomed, setIsZoomed] = useState(false);

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addToast } = useToastStore();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    addToast({
      title: "Placed In Your Indulgence Bag",
      description: `${quantity}x ${product.name} (${selectedSize})`,
      type: "success",
    });
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    addToast({
      title: added ? "Saved to Wishlist" : "Removed from Wishlist",
      description: `${product.name} ${added ? "is saved to your curations." : "was removed."}`,
      type: "info",
    });
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setDeliveryResult("Please enter a valid 6-digit Indian PIN code");
      return;
    }
    setDeliveryResult(`Express Delivery available to ${pincode} by BlueDart Insured (2-3 Business Days)`);
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        title: "Link Copied",
        description: "Product link copied to clipboard.",
        type: "info",
      });
    }
  };

  const discountAmount = product.originalPrice - product.price;

  return (
    <div className="min-h-screen bg-[#F6EDE3] pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#A9714B]/15">
        <nav className="flex items-center gap-2 text-xs text-[#3A2416]/60">
          <Link href="/" className="hover:text-[#A9714B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#A9714B] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#A9714B] transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#3A2416] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left: Gallery Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div
              className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden bg-[#EBD3BE]/30 border border-[#A9714B]/20 shadow-md group cursor-crosshair"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover object-center transition-transform duration-500 ${
                  isZoomed ? "scale-150" : "group-hover:scale-105"
                }`}
              />

              {/* Floating badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.discountPercent && (
                  <span className="bg-[#A9714B] text-[#F6EDE3] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.discountPercent}% OFF
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-[#3A2416] text-[#EBD3BE] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#C9A66B]" />
                    Atelier Bestseller
                  </span>
                )}
              </div>

              {/* Share & Wishlist quick buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#3A2416] hover:text-[#A9714B] hover:bg-white shadow-sm transition-all"
                  aria-label="Share creation"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWishlist();
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                    isFavorited
                      ? "bg-[#A9714B] text-white"
                      : "bg-white/80 backdrop-blur-md text-[#3A2416] hover:text-[#A9714B] hover:bg-white"
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorited ? "fill-white stroke-white" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Tap to zoom hint */}
              <div className="absolute bottom-4 right-4 bg-[#3A2416]/75 backdrop-blur-xs text-[#F6EDE3] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full pointer-events-none">
                {isZoomed ? "Click to reset" : "Click to magnify"}
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-[#A9714B] ring-2 ring-[#A9714B]/30 shadow-md scale-102"
                        : "border-[#A9714B]/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Purchase Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#A9714B] font-semibold uppercase tracking-widest mb-1.5">
                <span>{product.category}</span>
                <div className="flex items-center gap-1.5 text-[#3A2416]">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-[#C9A66B] stroke-[#C9A66B]"
                            : "stroke-[#C9A66B]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs font-semibold">
                    {product.rating}
                  </span>
                  <span className="text-[11px] text-[#3A2416]/50">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="flex items-start justify-between gap-3">
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#3A2416] font-light leading-tight">
                  {product.name}
                </h1>
                {product.inStock === false && (
                  <span className="shrink-0 bg-[#3A2416] text-[#F6EDE3] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm border border-[#C9A66B]/30">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#3A2416]/75 mt-2 font-light leading-relaxed">
                {product.subtitle}
              </p>

              {/* Material purity pill */}
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBD3BE]/60 border border-[#A9714B]/20 text-xs text-[#7A4A2B] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
                <span>{product.purity}</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-[#A9714B]/20 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold text-[#7A4A2B]">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-[#3A2416]/40 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {discountAmount > 0 && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                    Save {formatINR(discountAmount)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#3A2416]/60">
                Inclusive of all taxes. Free insured delivery & gift wrapping included.
              </p>
            </div>

            {/* Variant / Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-wider font-semibold text-[#7A4A2B]">
                    Select Specification / Size:
                  </span>
                  <span className="text-[#3A2416]/60 font-mono text-[11px]">
                    {selectedSize}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        selectedSize === sz
                          ? "bg-[#3A2416] text-[#F6EDE3] shadow-sm border border-[#3A2416]"
                          : "bg-white/80 text-[#3A2416] hover:bg-white border border-[#A9714B]/20"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#A9714B]/30 rounded-xl bg-white/80 px-2 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#3A2416]/70 hover:text-[#3A2416]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-sm px-4 font-semibold text-[#3A2416]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#3A2416]/70 hover:text-[#3A2416]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={product.inStock === false}
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
                    product.inStock === false
                      ? "bg-stone-700/80 text-stone-300 cursor-not-allowed"
                      : "btn-luxury hover:shadow-xl"
                  }`}
                >
                  {product.inStock === false ? (
                    <span>Currently Sold Out</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#C9A66B]" />
                      <span>Add To Indulgence Bag • {formatINR(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {product.inStock === false ? (
                  <button
                    type="button"
                    disabled
                    className="py-2.5 rounded-xl text-center text-xs uppercase tracking-wider font-semibold bg-stone-300/60 text-stone-500 cursor-not-allowed border border-stone-300"
                  >
                    Sold Out
                  </button>
                ) : (
                  <Link
                    href="/checkout"
                    onClick={() => addItem(product, selectedSize, quantity)}
                    className="btn-outline-luxury py-2.5 rounded-xl text-center text-xs uppercase tracking-wider font-semibold hover:bg-[#EBD3BE]/60"
                  >
                    Instant Buy Now
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className={`py-2.5 rounded-xl text-center text-xs uppercase tracking-wider font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                    isFavorited
                      ? "border-[#A9714B] bg-[#A9714B]/10 text-[#7A4A2B]"
                      : "border-[#A9714B]/30 bg-white/50 text-[#3A2416] hover:bg-white"
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isFavorited ? "fill-[#A9714B] stroke-[#A9714B]" : ""
                    }`}
                  />
                  <span>{isFavorited ? "Saved in Wishlist" : "Save to Wishlist"}</span>
                </button>
              </div>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="p-4 bg-white/50 rounded-2xl border border-[#A9714B]/15 space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7A4A2B] block">
                Estimate Delivery Timeline
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 400001)"
                  className="flex-1 bg-white border border-[#A9714B]/30 rounded-xl px-3 py-2 text-xs text-[#3A2416] placeholder-[#3A2416]/40 focus:outline-none focus:border-[#A9714B]"
                />
                <button
                  type="submit"
                  className="bg-[#3A2416] text-[#F6EDE3] px-4 py-2 rounded-xl text-xs uppercase font-medium hover:bg-[#A9714B] transition-colors"
                >
                  Check
                </button>
              </form>
              {deliveryResult && (
                <p className="text-xs text-emerald-800 font-medium flex items-center gap-1 pt-1">
                  <Truck className="w-3.5 h-3.5 shrink-0" />
                  <span>{deliveryResult}</span>
                </p>
              )}
            </div>

            {/* Accordions */}
            <div className="border-t border-[#A9714B]/20 pt-4 space-y-2">
              {/* Accordion 1: Details & Dimensions */}
              <div className="border border-[#A9714B]/15 rounded-xl bg-white/40 overflow-hidden">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "details" ? "" : "details")
                  }
                  className="w-full p-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#3A2416]"
                >
                  <span>Materials & Specifications</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A9714B] transition-transform ${
                      openAccordion === "details" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "details" && (
                  <div className="p-4 pt-0 text-xs text-[#3A2416]/80 space-y-2 border-t border-[#A9714B]/10">
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                      <div>
                        <strong className="text-[#7A4A2B]">Base Metal:</strong>{" "}
                        {product.purity}
                      </div>
                      <div>
                        <strong className="text-[#7A4A2B]">Plating:</strong>{" "}
                        {product.details.plating || "2.5 Micron 18K Gold"}
                      </div>
                      {product.details.dimensions && (
                        <div>
                          <strong className="text-[#7A4A2B]">Dimensions:</strong>{" "}
                          {product.details.dimensions}
                        </div>
                      )}
                      {product.details.weight && (
                        <div>
                          <strong className="text-[#7A4A2B]">Weight:</strong>{" "}
                          {product.details.weight}
                        </div>
                      )}
                      {product.details.closure && (
                        <div>
                          <strong className="text-[#7A4A2B]">Closure:</strong>{" "}
                          {product.details.closure}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Care & Guarantee */}
              <div className="border border-[#A9714B]/15 rounded-xl bg-white/40 overflow-hidden">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "care" ? "" : "care")
                  }
                  className="w-full p-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#3A2416]"
                >
                  <span>Lifetime Guarantee & Care Guide</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A9714B] transition-transform ${
                      openAccordion === "care" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "care" && (
                  <div className="p-4 pt-0 text-xs text-[#3A2416]/80 space-y-2 border-t border-[#A9714B]/10 leading-relaxed">
                    <p>
                      Each piece undergoes 3-layer anti-tarnish electro-coating. To ensure longevity:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-[#3A2416]/70">
                      <li>Store in your provided Her Beauty Wrap velvet pouch when resting.</li>
                      <li>Wipe gently with the microfiber polishing cloth provided after wear.</li>
                      <li>Avoid direct submersion in chlorine pools and scented body lotions.</li>
                      <li>Complimentary replating service provided within 12 months of purchase.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="border border-[#A9714B]/15 rounded-xl bg-white/40 overflow-hidden">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")
                  }
                  className="w-full p-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#3A2416]"
                >
                  <span>Insured Shipping & 15-Day Exchange</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A9714B] transition-transform ${
                      openAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <div className="p-4 pt-0 text-xs text-[#3A2416]/80 space-y-2 border-t border-[#A9714B]/10 leading-relaxed">
                    <p>
                      • <strong>Free Shipping:</strong> On all domestic orders over ₹1,999 across India.
                    </p>
                    <p>
                      • <strong>Dispatch:</strong> Same-day dispatch for orders confirmed before 1 PM IST.
                    </p>
                    <p>
                      • <strong>Hassle-Free Exchange:</strong> 15-day exchange policy with complimentary doorstep pickup.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#A9714B]/20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold block mb-1">
                  Harmonious Pairings
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#3A2416] font-light">
                  You May Also Adore
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-widest text-[#7A4A2B] hover:text-[#3A2416] font-semibold transition-colors"
              >
                View Full Atelier &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
