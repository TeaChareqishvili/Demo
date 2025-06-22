import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://osoitjpcztrjxhpopsud.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zb2l0anBjenRyanhocG9wc3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MDc5NDYsImV4cCI6MjA2NjE4Mzk0Nn0.TnHHWFmwWMJnB2ggrg3nGl_0agg26-d5LU8EK0idxSM";

export const supabase = createClient(supabaseUrl, supabaseKey);
