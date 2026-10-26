"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";
import { InstagramIcon } from "@/components/common/InstagramIcon";

const GALLERY_POSTS = [
  {
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    handle: "@ria.taneja",
    tag: "Solstice Layered Collar",
    likes: "1.4k",
  },
  {
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    handle: "@meera_k",
    tag: "Aurelia Baroque Drops",
    likes: "892",
  },
  {
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    handle: "@tara.sutaria.style",
    tag: "Solaris Dome Band",
    likes: "2.1k",
  },
  {
    image: "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=600&auto=format&fit=crop",
    handle: "@the.muse.edit",
    tag: "Elysian Twisted Cuff",
    likes: "654",
  },
  {
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop",
    handle: "@shreya.atelier",
    tag: "Zephyr Pearl Anklet",
    likes: "1.1k",
  },
  {
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    handle: "@herbeautywrap",
    tag: "Velvet Keepsake Box",
    likes: "3.5k",
  },
];

export default function InstagramGallery() {
  return (
    <section className="py-16 sm:py-20 bg-[#F6EDE3] border-b border-[#A9714B]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold mb-2">
              <InstagramIcon className="w-4 h-4 text-[#A9714B]" />
              <span>#SpottedInHerBeautyWrap</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2416] font-light">
              As Seen On Our Modern Muses
            </h2>
          </div>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-[#7A4A2B] hover:text-[#3A2416] font-semibold inline-flex items-center gap-1.5 mt-3 sm:mt-0 transition-colors"
          >
            <span>Follow @herbeautywrap</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {GALLERY_POSTS.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#EBD3BE]/40 border border-[#A9714B]/15 cursor-pointer shadow-xs"
            >
              <Image
                src={post.image}
                alt={post.tag}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#3A2416]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end">
                  <div className="flex items-center gap-1 text-[11px] text-[#C9A66B]">
                    <Heart className="w-3.5 h-3.5 fill-[#C9A66B]" />
                    <span>{post.likes}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-[#EBD3BE] uppercase tracking-wider font-light">
                    {post.handle}
                  </p>
                  <p className="text-xs font-serif font-medium line-clamp-1">{post.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
