import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Database } from "./types"; // ✅ Make sure types are generated via supabase CLI

const SUPABASE_URL = "https://wbjzqmtwwzujbbxqvryi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndianpxbXR3d3p1amJieHF2cnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NDI4MjcsImV4cCI6MjA1OTQxODgyN30.s2WG8dSsBKZVyzwzwqyvnO_wO07DaShMjG7j6jUeECo";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: AsyncStorage, // ✅ RN-compatible session storage
      persistSession: true, // ✅ Auto-persist across app restarts
      autoRefreshToken: true, // ✅ Keeps session fresh automatically
      detectSessionInUrl: false, // ✅ RN-safe (no browser URL detection)
    },
  }
);
