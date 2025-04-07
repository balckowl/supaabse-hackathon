import AfterPostView from "@/components/molecules/AfterPostView/AfterPostView";
import PageTitle from "@/components/atom/PageTitle/PageTitle";
import Tiptap from "@/components/organism/newForm/newForm";
import { getUserDiaryByDate } from "@/data/diary";
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

  const diary = await getUserDiaryByDate(supabaseUser.id)

  return (
    <div className="container mx-auto">
      <div className='flex justify-center mb-[20px]'>
        <PageTitle title="Today's Diary" />
      </div>
      {!diary && <Tiptap />}
      {diary && <AfterPostView diary={diary}/>}
    </div>
  );
}
