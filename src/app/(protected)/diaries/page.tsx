import PageTitle from "@/components/atom/PageTitle/PageTitle";
import DiaryBlock from "@/components/molecules/DiaryBlock/DiaryBlock";
import { getAllDiaryByUserId } from "@/data/diary";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {

  const supabase = await createClient()
  const {
    data: { user: supabaseUser },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !supabaseUser) {
    console.log(userError)
    redirect("/login")
  }

  const diaries = await getAllDiaryByUserId(supabaseUser.id)

  console.log(diaries)

  return (
    <div className="container mx-auto">
      <div className="max-w-[565px] mx-auto">
        <div className='flex justify-center mb-[20px]'>
          <PageTitle title="Diary List" />
        </div>
        <div className="flex gap-[5px] flex-wrap">
          {diaries?.map((diary) => (
            <DiaryBlock diary={diary} key={diary.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
