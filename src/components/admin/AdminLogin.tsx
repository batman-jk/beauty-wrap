"use client";

import React, { useState } from "react";
import { Lock, Mail, KeyRound, Sparkles, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface AdminLoginProps {
  onSuccess: () => void;
  isRecoveryMode?: boolean;
}

export default function AdminLogin({ onSuccess, isRecoveryMode = false }: AdminLoginProps) {
  const [mode, setMode] = useState<"login" | "forgot" | "reset">(
    isRecoveryMode ? "reset" : "login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      if (data?.session) {
        onSuccess();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication error.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your registered admin email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const redirectUrl = typeof window !== "undefined" ? `${window.location.origin}/admin` : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: redirectUrl,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage("Password reset instructions have been sent to your email.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error sending reset email.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage("Password successfully updated! Signing in...");
        setTimeout(() => {
          onSuccess();
        }, 1200);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update password.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EDE3] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white/85 backdrop-blur-md rounded-3xl border border-[#A9714B]/25 p-7 sm:p-9 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
            <span>Her Beauty Wrap</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#3A2416] font-light">
            Atelier Management Portal
          </h1>
          <p className="text-xs text-[#3A2416]/70 font-light">
            {mode === "login"
              ? "Secure sign in for shop administrator"
              : mode === "forgot"
              ? "Reset your administrator password"
              : "Set your new administrator password"}
          </p>
        </div>

        {/* Feedback Notifications */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs leading-relaxed animate-fade-in">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs leading-relaxed flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* 1. Login Form */}
        {mode === "login" && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A9714B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@herbeautywrap.com"
                  className="w-full bg-white border border-[#A9714B]/30 rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs uppercase font-semibold text-[#7A4A2B]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                    setMode("forgot");
                  }}
                  className="text-[11px] text-[#A9714B] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A9714B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-[#A9714B]/30 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3A2416]/50 hover:text-[#3A2416] p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-luxury py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold shadow-md flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-75 transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
            </button>
          </form>
        )}

        {/* 2. Forgot Password Form */}
        {mode === "forgot" && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1.5">
                Enter Your Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A9714B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@herbeautywrap.com"
                  className="w-full bg-white border border-[#A9714B]/30 rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-luxury py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold shadow-md flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-75"
            >
              <span>{loading ? "Sending link..." : "Send Reset Link"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMessage("");
                setSuccessMessage("");
                setMode("login");
              }}
              className="w-full text-xs text-[#7A4A2B] hover:text-[#3A2416] flex items-center justify-center gap-1.5 py-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </form>
        )}

        {/* 3. Reset Password Form (Recovery) */}
        {mode === "reset" && (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1.5">
                Enter New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A9714B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-white border border-[#A9714B]/30 rounded-xl pl-10 pr-3.5 py-3 text-xs sm:text-sm text-[#3A2416] focus:outline-none focus:border-[#A9714B] shadow-inner min-h-[44px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-luxury py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold shadow-md flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-75"
            >
              <span>{loading ? "Updating..." : "Save New Password"}</span>
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-[#A9714B]/15">
          <p className="text-[11px] text-[#3A2416]/50">
            Protected private route • Only authorized atelier personnel
          </p>
        </div>
      </div>
    </div>
  );
}
