// src/utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ixwekkaygqfnxdviiwtc.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4d2Vra2F5Z3Fmbnhkdmlpd3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyMDI5NjksImV4cCI6MjAxMjc3ODk2OX0.HauASbJshDqNjxrsTHLg904NGVukWuS8vpIutHRcYB8'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)