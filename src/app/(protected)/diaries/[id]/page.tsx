import { getDiaryById } from "@/data/diary";
import DiaryPageTemplate from "@/components/template/DiaryPageTemplate/DiaryPageTemplate";

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {

  const { id } = await params

  const diary = await getDiaryById(Number(id))

  if (!diary) {
    return <div></div>
  }

  return (
    <>
      <DiaryPageTemplate
        title={diary.diary_date}
        content={diary.content}
        diaryId={id}
        isPublic={diary.is_public}
      />
    </>
  );
}
