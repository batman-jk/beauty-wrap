"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Shield, HeartHandshake, PhoneCall, Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/common/InstagramIcon";

export default function Footer() {
  return (
    <footer className="bg-[#3A2416] text-[#F6EDE3] pt-16 pb-24 lg:pb-16 border-t border-[#7A4A2B]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3 Pillar Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-[#7A4A2B]/40">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#7A4A2B]/50 flex items-center justify-center text-[#C9A66B] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#F6EDE3]">18K Gold Vermeil & Pearls</h4>
              <p className="text-xs text-[#EBD3BE]/75 mt-0.5 leading-relaxed font-light">
                Thick 2.5 micron pure gold over solid 925 silver with genuine freshwater baroque pearls.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#7A4A2B]/50 flex items-center justify-center text-[#C9A66B] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#F6EDE3]">Insured Pan-India Transit</h4>
              <p className="text-xs text-[#EBD3BE]/75 mt-0.5 leading-relaxed font-light">
                Complimentary tamper-proof delivery with insurance on all orders above ₹1,999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#7A4A2B]/50 flex items-center justify-center text-[#C9A66B] shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#F6EDE3]">The Keepsake Unboxing</h4>
              <p className="text-xs text-[#EBD3BE]/75 mt-0.5 leading-relaxed font-light">
                Every order arrives encased in our signature fawn-velvet presentation box with wax seal.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.2em] uppercase text-[#F6EDE3] block">
                Her Beauty Wrap
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A66B] block -mt-1 font-sans">
                Fine Bronze & Pearl Atelier
              </span>
            </Link>
            <p className="text-xs text-[#EBD3BE]/75 max-w-sm leading-relaxed font-light">
              Founded on the belief that everyday jewelry should feel like liquid sunshine on your skin. Designed in Mumbai, hand-finished by master generational artisans across Jaipur and Hyderabad.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#7A4A2B]/50 hover:bg-[#A9714B] flex items-center justify-center text-[#EBD3BE] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <span className="text-xs text-[#EBD3BE]/60 tracking-wider">@herbeautywrap</span>
            </div>
          </div>

          {/* Column 1: Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A66B] mb-4">
              Silhouettes
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EBD3BE]/80 font-light">
              <li>
                <Link href="/shop?category=Necklaces" className="hover:text-[#F6EDE3] transition-colors">
                  Necklaces & Collars
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Earrings" className="hover:text-[#F6EDE3] transition-colors">
                  Baroque Drops & Studs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Rings" className="hover:text-[#F6EDE3] transition-colors">
                  Dome & Stacking Rings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Bracelets" className="hover:text-[#F6EDE3] transition-colors">
                  Tennis Wraps & Cuffs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Bridal+Sets" className="hover:text-[#F6EDE3] transition-colors">
                  Heritage Bridal Chokers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Gifting" className="hover:text-[#F6EDE3] transition-colors">
                  Velvet Keepsake Boxes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: The Atelier */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A66B] mb-4">
              The Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EBD3BE]/80 font-light">
              <li>
                <Link href="/about" className="hover:text-[#F6EDE3] transition-colors">
                  Our Story & Manifesto
                </Link>
              </li>
              <li>
                <Link href="/about#craftsmanship" className="hover:text-[#F6EDE3] transition-colors">
                  18K Vermeil Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/about#sustainability" className="hover:text-[#F6EDE3] transition-colors">
                  Baroque Pearl Ethics
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#F6EDE3] transition-colors">
                  Your Saved Curations
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#F6EDE3] transition-colors">
                  Indulgence Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A66B] mb-4">
              Concierge Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EBD3BE]/80 font-light">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C9A66B]" />
                <a href="mailto:concierge@herbeautywrap.com" className="hover:text-[#F6EDE3]">
                  concierge@herbeautywrap.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#C9A66B]" />
                <span>+91 98200 48210 (10 AM - 7 PM)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A66B] shrink-0 mt-0.5" />
                <span>Kala Ghoda Atelier, Fort, Mumbai 400001</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="text-[#C9A66B] hover:text-[#F6EDE3] font-medium underline underline-offset-4"
                >
                  Book Private Styling Session &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 border-t border-[#7A4A2B]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#EBD3BE]/60">
          <p className="text-center md:text-left font-light">
            © 2026 Her Beauty Wrap Atelier Private Limited. All rights reserved. Prices inclusive of all GST.
          </p>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#C9A66B]">
              Secure Gateways:
            </span>
            <span className="px-2 py-0.5 rounded bg-[#7A4A2B]/40 text-[#F6EDE3] text-[10px] font-mono">
              UPI Instant
            </span>
            <span className="px-2 py-0.5 rounded bg-[#7A4A2B]/40 text-[#F6EDE3] text-[10px] font-mono">
              Visa / Mastercard
            </span>
            <span className="px-2 py-0.5 rounded bg-[#7A4A2B]/40 text-[#F6EDE3] text-[10px] font-mono">
              RuPay
            </span>
            <span className="px-2 py-0.5 rounded bg-[#7A4A2B]/40 text-[#F6EDE3] text-[10px] font-mono">
              COD Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
