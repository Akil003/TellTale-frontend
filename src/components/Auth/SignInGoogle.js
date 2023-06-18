export default async function SignInGoogle(supabase) {
        await supabase.auth.signInWithOAuth({
            provider: "google"
        })
  }