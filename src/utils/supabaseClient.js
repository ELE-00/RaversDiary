// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xthuvmcrfvtozaoszyty.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aHV2bWNyZnZ0b3phb3N6eXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5ODIyMzgsImV4cCI6MjA0MTU1ODIzOH0.ND0ywh3JT6I4G6V0dORxMmzBHt5k5oviAo4pdoBKX58';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);



