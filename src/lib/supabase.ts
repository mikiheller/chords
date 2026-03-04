import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Song = {
  id: string;
  instrument: "guitar" | "ukulele";
  name: string;
  capo: number | null;
  chords: string;
  lyrics: string | null;
  created_at: string;
};
