import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BrandStoryStrip from "@/components/home/BrandStoryStrip";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <CategoryHighlights />
      <FeaturedCollections />
      <BrandStoryStrip />
      <Testimonials />
      <InstagramGallery />
      <NewsletterSection />
    </div>
  );
}
