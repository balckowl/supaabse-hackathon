"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const signInWithGithub = async () => {
  const supabase = await createClient()

  const { data: { url }, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
    }
  })

  if (url) {
    redirect(url);
  }
}

export const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
}
