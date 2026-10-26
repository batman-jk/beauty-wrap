import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

let supabaseBrowserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (supabaseBrowserClient) {
    return supabaseBrowserClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing in environment variables.");
  }

  supabaseBrowserClient = createBrowserClient<Database>(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-key"
  );

  return supabaseBrowserClient;
}

export const supabase = createClient();
