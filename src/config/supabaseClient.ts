import { createClient } from '@supabase/supabase-js'
const supabaseUrl : string | undefined = "https://rckwuovuvxpzfjgzkhdq.supabase.co"
const supabaseKey : string | undefined = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJja3d1b3Z1dnhwemZqZ3praGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NTM2NzgsImV4cCI6MjAyNDIyOTY3OH0.CfJK2zFd2Kw_Lcx57AD1uf7QX502HOkz2vlngcCu7Pk"
const supabase = createClient(supabaseUrl!, supabaseKey!)

export default supabase