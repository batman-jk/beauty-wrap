"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (product: Product, selectedSize?: string, quantity?: number) => void;
  removeItem: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
  promoCode: string | null;
  discountRate: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      promoCode: null,
      discountRate: 0,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (product, selectedSize, quantity = 1) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.product.id === product.id && item.selectedSize === selectedSize
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += quantity;
          set({ items: updated, isDrawerOpen: true });
        } else {
          set({
            items: [
              ...currentItems,
              {
                product,
                quantity,
                selectedSize: selectedSize || (product.sizes ? product.sizes[0] : undefined),
              },
            ],
            isDrawerOpen: true,
          });
        }
      },

      removeItem: (productId, selectedSize) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
          ),
        });
      },

      updateQuantity: (productId, quantity, selectedSize) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedSize);
          return;
        }

        set({
          items: get().items.map((item) => {
            if (item.product.id === productId && item.selectedSize === selectedSize) {
              return { ...item, quantity };
            }
            return item;
          }),
        });
      },

      clearCart: () => set({ items: [], promoCode: null, discountRate: 0 }),

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      applyPromoCode: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === "HERLUXE" || cleanCode === "WELCOME10") {
          set({ promoCode: cleanCode, discountRate: 0.1 });
          return { success: true, message: "10% luxury discount applied!" };
        } else if (cleanCode === "GOLD20") {
          set({ promoCode: cleanCode, discountRate: 0.2 });
          return { success: true, message: "20% festive discount applied!" };
        }
        return { success: false, message: "Invalid promo code. Try 'HERLUXE'" };
      },

      removePromoCode: () => set({ promoCode: null, discountRate: 0 }),
    }),
    {
      name: "her_beauty_wrap_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        discountRate: state.discountRate,
      }),
    }
  )
);
