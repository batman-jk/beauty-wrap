"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/data/products";

const FREE_SHIPPING_THRESHOLD = 1999;

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    promoCode,
    discountRate,
    applyPromoCode,
    removePromoCode,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = mounted ? getSubtotal() : 0;
  const discountAmount = subtotal * discountRate;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal - discountAmount + shippingFee;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyPromoCode(couponInput);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) setCouponInput("");
  };

  if (!mounted) {
    return (
      <div className="min-h-[70vh] bg-[#F6EDE3] flex items-center justify-center">
        <div className="font-serif text-lg text-[#3A2416] animate-pulse">
          Opening Your Bag...
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#F6EDE3] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center p-8 sm:p-10 bg-white/70 rounded-3xl border border-[#A9714B]/20 shadow-lg">
          <div className="w-20 h-20 rounded-full bg-[#EBD3BE]/60 text-[#A9714B] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 stroke-[1.2]" />
          </div>
          <h1 className="font-serif text-3xl text-[#3A2416] mb-3">
            Your Indulgence Bag is Empty
          </h1>
          <p className="text-sm text-[#3A2416]/70 mb-8 font-light leading-relaxed">
            Discover handcrafted jewelry infused with warm skin-toned bronze and genuine freshwater pearls.
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
        <div className="border-b border-[#A9714B]/20 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold block mb-1">
              Review Curations
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light">
              Your Indulgence Bag ({items.length} {items.length === 1 ? "Piece" : "Pieces"})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#3A2416]/60 hover:text-red-700 font-medium transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Bag
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-[#EBD3BE]/60 p-4 sm:p-5 rounded-2xl border border-[#A9714B]/20 mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm text-[#3A2416] font-medium mb-2">
            {amountToFreeShipping > 0 ? (
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#A9714B]" />
                Add <strong className="text-[#7A4A2B]">{formatINR(amountToFreeShipping)}</strong> more to receive free insured shipping
              </span>
            ) : (
              <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C9A66B]" />
                Complimentary Express Shipping Unlocked!
              </span>
            )}
            <span className="font-mono text-xs text-[#7A4A2B]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-white/70 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#D9A98A] to-[#A9714B] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Items Table / List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="p-4 sm:p-5 bg-white/70 rounded-2xl border border-[#A9714B]/15 shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="flex gap-4 items-center flex-1 min-w-0">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#EBD3BE]/30 shrink-0 border border-[#A9714B]/10">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#A9714B] font-semibold">
                      {item.product.category}
                    </span>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="block font-serif text-base sm:text-lg font-medium text-[#3A2416] hover:text-[#A9714B] transition-colors truncate"
                    >
                      {item.product.name}
                    </Link>
                    {item.selectedSize && (
                      <p className="text-xs text-[#7A4A2B] mt-0.5">
                        Size: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-xs text-[#3A2416]/60 truncate mt-0.5">
                      {item.product.purity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#A9714B]/10">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-[#A9714B]/30 rounded-xl bg-white px-2 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)
                      }
                      className="p-1 text-[#3A2416]/70 hover:text-[#3A2416]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs font-semibold px-3 text-[#3A2416]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)
                      }
                      className="p-1 text-[#3A2416]/70 hover:text-[#3A2416]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[90px]">
                    <div className="font-serif text-base sm:text-lg font-semibold text-[#7A4A2B]">
                      {formatINR(item.product.price * item.quantity)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-[10px] text-[#3A2416]/50 font-mono">
                        {formatINR(item.product.price)} each
                      </div>
                    )}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id, item.selectedSize)}
                    className="p-1.5 text-[#3A2416]/40 hover:text-red-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-between items-center text-xs text-[#3A2416]/70">
              <Link
                href="/shop"
                className="hover:text-[#A9714B] font-medium inline-flex items-center gap-1.5"
              >
                &larr; Continue Exploring Creations
              </Link>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/80 p-6 rounded-2xl border border-[#A9714B]/20 shadow-sm space-y-5">
              <h2 className="font-serif text-xl text-[#3A2416] tracking-wide uppercase border-b border-[#A9714B]/15 pb-4">
                Order Summary
              </h2>

              {/* Promo input */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-[#EBD3BE]/60 p-3 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-[#7A4A2B] font-medium">
                      <Sparkles className="w-4 h-4 text-[#C9A66B]" />
                      <span>Code <strong>{promoCode}</strong> applied ({discountRate * 100}% off)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-red-600 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon (e.g. HERLUXE)"
                      className="flex-1 bg-white border border-[#A9714B]/30 rounded-xl px-3 py-2 text-xs text-[#3A2416] placeholder-[#3A2416]/40 focus:outline-none focus:border-[#A9714B]"
                    />
                    <button
                      type="submit"
                      className="bg-[#A9714B] text-[#F6EDE3] px-4 py-2 rounded-xl text-xs uppercase font-medium hover:bg-[#7A4A2B] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg && (
                  <p
                    className={`text-xs mt-1.5 ${
                      couponMsg.error ? "text-red-600" : "text-emerald-700"
                    }`}
                  >
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Calculations */}
              <div className="space-y-2 text-xs text-[#3A2416]/80 pt-2 border-t border-[#A9714B]/10">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-medium text-[#3A2416]">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Luxury Promotional Discount</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-medium">FREE</span>
                    ) : (
                      formatINR(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Hallmark Duties</span>
                  <span className="text-emerald-700 font-medium">Included</span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#3A2416] pt-3 border-t border-[#A9714B]/15">
                  <span>Estimated Total</span>
                  <span className="font-serif text-2xl text-[#7A4A2B]">
                    {formatINR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full btn-luxury py-3.5 px-6 rounded-xl text-center text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed To Luxury Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Assurance points */}
              <div className="space-y-2 pt-2 border-t border-[#A9714B]/15 text-[11px] text-[#3A2416]/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A66B] shrink-0" />
                  <span>Complimentary keepsake fawn-velvet box included</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#C9A66B] shrink-0" />
                  <span>15-day exchange & lifetime anti-tarnish warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
