// ? CLIENTE DE SUPABASE
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.SUPABASE_PUBLIC_URL,
    process.env.SUPABASE_ANON_KEY
);