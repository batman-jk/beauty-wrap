"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/data/products";

interface WishlistStore {
  items: Product[];
  toggleWishlist: (product: Product) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        const current = get().items;
        const exists = current.some((p) => p.id === product.id);

        if (exists) {
          set({ items: current.filter((p) => p.id !== product.id) });
          return false;
        } else {
          set({ items: [...current, product] });
          return true;
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((p) => p.id !== productId) });
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "her_beauty_wrap_wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
