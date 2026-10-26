import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award, ShieldCheck, Heart, Feather, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Atelier Story | Her Beauty Wrap",
  description:
    "Learn about Her Beauty Wrap's philosophy: skin-toned warm bronze jewelry, ethically cultivated baroque pearls, and artisan 18K gold vermeil craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6EDE3] pb-24">
      {/* Hero Header */}
      <div className="relative py-16 sm:py-24 bg-[#EBD3BE]/40 border-b border-[#A9714B]/15 overflow-hidden text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
            <span>The Atelier Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#3A2416] font-light leading-tight">
            Jewelry that feels like second skin.
          </h1>
          <p className="text-sm sm:text-base text-[#3A2416]/75 max-w-xl mx-auto font-light leading-relaxed">
            Born from an obsession with the warm, bronze radiance of golden hour. Designed to celebrate femininity without pretension or weight.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Story Section 1: The Origin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A9714B]">
              Our Inception
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light leading-tight">
              Quiet Luxury, Reimagined for Everyday Moments
            </h2>
            <p className="text-sm text-[#3A2416]/80 leading-relaxed font-light">
              Traditional fine jewelry in India has long been preserved in bank lockers, reserved solely for grand weddings and festival evenings. Meanwhile, fast-fashion accessories chip, tarnish green, and feel cold and synthetic against the skin.
            </p>
            <p className="text-sm text-[#3A2416]/80 leading-relaxed font-light">
              <strong>Her Beauty Wrap</strong> bridges this divide. We engineer jewelry that carries the heavy presence and luminous finish of royal heirlooms, yet is light enough to accompany your morning coffee, corporate meetings, and beach holidays.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-2 border-[#A9714B]/20">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
                alt="Jewelry artisan hand finishing gold chain"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div id="craftsmanship" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold block mb-1">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light">
              The Three Pillars of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 bg-white/70 rounded-3xl border border-[#A9714B]/15 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBD3BE]/60 text-[#A9714B] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#3A2416]">
                18K Gold Vermeil Standard
              </h3>
              <p className="text-xs text-[#3A2416]/75 leading-relaxed font-light">
                Not simple flash plating. We deposit 2.5 microns of pure 18-karat gold over solid, nickel-free 925 sterling silver—achieving 5x greater thickness than typical fashion jewelry.
              </p>
            </div>

            <div className="p-7 bg-white/70 rounded-3xl border border-[#A9714B]/15 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBD3BE]/60 text-[#A9714B] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#C9A66B]" />
              </div>
              <h3 className="font-serif text-xl text-[#3A2416]">
                Natural Baroque Pearls
              </h3>
              <p className="text-xs text-[#3A2416]/75 leading-relaxed font-light">
                Each cultured pearl is hand-selected for its organic irregularities, thick nacre depth, and ethereal iridescence. No two pearls are ever alike, making your piece uniquely yours.
              </p>
            </div>

            <div className="p-7 bg-white/70 rounded-3xl border border-[#A9714B]/15 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBD3BE]/60 text-[#A9714B] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-serif text-xl text-[#3A2416]">
                Anti-Tarnish Barrier
              </h3>
              <p className="text-xs text-[#3A2416]/75 leading-relaxed font-light">
                Finished with a micro-thin, hypoallergenic clear ceramic barrier that repels Indian tropical humidity, sweat, perfume droplets, and pool water.
              </p>
            </div>
          </div>
        </div>

        {/* Packaging Banner */}
        <div className="p-8 sm:p-12 bg-[#3A2416] text-[#F6EDE3] rounded-3xl border border-[#A9714B]/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A66B] font-semibold block">
              The Presentation Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F6EDE3] font-light">
              Every Unboxing is a Ritual
            </h2>
            <p className="text-xs sm:text-sm text-[#EBD3BE]/80 leading-relaxed font-light">
              We believe opening your package should feel like unlocking a treasure chest. Every order arrives cushioned in our signature fawn-velvet keepsake box, accompanied by a wax-stamped authenticity certificate and microfiber polishing cloth.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="btn-luxury px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 shadow-lg"
              >
                <span>Experience The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
