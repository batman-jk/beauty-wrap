"use client";

import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";

const REVIEWS = [
  {
    author: "Ananya Deshmukh",
    city: "Mumbai",
    rating: 5,
    piece: "Celestial Solstice Layered Pendant",
    title: "The bronze glow is unmatched",
    content:
      "I was skeptical about vermeil online, but when I unwrapped the velvet box, I gasped. The warm gold tone matches Indian skin so seamlessly. I have worn it every single day for 4 months without a hint of tarnish.",
    date: "Verified Collector • 2 weeks ago",
  },
  {
    author: "Kavya Singhania",
    city: "New Delhi",
    rating: 5,
    piece: "Aurelia Baroque Pearl Drops",
    title: "Weightless on sensitive ears",
    content:
      "I normally can’t wear earrings for more than two hours without earlobe fatigue. These baroque pearls feel completely weightless and the organic shape makes them look like bespoke heirlooms.",
    date: "Verified Collector • 1 month ago",
  },
  {
    author: "Rohini Nair",
    city: "Bengaluru",
    rating: 5,
    piece: "Noor Royal Kundan Polki Choker Set",
    title: "My bridal reception centerpiece",
    content:
      "The Noor Polki set was the crowning glory of my reception look. The subtle antique polish and meenakari reverse show the kind of craftsmanship you usually only see in royal families.",
    date: "Verified Collector • 3 weeks ago",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-[#F6EDE3] border-b border-[#A9714B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold block mb-2">
            The Collector&apos;s Voice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light">
            Cherished by Women of Taste
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#3A2416]/70">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C9A66B] stroke-[#C9A66B]" />
              ))}
            </div>
            <span className="font-medium text-[#3A2416]">4.9 / 5.0</span>
            <span>across 1,200+ verified patrons</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.author}
              className="bg-white/70 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-[#A9714B]/15 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A66B] stroke-[#C9A66B]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#A9714B]/30" />
                </div>

                <h3 className="font-serif text-lg font-medium text-[#3A2416] mb-2">
                  &ldquo;{review.title}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-[#3A2416]/75 leading-relaxed font-light mb-6">
                  {review.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[#A9714B]/15">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-[#3A2416] flex items-center gap-1">
                      {review.author}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </h4>
                    <p className="text-[11px] text-[#A9714B] font-medium">{review.piece}</p>
                  </div>
                  <span className="text-[10px] text-[#3A2416]/50 font-mono">{review.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
