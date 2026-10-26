"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Sparkles } from "lucide-react";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);

  useEffect(() => {
    // Check if recovery link was clicked
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.includes("type=recovery") || hash.includes("access_token")) {
        setIsRecoveryMode(true);
      }
    }

    // 1. Check existing session
    const checkSession = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();
        setSession(currentSession);
      } catch (err) {
        console.warn("Auth check note:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // 2. Listen for auth changes (login, logout, token refresh, password recovery)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      if (event === "PASSWORD_RECOVERY") {
        setIsRecoveryMode(true);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6EDE3] flex flex-col items-center justify-center p-4 space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#EBD3BE] border border-[#A9714B]/30 flex items-center justify-center animate-pulse shadow-sm">
          <Sparkles className="w-6 h-6 text-[#A9714B]" />
        </div>
        <p className="font-serif text-lg text-[#3A2416] tracking-wide font-light">
          Entering Atelier Portal...
        </p>
      </div>
    );
  }

  // Not authenticated: Show Login & Password Recovery
  if (!session) {
    return (
      <AdminLogin
        onSuccess={() => {
          setIsRecoveryMode(false);
          // Refetch session
          supabase.auth.getSession().then(({ data }) => setSession(data.session));
        }}
        isRecoveryMode={isRecoveryMode}
      />
    );
  }

  // Authenticated: Show Mobile-First Admin Dashboard
  return (
    <AdminDashboard
      userEmail={session.user?.email}
      onLogout={handleLogout}
    />
  );
}
