import { createClient } from '@supabase/supabase-js';

// Add your Supabase URL and public anon key here
const supabaseUrl = 'https://cqnqflzrtnfhedvgmnfp.supabase.co';

// IMPORTANT: Replace 'YOUR_SUPABASE_ANON_KEY' with your actual public anon key from Supabase project settings.
// Find it in your Supabase project under Project Settings > API > Project API keys > anon (public)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbnFmbHpydG5maGVkdmdtbmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3ODA0MzAsImV4cCI6MjA3NTM1NjQzMH0.MNp83s6txEwoBRvkVGLlacWvQ54TaujLK2FYmerK7ys';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);