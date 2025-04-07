import { createClient } from "@/lib/supabase/server"

export const getUserDiaryByDate = async (userId: string) => {
  const supabase = await createClient()

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = ("0" + (today.getMonth() + 1)).slice(-2);
  const dd = ("0" + today.getDate()).slice(-2);
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const {
    data: diaries
  } = await supabase
    .from("diaries").select("*")
    .eq("user_id", userId)
    .eq("diary_date", todayStr)

  const diary = diaries ? diaries[0] : null

  return diary
}

export const getAllDiaryByUserId = async (userId: string) => {
  const supabase = await createClient()
  const { data: diaries } = await supabase.from("diaries").select("*")
    .eq("user_id", userId)

  return diaries
}

export const getDiaryById = async (Id: number) => {
  const supabase = await createClient()

  const { data: diaries } = await supabase.from("diaries").select("*").eq("id", Id)
  const diary = diaries ? diaries[0] : null

  return diary
}
