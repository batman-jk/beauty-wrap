"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatINR } from "@/data/products";
import confetti from "canvas-confetti";
import { recordOrder } from "@/lib/supabase";

export default function CheckoutPage() {
  const { items, getSubtotal, discountRate, promoCode, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "Priya",
    lastName: "Kapoor",
    email: "priya.kapoor@example.com",
    phone: "+91 98200 48210",
    address: "702, Sea Green Apartments, Worli Sea Face",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400018",
  });

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [upiId, setUpiId] = useState("priya@okhdfcbank");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4829");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = mounted ? getSubtotal() : 0;
  const discountAmount = subtotal * discountRate;
  const shippingFee = subtotal >= 1999 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedOrder = `HBW-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await recordOrder({
        orderNumber: generatedOrder,
        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
        customerEmail: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        paymentMethod,
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          imageUrl: item.product.images[0],
        })),
      });
    } catch (err) {
      console.warn("Order record notice:", err);
    }

    setOrderNumber(generatedOrder);
    setIsSubmitting(false);
    setOrderComplete(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#A9714B", "#C9A66B", "#D9A98A", "#EBD3BE"],
      });
    } catch (err) {
      console.error(err);
    }

    clearCart();
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F6EDE3] flex items-center justify-center">
        <div className="font-serif text-lg text-[#3A2416] animate-pulse">
          Preparing Secure Checkout...
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#F6EDE3] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full bg-white/85 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#A9714B]/25 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold block mb-1">
            Order Confirmed
          </span>
          <h1 className="font-serif text-3xl text-[#3A2416] mb-2">
            Thank You, {formData.firstName}
          </h1>
          <p className="text-xs text-[#3A2416]/70 mb-6 font-light">
            Your creations are being lovingly polished and nestled into our signature fawn-velvet keepsake box.
          </p>

          <div className="bg-[#F6EDE3] p-4 rounded-2xl text-left border border-[#A9714B]/15 space-y-2 mb-6 text-xs">
            <div className="flex justify-between border-b border-[#A9714B]/15 pb-2">
              <span className="text-[#3A2416]/70">Order Number</span>
              <span className="font-mono font-semibold text-[#7A4A2B]">{orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#A9714B]/15 pb-2">
              <span className="text-[#3A2416]/70">Delivery Address</span>
              <span className="text-right text-[#3A2416] font-medium max-w-[200px] truncate">
                {formData.address}, {formData.city}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#A9714B]/15 pb-2">
              <span className="text-[#3A2416]/70">Estimated Delivery</span>
              <span className="font-medium text-emerald-800">2-3 Business Days (BlueDart)</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-[#3A2416]/70">Payment</span>
              <span className="font-medium uppercase text-[#7A4A2B]">
                {paymentMethod === "upi"
                  ? "UPI Instant Confirmed"
                  : paymentMethod === "card"
                  ? "Card Paid"
                  : "Cash on Delivery"}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="flex-1 btn-luxury py-3 rounded-full text-xs uppercase tracking-widest font-semibold text-center shadow-md"
            >
              Continue Exploring
            </Link>
            <Link
              href="/"
              className="flex-1 btn-outline-luxury py-3 rounded-full text-xs uppercase tracking-widest font-semibold text-center"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#F6EDE3] flex items-center justify-center px-4 py-20 text-center">
        <div className="max-w-md">
          <h2 className="font-serif text-2xl text-[#3A2416] mb-3">
            Your bag is currently empty
          </h2>
          <p className="text-xs text-[#3A2416]/70 mb-6">
            Please add pieces to your bag before proceeding to checkout.
          </p>
          <Link href="/shop" className="btn-luxury px-6 py-2.5 rounded-full text-xs uppercase font-medium">
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6EDE3] py-10 sm:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold mb-2">
            <Lock className="w-3.5 h-3.5 text-[#C9A66B]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light">
            Luxury Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Shipping & Payment Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Shipping Details */}
            <div className="bg-white/80 p-6 sm:p-7 rounded-2xl border border-[#A9714B]/20 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#A9714B]/15 pb-3">
                <h2 className="font-serif text-xl text-[#3A2416] uppercase tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#A9714B] text-[#F6EDE3] text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <span>Insured Shipping Destination</span>
                </h2>
                <Truck className="w-5 h-5 text-[#A9714B]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                    Email Address (For Certificate & Tracking)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                    Mobile Phone (For BlueDart Courier SMS)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                  Street Address & Apartment
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method UI */}
            <div className="bg-white/80 p-6 sm:p-7 rounded-2xl border border-[#A9714B]/20 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#A9714B]/15 pb-3">
                <h2 className="font-serif text-xl text-[#3A2416] uppercase tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#A9714B] text-[#F6EDE3] text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span>Payment Selection</span>
                </h2>
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === "upi"
                      ? "border-[#A9714B] bg-[#EBD3BE]/40 text-[#7A4A2B] shadow-xs"
                      : "border-[#A9714B]/20 bg-white/60 text-[#3A2416] hover:bg-white"
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#A9714B]" />
                  <span className="text-xs font-semibold">UPI / QR</span>
                  <span className="text-[10px] text-[#3A2416]/60">Google Pay, PhonePe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === "card"
                      ? "border-[#A9714B] bg-[#EBD3BE]/40 text-[#7A4A2B] shadow-xs"
                      : "border-[#A9714B]/20 bg-white/60 text-[#3A2416] hover:bg-white"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#A9714B]" />
                  <span className="text-xs font-semibold">Cards</span>
                  <span className="text-[10px] text-[#3A2416]/60">Visa, Mastercard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === "cod"
                      ? "border-[#A9714B] bg-[#EBD3BE]/40 text-[#7A4A2B] shadow-xs"
                      : "border-[#A9714B]/20 bg-white/60 text-[#3A2416] hover:bg-white"
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#A9714B]" />
                  <span className="text-xs font-semibold">Cash On Delivery</span>
                  <span className="text-[10px] text-[#3A2416]/60">Pay at Doorstep</span>
                </button>
              </div>

              {/* Dynamic Payment Details UI */}
              <div className="p-4 bg-[#F6EDE3]/60 rounded-xl border border-[#A9714B]/15">
                {paymentMethod === "upi" && (
                  <div className="space-y-3">
                    <p className="text-xs text-[#3A2416]">
                      Enter your UPI VPA handle for instant one-click approval on your phone:
                    </p>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3 py-2 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                    />
                    <div className="flex items-center gap-2 text-[11px] text-[#7A4A2B]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
                      <span>Instant 1-step UPI intent will be opened upon order placement</span>
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-[#7A4A2B] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3 py-2 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-[#7A4A2B] mb-1">
                          Expiry MM/YY
                        </label>
                        <input
                          type="text"
                          defaultValue="08/29"
                          className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3 py-2 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-[#7A4A2B] mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          defaultValue="•••"
                          className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3 py-2 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="text-xs text-[#3A2416]/80 leading-relaxed space-y-1">
                    <p>
                      <strong>Cash on Delivery selected:</strong> Please have exact cash or UPI QR scan ready when BlueDart courier arrives.
                    </p>
                    <p className="text-[11px] text-[#7A4A2B]">
                      All jewelry parcels require OTP verification at the time of delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 p-6 rounded-2xl border border-[#A9714B]/20 shadow-sm space-y-4">
              <h2 className="font-serif text-xl text-[#3A2416] uppercase tracking-wide border-b border-[#A9714B]/15 pb-3">
                Order Review ({items.length})
              </h2>

              {/* Items preview */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-3 items-center py-1.5 border-b border-[#A9714B]/10 last:border-0"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#EBD3BE]/40 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-xs font-medium text-[#3A2416] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-[#7A4A2B]">
                        Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ""}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#3A2416]">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost calculations */}
              <div className="space-y-2 text-xs text-[#3A2416]/80 pt-3 border-t border-[#A9714B]/15">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({promoCode})</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span>{shippingFee === 0 ? "FREE" : formatINR(shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging & Insurance</span>
                  <span className="text-emerald-700 font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#3A2416] pt-2 border-t border-[#A9714B]/15">
                  <span>Total Payable</span>
                  <span className="font-serif text-2xl text-[#7A4A2B]">
                    {formatINR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-luxury py-4 px-6 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xl disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Complete Order • {formatINR(grandTotal)}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#3A2416]/60 text-center leading-tight">
                By placing this order, you agree to Her Beauty Wrap&apos;s authentic jewelry guarantees and terms of service.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
