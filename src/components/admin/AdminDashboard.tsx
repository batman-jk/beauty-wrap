"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  ExternalLink,
  LogOut,
  Sparkles,
  Edit3,
  Trash2,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { formatINR } from "@/data/products";
import { useToastStore } from "@/store/useToastStore";
import {
  getAllProductsAdmin,
  toggleProductStock,
  toggleProductPublish,
  deleteProduct,
} from "@/lib/supabase/services";
import AdminProductModal from "./AdminProductModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface AdminDashboardProps {
  userEmail?: string;
  onLogout: () => void;
}

type FilterTab = "all" | "live" | "draft" | "soldOut";

export default function AdminDashboard({ userEmail, onLogout }: AdminDashboardProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Delete confirmation state
  const [productToDelete, setProductToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { addToast } = useToastStore();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProductsAdmin();
      setProducts(data);
    } catch (err: unknown) {
      console.error(err);
      addToast({
        title: "Connection Notice",
        description: "Could not load products from Supabase. Ensure supabase/admin_setup.sql has been run.",
        type: "info",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab filter
      if (activeTab === "live" && (p.is_published === false || p.in_stock === false)) return false;
      if (activeTab === "draft" && p.is_published !== false) return false;
      if (activeTab === "soldOut" && p.in_stock !== false) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.material?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, activeTab, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = products.length;
    const live = products.filter((p) => p.is_published !== false && p.in_stock !== false).length;
    const draft = products.filter((p) => p.is_published === false).length;
    const soldOut = products.filter((p) => p.in_stock === false).length;
    return { total, live, draft, soldOut };
  }, [products]);

  // Quick Action: Toggle In Stock
  const handleQuickStockToggle = async (product: any) => {
    const nextState = !product.in_stock;
    // Optimistic update
    setProducts((prev) =>
      prev.map((item) => (item.id === product.id ? { ...item, in_stock: nextState } : item))
    );

    try {
      await toggleProductStock(product.id, nextState);
      addToast({
        title: nextState ? "Marked as In Stock" : "Marked as Sold Out",
        description: `${product.name} is now ${nextState ? "available" : "sold out"} on storefront.`,
        type: "success",
      });
    } catch (err) {
      // Rollback on error
      setProducts((prev) =>
        prev.map((item) => (item.id === product.id ? { ...item, in_stock: product.in_stock } : item))
      );
      addToast({
        title: "Update Failed",
        description: "Could not update stock status in database.",
        type: "error",
      });
    }
  };

  // Quick Action: Toggle Publish / Draft
  const handleQuickPublishToggle = async (product: any) => {
    const nextState = !product.is_published;
    setProducts((prev) =>
      prev.map((item) => (item.id === product.id ? { ...item, is_published: nextState } : item))
    );

    try {
      await toggleProductPublish(product.id, nextState);
      addToast({
        title: nextState ? "Published Live" : "Moved to Drafts",
        description: `${product.name} is ${nextState ? "now visible on site" : "hidden from customers"}.`,
        type: "success",
      });
    } catch (err) {
      setProducts((prev) =>
        prev.map((item) => (item.id === product.id ? { ...item, is_published: product.is_published } : item))
      );
      addToast({
        title: "Update Failed",
        description: "Could not update publish status.",
        type: "error",
      });
    }
  };

  // Delete Action
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      await deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      addToast({
        title: "Product Deleted",
        description: `"${productToDelete.name}" was removed from the atelier.`,
        type: "success",
      });
      setProductToDelete(null);
      if (isModalOpen) setIsModalOpen(false);
    } catch (err) {
      addToast({
        title: "Delete Failed",
        description: "Could not delete product.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EDE3] pb-24">
      {/* Top Mobile-First Header */}
      <header className="sticky top-0 z-30 bg-[#F6EDE3]/95 backdrop-blur-md border-b border-[#A9714B]/20 px-4 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#EBD3BE] border border-[#A9714B]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#A9714B]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9714B] font-semibold block leading-tight">
                Her Beauty Wrap
              </span>
              <h1 className="font-serif text-lg sm:text-xl text-[#3A2416] font-light leading-tight">
                Atelier Admin
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Store Link */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl border border-[#A9714B]/25 bg-white/80 hover:bg-white text-xs text-[#7A4A2B] font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="py-2 px-3 rounded-xl bg-white/80 hover:bg-white text-xs text-rose-700 border border-rose-200/80 font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              title={`Logged in as ${userEmail || "Admin"}`}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 space-y-5">
        {/* Big Tap-Friendly "+ Add Product" Button */}
        <div>
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="w-full btn-luxury py-4 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.99] transition-all min-h-[52px]"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Add New Jewelry Piece</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div
            onClick={() => setActiveTab("all")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#3A2416] text-[#F6EDE3] border-[#3A2416] shadow-sm"
                : "bg-white/70 border-[#A9714B]/20 text-[#3A2416] hover:bg-white"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider block opacity-75">All Pieces</span>
            <span className="font-serif text-2xl font-light">{stats.total}</span>
          </div>

          <div
            onClick={() => setActiveTab("live")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "live"
                ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                : "bg-white/70 border-[#A9714B]/20 text-[#3A2416] hover:bg-white"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider block opacity-75">Live on Store</span>
            <span className="font-serif text-2xl font-light">{stats.live}</span>
          </div>

          <div
            onClick={() => setActiveTab("draft")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "draft"
                ? "bg-amber-800 text-white border-amber-800 shadow-sm"
                : "bg-white/70 border-[#A9714B]/20 text-[#3A2416] hover:bg-white"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider block opacity-75">Drafts (Hidden)</span>
            <span className="font-serif text-2xl font-light">{stats.draft}</span>
          </div>

          <div
            onClick={() => setActiveTab("soldOut")}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "soldOut"
                ? "bg-stone-800 text-white border-stone-800 shadow-sm"
                : "bg-white/70 border-[#A9714B]/20 text-[#3A2416] hover:bg-white"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider block opacity-75">Sold Out</span>
            <span className="font-serif text-2xl font-light">{stats.soldOut}</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A9714B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category, or metal..."
              className="w-full bg-white/90 border border-[#A9714B]/25 rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#3A2416] placeholder-[#3A2416]/40 focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
            />
          </div>

          <button
            onClick={loadProducts}
            disabled={loading}
            className="py-3 px-4 rounded-xl border border-[#A9714B]/30 bg-white/80 hover:bg-white text-xs text-[#7A4A2B] font-semibold flex items-center justify-center gap-1.5 min-h-[44px]"
            title="Refresh database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Product Cards List (Mobile-Optimized) */}
        {loading && products.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#A9714B] border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-[#3A2416]/70">Loading atelier creations...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-14 text-center bg-white/60 rounded-3xl border border-[#A9714B]/20 p-6 space-y-3">
            <Sparkles className="w-8 h-8 text-[#A9714B] mx-auto" />
            <h3 className="font-serif text-xl text-[#3A2416]">No creations match your filter</h3>
            <p className="text-xs text-[#3A2416]/70 max-w-sm mx-auto">
              Try switching your filter tabs or tap below to create a new product.
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
                setIsModalOpen(true);
              }}
              className="btn-luxury px-5 py-2.5 rounded-full text-xs uppercase font-medium"
            >
              Add First Piece
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredProducts.map((p) => {
              const mainImage = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;
              const photoCount = Array.isArray(p.images) ? p.images.length : 0;
              const isLive = p.is_published !== false;
              const isInStock = p.in_stock !== false;

              return (
                <div
                  key={p.id}
                  className="bg-white/85 rounded-2xl border border-[#A9714B]/20 p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3"
                >
                  {/* Top info row */}
                  <div className="flex gap-3.5">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#EBD3BE]/40 shrink-0 border border-[#A9714B]/15">
                      {mainImage ? (
                        <Image
                          src={mainImage}
                          alt={p.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#A9714B]/50">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}

                      {/* Photo counter */}
                      {photoCount > 1 && (
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                          {photoCount}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        {/* Status Badges */}
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          {isLive ? (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full">
                              ● Live
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full">
                              ○ Draft
                            </span>
                          )}

                          {isInStock ? (
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] uppercase font-medium px-2 py-0.5 rounded-full border border-emerald-200">
                              In Stock
                            </span>
                          ) : (
                            <span className="bg-rose-100 text-rose-800 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full">
                              Sold Out
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-base font-medium text-[#3A2416] truncate">
                          {p.name}
                        </h3>
                        <p className="text-[11px] text-[#A9714B] font-medium">
                          {p.category} • {p.material || "Gold Vermeil"}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-serif text-base font-semibold text-[#7A4A2B]">
                          {formatINR(p.discount_price ? Number(p.discount_price) : Number(p.price))}
                        </span>
                        {p.discount_price && Number(p.discount_price) < Number(p.price) && (
                          <span className="text-[11px] text-[#3A2416]/40 line-through">
                            {formatINR(Number(p.price))}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Quick-Action Buttons */}
                  <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-[#A9714B]/10">
                    {/* Quick Stock Toggle */}
                    <button
                      type="button"
                      onClick={() => handleQuickStockToggle(p)}
                      className={`py-2 px-1 rounded-xl text-[11px] font-semibold border text-center transition-colors min-h-[40px] flex items-center justify-center ${
                        isInStock
                          ? "bg-white border-[#A9714B]/25 text-[#7A4A2B] hover:bg-stone-50"
                          : "bg-emerald-700 text-white border-emerald-700"
                      }`}
                      title={isInStock ? "Click to mark Sold Out" : "Click to mark In Stock"}
                    >
                      {isInStock ? "Set Sold Out" : "Set In Stock"}
                    </button>

                    {/* Quick Live/Draft Toggle */}
                    <button
                      type="button"
                      onClick={() => handleQuickPublishToggle(p)}
                      className={`py-2 px-1 rounded-xl text-[11px] font-semibold border text-center transition-colors min-h-[40px] flex items-center justify-center ${
                        isLive
                          ? "bg-white border-[#A9714B]/25 text-[#3A2416]/75 hover:bg-stone-50"
                          : "bg-[#A9714B] text-white border-[#A9714B]"
                      }`}
                      title={isLive ? "Click to unpublish" : "Click to publish"}
                    >
                      {isLive ? "Make Draft" : "Go Live"}
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(p);
                        setIsModalOpen(true);
                      }}
                      className="py-2 px-1 rounded-xl text-[11px] font-semibold bg-white border border-[#A9714B]/25 text-[#7A4A2B] hover:bg-[#F6EDE3] flex items-center justify-center gap-1 min-h-[40px]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => setProductToDelete(p)}
                      className="py-2 px-1 rounded-xl text-[11px] font-semibold bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 flex items-center justify-center gap-1 min-h-[40px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <AdminProductModal
        isOpen={isModalOpen}
        productToEdit={editingProduct}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSaved={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          loadProducts();
          addToast({
            title: "Changes Saved",
            description: "Product is updated and live immediately.",
            type: "success",
          });
        }}
        onDeleteRequest={(prod) => {
          setProductToDelete(prod);
        }}
      />

      {/* Delete Confirmation Popup */}
      <DeleteConfirmModal
        isOpen={Boolean(productToDelete)}
        productName={productToDelete?.name || ""}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
}
