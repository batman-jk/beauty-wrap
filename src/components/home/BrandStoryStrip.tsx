"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Feather, ShieldCheck, HeartHandshake } from "lucide-react";

export default function BrandStoryStrip() {
  return (
    <section className="py-20 bg-[#EBD3BE]/30 border-b border-[#A9714B]/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Images collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-[#A9714B]/20">
                  <Image
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
                    alt="Handcrafting gold chain"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-white/80 rounded-2xl border border-[#A9714B]/15 shadow-xs">
                  <div className="flex items-center gap-2 text-[#7A4A2B] mb-1">
                    <Feather className="w-4 h-4 text-[#A9714B]" />
                    <span className="text-[11px] uppercase tracking-widest font-semibold">
                      Weightless Fit
                    </span>
                  </div>
                  <p className="text-xs text-[#3A2416]/75">
                    Hollow-cast techniques ensure all-day comfort without tugging or strain.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 bg-[#3A2416] text-[#F6EDE3] rounded-2xl shadow-lg border border-[#A9714B]/30">
                  <div className="flex items-center gap-2 text-[#C9A66B] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[11px] uppercase tracking-widest font-semibold">
                      Skin-Tested Vermeil
                    </span>
                  </div>
                  <p className="text-xs text-[#EBD3BE]/80">
                    2.5 Micron 18 Karat gold over genuine 925 sterling silver base.
                  </p>
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-[#A9714B]/20">
                  <Image
                    src="https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop"
                    alt="Baroque pearl artistry"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>The Atelier Manifesto</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A2416] font-light leading-tight">
              Jewelry that mirrors the warm, bronze cadence of your skin.
            </h2>

            <p className="text-sm sm:text-base text-[#3A2416]/80 leading-relaxed font-light">
              We founded <strong>Her Beauty Wrap</strong> out of a yearning for pieces that felt neither disposable nor uncomfortably precious. Every piece in our collection is an ode to understated intimacy—crafted to be lived in, layered intuitively, and treasured across seasons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/60 border border-[#A9714B]/15">
                <span className="text-xs font-semibold text-[#7A4A2B] uppercase tracking-wider block mb-1">
                  Ethically Sourced Pearls
                </span>
                <p className="text-xs text-[#3A2416]/70">
                  Cultivated in natural freshwater beds with zero artificial coatings or dyes.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/60 border border-[#A9714B]/15">
                <span className="text-xs font-semibold text-[#7A4A2B] uppercase tracking-wider block mb-1">
                  Anti-Tarnish Seal
                </span>
                <p className="text-xs text-[#3A2416]/70">
                  Micro-electronic shielding repels sweat, humidity, and perfume contact.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#A9714B] hover:text-[#7A4A2B] transition-colors group"
              >
                <span>Read The Full Brand Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
