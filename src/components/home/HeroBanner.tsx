"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Gem, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#F6EDE3] pt-6 pb-16 sm:py-20 lg:py-24 border-b border-[#A9714B]/15">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#EBD3BE]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#D9A98A]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBD3BE]/80 border border-[#A9714B]/20 text-[#7A4A2B] text-xs font-medium uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>Autumn Winter 2026 Atelier</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#3A2416] font-light leading-[1.15] tracking-tight">
              Quiet Luxury for the{" "}
              <span className="italic font-normal text-[#A9714B] block sm:inline">
                Modern Muse.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#3A2416]/75 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Sculpted in 18K gold vermeil, natural baroque pearls, and warm bronze tones. Designed to sit like liquid light against your skin, effortlessly transitioning from morning light to candlelit evenings.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto btn-luxury px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop?category=Bridal+Sets"
                className="w-full sm:w-auto btn-outline-luxury px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center hover:bg-[#EBD3BE]/50"
              >
                Discover Bridal & Festive
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-8 border-t border-[#A9714B]/15 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-normal text-[#7A4A2B]">18K</span>
                <span className="text-[11px] text-[#3A2416]/70 uppercase tracking-wider">
                  Gold Vermeil
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-x border-[#A9714B]/20 px-2">
                <span className="font-serif text-2xl font-normal text-[#7A4A2B]">100%</span>
                <span className="text-[11px] text-[#3A2416]/70 uppercase tracking-wider">
                  Cultured Pearls
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-2xl font-normal text-[#7A4A2B]">Pan-India</span>
                <span className="text-[11px] text-[#3A2416]/70 uppercase tracking-wider">
                  Free Delivery
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Imagery with Floating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-[#EBD3BE]/80">
              <Image
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
                alt="Her Beauty Wrap Fine Jewelry on Skin"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2416]/40 via-transparent to-transparent" />
            </div>

            {/* Floating Luxury Badge */}
            <div className="absolute -bottom-4 -left-4 sm:left-2 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#A9714B]/20 max-w-[210px] hidden sm:block">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#C9A66B]" />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#7A4A2B]">
                  Artisan Handcrafted
                </span>
              </div>
              <p className="text-xs text-[#3A2416] leading-tight">
                Hypoallergenic, water-safe coatings engineered for lifetime elegance.
              </p>
            </div>

            {/* Secondary Floating Capsule */}
            <div className="absolute -top-3 -right-3 sm:right-2 bg-[#3A2416] text-[#F6EDE3] p-3 rounded-2xl shadow-xl border border-[#A9714B]/40 max-w-[170px]">
              <span className="text-[10px] text-[#C9A66B] uppercase tracking-wider block font-medium">
                Velvet Keepsake
              </span>
              <p className="text-xs text-[#EBD3BE] leading-tight mt-0.5">
                Complimentary luxury gift box with every order
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
