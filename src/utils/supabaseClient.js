import { createClient } from '@supabase/supabase-js';

// Toggle between 'cloud' and 'local'
const SUPABASE_ENV = 'local';  // Change to 'cloud' for production

// Define Supabase credentials
const SUPABASE_CONFIG = {
  cloud: {
    url: 'https://cxldbnbwospxdixxbdvm.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4bGRibmJ3b3NweGRpeHhiZHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDQ1NDYsImV4cCI6MjA1NTk4MDU0Nn0.iKsPtvJbcVQARnu4SqSt50H8dnfmXhmrvhFMTtJm_zI'
  },
  local: {
    url: 'http://127.0.0.1:54321',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
  }
};

// Select the correct configuration
const SUPABASE_URL = SUPABASE_CONFIG[SUPABASE_ENV].url;
const SUPABASE_ANON_KEY = SUPABASE_CONFIG[SUPABASE_ENV].anonKey;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };


//Note 02/03/2024 - Local and Cloud connections are working. Push is not working.