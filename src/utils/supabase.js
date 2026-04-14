import { createClient } from '@supabase/supabase-js'

REACT_APP_SUPABASE_URL="https://dvxtvdvmfrbhnktzfmxo.supabase.co"
REACT_APP_SUPABASE_PUBLISHABLE_KEY="sb_publishable_FfAqHQser1Soz5cmoD7ywA_CXidJlEE"
const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_PUBLISHABLE_KEY)

export default supabase
