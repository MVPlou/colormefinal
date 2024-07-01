// src/app/test-supabase/page.tsx
import { supabase } from '@/utils/supabase'

export default async function TestSupabase() {
  const { data, error } = await supabase.from('coloring_pages').select('*').limit(4)

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Supabase Connection Test</h1>
      <p>Connection successful!</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}