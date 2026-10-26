"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  Camera,
  UploadCloud,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Sparkles,
  Check,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { CATEGORIES, MATERIALS } from "@/data/products";
import { compressImage, uploadProductImage } from "@/lib/image-compression";
import { createProduct, updateProduct, AdminProductInput } from "@/lib/supabase/services";

interface AdminProductModalProps {
  isOpen: boolean;
  productToEdit?: any | null;
  onClose: () => void;
  onSaved: () => void;
  onDeleteRequest?: (product: any) => void;
}

export default function AdminProductModal({
  isOpen,
  productToEdit,
  onClose,
  onSaved,
  onDeleteRequest,
}: AdminProductModalProps) {
  const isEditing = Boolean(productToEdit);

  // Form State
  const [name, setName] = useState(productToEdit?.name || "");
  const [price, setPrice] = useState(productToEdit?.price?.toString() || "");
  const [discountPrice, setDiscountPrice] = useState(
    productToEdit?.discount_price?.toString() || ""
  );
  const [category, setCategory] = useState(
    productToEdit?.category || "Necklaces"
  );
  const [material, setMaterial] = useState(
    productToEdit?.material || "18K Gold Vermeil"
  );
  const [description, setDescription] = useState(
    productToEdit?.description || ""
  );
  const [inStock, setInStock] = useState<boolean>(
    productToEdit?.in_stock !== false
  );
  const [isPublished, setIsPublished] = useState<boolean>(
    productToEdit ? productToEdit.is_published !== false : true
  );

  // Images state: array of image URLs (existing or newly uploaded)
  const [images, setImages] = useState<string[]>(productToEdit?.images || []);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Photo Selection & Compression
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImages(true);
    setErrorMessage("");

    try {
      const uploadedUrls: string[] = [];
      const fileList = Array.from(files);

      for (let i = 0; i < fileList.length; i++) {
        setUploadProgress(`Compressing & uploading photo ${i + 1} of ${fileList.length}...`);
        // 1. Compress image in browser (max 1200px, 80% WebP)
        const compressed = await compressImage(fileList[i]);
        // 2. Upload to Supabase Storage bucket 'product-images'
        const publicUrl = await uploadProductImage(compressed.file);
        uploadedUrls.push(publicUrl);
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Image upload failed";
      setErrorMessage(`Photo upload failed: ${msg}. Make sure storage bucket 'product-images' exists in Supabase.`);
    } finally {
      setIsUploadingImages(false);
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (cameraInputRef.current) cameraInputRef.current.value = "";
    }
  };

  // Reordering photos
  const moveImage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setImages(updated);
  };

  // Removing a photo
  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  // Save product
  const handleSave = async (saveAsPublished: boolean) => {
    if (!name.trim()) {
      setErrorMessage("Please enter a product name.");
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setErrorMessage("Please enter a valid price in INR.");
      return;
    }
    if (images.length === 0) {
      setErrorMessage("Please add at least one product photo.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    const payload: AdminProductInput = {
      name: name.trim(),
      description: description.trim() || `${name.trim()} handcrafted with ${material}.`,
      price: Number(price),
      discount_price: discountPrice && !isNaN(Number(discountPrice)) ? Number(discountPrice) : null,
      category,
      material,
      images,
      in_stock: inStock,
      is_published: saveAsPublished,
    };

    try {
      if (isEditing && productToEdit?.id) {
        await updateProduct(productToEdit.id, payload);
      } else {
        await createProduct(payload);
      }
      onSaved();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save product.";
      setErrorMessage(msg);
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-[#F6EDE3] border border-[#A9714B]/30 rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#A9714B]/20 bg-white/70 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9714B] font-semibold block">
              {isEditing ? "Modify Existing Piece" : "New Atelier Creation"}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#3A2416] font-normal truncate max-w-sm sm:max-w-md">
              {isEditing ? name || "Edit Product" : "Add New Jewelry Piece"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/90 border border-[#A9714B]/20 flex items-center justify-center text-[#3A2416] hover:bg-white shadow-xs transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs text-[#3A2416]">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Section 1: Photos */}
          <div className="bg-white/70 p-4 sm:p-5 rounded-2xl border border-[#A9714B]/20 space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#7A4A2B]">
                  Product Photos ({images.length})
                </label>
                <span className="text-[11px] text-[#3A2416]/60">
                  First photo is the main storefront cover. Tap arrows to reorder.
                </span>
              </div>
            </div>

            {/* Hidden File Inputs */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFilesSelected}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFilesSelected}
              className="hidden"
            />

            {/* Action Buttons for Mobile Photo Capture & Gallery */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled={isUploadingImages || isSaving}
                onClick={() => fileInputRef.current?.click()}
                className="py-3 px-3 rounded-xl border border-dashed border-[#A9714B]/50 bg-white/90 hover:bg-white text-[#7A4A2B] font-semibold text-xs flex items-center justify-center gap-2 transition-all min-h-[46px] shadow-xs active:scale-[0.98]"
              >
                <UploadCloud className="w-4 h-4 text-[#A9714B]" />
                <span>Select Photos</span>
              </button>

              <button
                type="button"
                disabled={isUploadingImages || isSaving}
                onClick={() => cameraInputRef.current?.click()}
                className="py-3 px-3 rounded-xl border border-dashed border-[#A9714B]/50 bg-white/90 hover:bg-white text-[#7A4A2B] font-semibold text-xs flex items-center justify-center gap-2 transition-all min-h-[46px] shadow-xs active:scale-[0.98]"
              >
                <Camera className="w-4 h-4 text-[#A9714B]" />
                <span>Camera Snap</span>
              </button>
            </div>

            {/* Upload Progress Indicator */}
            {isUploadingImages && (
              <div className="p-3 bg-[#EBD3BE]/50 rounded-xl border border-[#A9714B]/20 flex items-center gap-2.5 animate-pulse text-[#7A4A2B]">
                <div className="w-4 h-4 rounded-full border-2 border-[#A9714B] border-t-transparent animate-spin" />
                <span className="text-xs font-medium">{uploadProgress}</span>
              </div>
            )}

            {/* Image Previews & Reordering Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                {images.map((imgUrl, idx) => (
                  <div
                    key={`${imgUrl}-${idx}`}
                    className={`relative rounded-xl overflow-hidden border bg-white shadow-xs group ${
                      idx === 0
                        ? "border-[#A9714B] ring-2 ring-[#A9714B]/30"
                        : "border-[#A9714B]/20"
                    }`}
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={imgUrl}
                        alt={`Photo ${idx + 1}`}
                        fill
                        sizes="180px"
                        className="object-cover"
                      />
                    </div>

                    {/* Main Cover Tag */}
                    {idx === 0 && (
                      <span className="absolute top-1.5 left-1.5 bg-[#3A2416] text-[#EBD3BE] text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#C9A66B]" />
                        Cover
                      </span>
                    )}

                    {/* Controls Overlay */}
                    <div className="p-1.5 bg-white/95 border-t border-[#A9714B]/15 flex items-center justify-between">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveImage(idx, "left")}
                          className="w-7 h-7 rounded-lg bg-[#F6EDE3] flex items-center justify-center text-[#3A2416] disabled:opacity-30 hover:bg-[#EBD3BE]"
                          title="Move earlier"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === images.length - 1}
                          onClick={() => moveImage(idx, "right")}
                          className="w-7 h-7 rounded-lg bg-[#F6EDE3] flex items-center justify-center text-[#3A2416] disabled:opacity-30 hover:bg-[#EBD3BE]"
                          title="Move later"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center hover:bg-rose-100"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Core Details */}
          <div className="bg-white/70 p-4 sm:p-5 rounded-2xl border border-[#A9714B]/20 space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                Piece Title / Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aurelia Baroque Pearl Drops"
                className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                  Material
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
                >
                  {MATERIALS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pricing (INR) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                  Selling Price (₹ INR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-[#7A4A2B]">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    min={0}
                    step={1}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="2899"
                    className="w-full bg-white border border-[#A9714B]/30 rounded-xl pl-8 pr-3.5 py-2.5 text-xs sm:text-sm font-mono text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                  Discount / Strikethrough Price (₹ Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-[#7A4A2B]">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="e.g. 2499 (leaves higher regular price crossed out)"
                    className="w-full bg-white border border-[#A9714B]/30 rounded-xl pl-8 pr-3.5 py-2.5 text-xs sm:text-sm font-mono text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                Description & Styling Story
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the craftsmanship, metal finish, occasions, and styling pairing..."
                className="w-full bg-white border border-[#A9714B]/30 rounded-xl p-3 text-xs sm:text-sm text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner"
              />
            </div>
          </div>

          {/* Section 3: Availability & Visibility Switches */}
          <div className="bg-white/70 p-4 sm:p-5 rounded-2xl border border-[#A9714B]/20 space-y-4">
            {/* In Stock Switch */}
            <div className="flex items-center justify-between py-1">
              <div>
                <strong className="block text-xs font-semibold text-[#3A2416]">
                  Available In Stock
                </strong>
                <span className="text-[11px] text-[#3A2416]/60">
                  Turn off to display as &ldquo;Sold Out&rdquo; on the storefront.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInStock(!inStock)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  inStock ? "bg-emerald-600" : "bg-stone-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    inStock ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Published Switch */}
            <div className="flex items-center justify-between py-1 border-t border-[#A9714B]/15 pt-3">
              <div>
                <strong className="block text-xs font-semibold text-[#3A2416]">
                  Publish to Live Website
                </strong>
                <span className="text-[11px] text-[#3A2416]/60">
                  {isPublished
                    ? "Live: Visible to customers right now."
                    : "Draft: Hidden from customer storefront."}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isPublished ? "bg-[#A9714B]" : "bg-stone-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isPublished ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#A9714B]/20 bg-white/90 flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
          {/* Main Save & Publish */}
          <button
            type="button"
            disabled={isSaving || isUploadingImages}
            onClick={() => handleSave(true)}
            className="w-full sm:flex-1 btn-luxury py-3.5 px-5 rounded-xl text-xs uppercase tracking-widest font-semibold shadow-md flex items-center justify-center gap-2 min-h-[46px] disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : isEditing ? "Save & Keep Live" : "Save & Publish"}</span>
          </button>

          {/* Save as Draft */}
          <button
            type="button"
            disabled={isSaving || isUploadingImages}
            onClick={() => handleSave(false)}
            className="w-full sm:w-auto py-3.5 px-5 rounded-xl border border-[#A9714B]/30 bg-white text-[#7A4A2B] hover:bg-[#F6EDE3] text-xs uppercase tracking-wider font-semibold min-h-[46px] disabled:opacity-50"
          >
            Save as Draft
          </button>

          {/* Delete Button (if editing existing piece) */}
          {isEditing && onDeleteRequest && (
            <button
              type="button"
              disabled={isSaving || isUploadingImages}
              onClick={() => onDeleteRequest(productToEdit)}
              className="w-full sm:w-auto py-3.5 px-4 rounded-xl text-rose-700 hover:bg-rose-50 text-xs uppercase tracking-wider font-semibold min-h-[46px] border border-rose-200 flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
