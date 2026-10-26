"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  productName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  productName,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#F6EDE3] border border-[#A9714B]/30 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#A9714B]/15">
          <div className="flex items-center gap-2 text-rose-800">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="font-serif text-lg font-medium">Delete Product</span>
          </div>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-[#3A2416] hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#3A2416]/80 leading-relaxed font-light">
          Are you sure you want to permanently delete{" "}
          <strong className="text-[#3A2416] font-semibold font-serif text-sm block my-1">
            &ldquo;{productName}&rdquo;
          </strong>
          This piece will be removed immediately from both the atelier dashboard and the live website.
        </p>

        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold border border-[#A9714B]/30 bg-white/80 text-[#3A2416] hover:bg-white transition-all disabled:opacity-50 min-h-[44px]"
          >
            Keep It
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold bg-rose-700 hover:bg-rose-800 text-white shadow-md transition-all disabled:opacity-50 min-h-[44px] flex items-center justify-center gap-2"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
