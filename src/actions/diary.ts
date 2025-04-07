"use server"

import { createClient } from "@/lib/supabase/server";

export const postAction = async (content: string, todayStr: string, isPublic: boolean) => {
  const supabase = await createClient()

  const {
    data: { user: supabaseUser },
    error: userError
  } = await supabase.auth.getUser()

  if(!supabaseUser){
    throw Error("ログインしてください。")
  }

  await supabase
    .from("diaries")
    .insert({
      is_public: isPublic,
      user_id: supabaseUser.id,
      diary_date: todayStr,
      content: content,
    });

}

export const updateAction = async (content: string, diaryId: number,isPublic: boolean) => {
  const supabase = await createClient()

  const {
    data: { user: supabaseUser },
    error: userError
  } = await supabase.auth.getUser()

  if(!supabaseUser){
    throw Error("ログインしてください。")
  }

  await supabase
    .from("diaries")
    .update({
      is_public: isPublic,
      content: content,
    }).eq('id', diaryId);

}
