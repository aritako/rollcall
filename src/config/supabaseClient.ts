import { createClient } from '@supabase/supabase-js'
const supabaseUrl : string | undefined = process.env.REACT_APP_SUPABASE_URL
const supabaseKey : string | undefined = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl!, supabaseKey!)

export default supabase