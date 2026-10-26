import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#F6EDE3] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md w-full bg-white/70 p-8 sm:p-12 rounded-3xl border border-[#A9714B]/20 shadow-lg space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
          <span>Error 404</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light">
          This Piece Has Dissolved Into Sunlight
        </h1>

        <p className="text-xs sm:text-sm text-[#3A2416]/75 font-light leading-relaxed">
          The page or adornment you are searching for may have been archived into our private vault or does not exist.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            href="/shop"
            className="flex-1 btn-luxury py-3 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/"
            className="flex-1 btn-outline-luxury py-3 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
