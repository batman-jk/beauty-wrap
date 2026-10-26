import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS, Product } from "@/data/products";
import { getProductBySlug, getPublishedProducts } from "@/lib/supabase/services";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let product: Product | undefined | null = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    product = await getProductBySlug(slug);
  }

  if (!product) {
    return {
      title: "Creation Not Found | Her Beauty Wrap",
    };
  }

  return {
    title: `${product.name} | Her Beauty Wrap Atelier`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Her Beauty Wrap`,
      description: product.description,
      images: [
        {
          url: product.images[0] || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  let product: Product | undefined | null = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    product = await getProductBySlug(slug);
  }

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product!.id && (p.category === product!.category || p.isBestseller)
  ).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
