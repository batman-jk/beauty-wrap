"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/data/products";
import { AnimatePresence, motion } from "framer-motion";

const FREE_SHIPPING_THRESHOLD = 1999;

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
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
  const finalTotal = subtotal - discountAmount;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyPromoCode(couponInput);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) {
      setCouponInput("");
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-[#3A2416]/50 backdrop-blur-xs z-50"
          />

          {/* Slide-in panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-[#F6EDE3] z-50 shadow-2xl flex flex-col border-l border-[#A9714B]/20"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#A9714B]/20 flex items-center justify-between bg-[#F6EDE3]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#A9714B]" />
                <h2 className="font-serif text-xl tracking-wide uppercase text-[#3A2416]">
                  Your Indulgence Bag
                </h2>
                <span className="text-xs bg-[#EBD3BE] text-[#7A4A2B] px-2 py-0.5 rounded-full font-mono font-medium">
                  {items.length}
                </span>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-1.5 text-[#3A2416]/70 hover:text-[#3A2416] rounded-full hover:bg-[#EBD3BE]/60 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-[#EBD3BE]/40 px-5 py-3 border-b border-[#A9714B]/15">
              <div className="flex items-center justify-between text-xs text-[#3A2416] mb-1.5 font-medium">
                {amountToFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#A9714B]">{formatINR(amountToFreeShipping)}</strong> more for free insured shipping
                  </span>
                ) : (
                  <span className="text-[#7A4A2B] flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
                    Complimentary Express Shipping unlocked!
                  </span>
                )}
                <span className="text-[10px] text-[#7A4A2B] font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#EBD3BE] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#D9A98A] to-[#A9714B] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#EBD3BE]/60 flex items-center justify-center mb-4 text-[#A9714B]">
                    <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#3A2416] mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-sm text-[#3A2416]/70 max-w-xs mb-6">
                    Discover handcrafted gold vermeil and baroque pearl pieces curated for your daily glow.
                  </p>
                  <button
                    onClick={closeDrawer}
                    className="btn-luxury px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium"
                  >
                    <Link href="/shop" onClick={closeDrawer}>
                      Explore The Collection
                    </Link>
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 p-3 bg-white/70 rounded-xl border border-[#A9714B]/15 shadow-xs transition-colors"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#EBD3BE]/30">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeDrawer}
                            className="font-serif text-sm font-medium text-[#3A2416] hover:text-[#A9714B] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedSize)}
                            className="text-[#3A2416]/40 hover:text-red-600 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedSize && (
                          <p className="text-[11px] text-[#7A4A2B] mt-0.5">
                            Size: {item.selectedSize}
                          </p>
                        )}
                        <p className="text-[11px] text-[#3A2416]/60 truncate">
                          {item.product.material}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#A9714B]/10">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#A9714B]/30 rounded-md bg-[#F6EDE3]/60 px-1 py-0.5">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedSize
                              )
                            }
                            className="p-1 text-[#3A2416]/70 hover:text-[#3A2416]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs px-2 font-medium text-[#3A2416]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedSize
                              )
                            }
                            className="p-1 text-[#3A2416]/70 hover:text-[#3A2416]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-medium text-sm text-[#3A2416]">
                            {formatINR(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#A9714B]/20 bg-[#F6EDE3] space-y-3">
                {/* Coupon Code Accordion */}
                <div>
                  {promoCode ? (
                    <div className="flex items-center justify-between bg-[#EBD3BE]/50 p-2.5 rounded-lg text-xs">
                      <span className="text-[#7A4A2B] font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
                        Promo <strong>{promoCode}</strong> ({discountRate * 100}% off)
                      </span>
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
                        placeholder="Coupon code (e.g. HERLUXE)"
                        className="flex-1 bg-white/80 border border-[#A9714B]/30 rounded-lg px-3 py-1.5 text-xs text-[#3A2416] placeholder-[#3A2416]/40 focus:outline-none focus:border-[#A9714B]"
                      />
                      <button
                        type="submit"
                        className="bg-[#A9714B] text-[#F6EDE3] px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#7A4A2B] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponMsg && (
                    <p
                      className={`text-[11px] mt-1 ${
                        couponMsg.error ? "text-red-600" : "text-emerald-700"
                      }`}
                    >
                      {couponMsg.text}
                    </p>
                  )}
                </div>

                {/* Subtotal Calculation */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#3A2416]/80">
                    <span>Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Luxury Savings</span>
                      <span>-{formatINR(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#3A2416]/80">
                    <span>Insured Shipping</span>
                    <span>
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="text-emerald-700 font-medium">Free</span>
                      ) : (
                        formatINR(150)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#3A2416] pt-2 border-t border-[#A9714B]/15">
                    <span>Estimated Total</span>
                    <span className="font-serif text-lg text-[#7A4A2B]">
                      {formatINR(finalTotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 150))}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="btn-outline-luxury py-2.5 rounded-xl text-center text-xs uppercase tracking-wider font-medium flex items-center justify-center"
                  >
                    View Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="btn-luxury py-2.5 rounded-xl text-center text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#3A2416]/60 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A66B]" />
                  <span>Complimentary velvet pouch & certificate included</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
