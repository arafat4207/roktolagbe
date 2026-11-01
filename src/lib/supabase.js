import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL অথবা Key পাওয়া যায়নি! .env ফাইল চেক করুন।');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);