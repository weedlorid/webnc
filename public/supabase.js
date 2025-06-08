import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iggijiewrzojtklmuonx.supabase.co'       // ← thay bằng url của bạn
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZ2lqaWV3cnpvanRrbG11b254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MTM1NDYsImV4cCI6MjA2MzE4OTU0Nn0.P-agMoHmZYqOUXR-e-wp81vgzQluGaoa5GrI4YggvtI'                          // ← thay bằng key của bạn

export const supabase = createClient(supabaseUrl, supabaseKey)