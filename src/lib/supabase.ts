import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Debug: Log environment variables (remove in production)
console.log('%c🔧 Supabase Config:', 'color: cyan; font-weight: bold');
console.log('- URL:', supabaseUrl);
console.log('- Key exists:', !!supabaseKey);
console.log('- Key length:', supabaseKey?.length || 0);
console.log('- Is default placeholder?', supabaseKey === 'your-anon-key');

if (supabaseKey === 'your-anon-key') {
  console.error('%c❌ ERROR: Using placeholder Supabase key!', 'color: red; font-weight: bold');
  console.error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env or Vercell');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
