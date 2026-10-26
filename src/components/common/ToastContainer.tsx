"use client";

import React from "react";
import { useToastStore } from "@/store/useToastStore";
import { CheckCircle2, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#3A2416] text-[#F6EDE3] shadow-2xl border border-[#A9714B]/30"
          >
            {toast.type === "error" ? (
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">!</span>
            ) : toast.type === "info" ? (
              <Info className="w-5 h-5 text-[#C9A66B] shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#C9A66B] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium tracking-wide">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-[#EBD3BE]/80 mt-0.5">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#EBD3BE]/60 hover:text-[#F6EDE3] transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
