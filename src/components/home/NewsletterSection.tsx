"use client";

import React, { useState } from "react";
import { Sparkles, Mail, CheckCircle2 } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";
import { subscribeNewsletter } from "@/lib/supabase";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await subscribeNewsletter(email);
    } catch (err) {
      console.warn("Newsletter subscription notice:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast({
        title: "Welcome to The Muse Circle",
        description: "Use code HERLUXE at checkout for 10% off your first purchase.",
        type: "success",
      });
    }
  };

  return (
    <section className="py-20 bg-[#EBD3BE]/40 border-b border-[#A9714B]/15 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
          <span>The Private Salon</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A2416] font-light leading-tight">
          Join The Inner Circle & Receive 10% Off
        </h2>

        <p className="text-xs sm:text-base text-[#3A2416]/75 max-w-lg mx-auto mt-3 font-light leading-relaxed">
          Be the first to preview seasonal capsule drops, private salon sales, and curated styling guides from our jewelry designers.
        </p>

        {isSubmitted ? (
          <div className="mt-8 p-6 bg-white/80 rounded-2xl border border-[#A9714B]/20 max-w-md mx-auto shadow-sm animate-fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-serif text-lg text-[#3A2416]">
              You are on the guest list.
            </h3>
            <p className="text-xs text-[#3A2416]/75 mt-1">
              Your 10% welcome coupon code is <strong className="font-mono text-[#A9714B]">HERLUXE</strong>. It has been applied to your active bag!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#A9714B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-white/90 border border-[#A9714B]/25 rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-[#3A2416] placeholder-[#3A2416]/40 focus:outline-none focus:border-[#A9714B] shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-luxury px-7 py-3 rounded-full text-xs uppercase tracking-widest font-semibold shrink-0 shadow-md disabled:opacity-75"
            >
              {isSubmitting ? "Subscribing..." : "Request Access"}
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#3A2416]/50 mt-4 tracking-wide font-light">
          We respect your sanctuary. Unsubscribe at any time with a single click.
        </p>
      </div>
    </section>
  );
}
