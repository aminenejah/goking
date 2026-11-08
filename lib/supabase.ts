import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser-safe client — uses the anon key.
 * Suitable for client components and public reads.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

