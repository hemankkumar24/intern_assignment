import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_PUBLIC_URL // replace with your own
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY // replace with your own

export const supabase = createClient(supabaseUrl, supabaseAnonKey)