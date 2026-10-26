"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Product, PRODUCTS } from "@/data/products";
import { getPublishedProducts } from "@/lib/supabase/services";
import { supabase } from "@/lib/supabase/client";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType>({
  products: PRODUCTS,
  loading: false,
  refreshProducts: async () => {},
});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loading, setLoading] = useState(false);

  const fetchLiveProducts = useCallback(async () => {
    try {
      setLoading(true);
      const liveList = await getPublishedProducts();
      if (liveList && liveList.length > 0) {
        setProducts(liveList);
      }
    } catch (err) {
      console.warn("Product sync fallback:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveProducts();

    // Listen to real-time database changes on the products table
    const channel = supabase
      .channel("products_live_updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        () => {
          fetchLiveProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLiveProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        refreshProducts: fetchLiveProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useLiveProducts() {
  return useContext(ProductContext);
}
