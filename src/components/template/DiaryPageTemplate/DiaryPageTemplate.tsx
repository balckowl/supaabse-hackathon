"use client"

import PageTitle from "@/components/atom/PageTitle/PageTitle";
import { GridPattern } from "@/components/magicui/grid-pattern";
import PublicLabel from "@/components/molecules/PublicLabel/PublicLabel";
import UpdateForm from "@/components/organism/updateForm/updateForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pen, Unlock } from "lucide-react";
import { useState } from "react";


type Props = {
  title: string;
  content: string;
  diaryId: string;
  isPublic: boolean;
}

export default function DiaryPageTemplate({ title, content, isPublic, diaryId }: Props) {

  const [isEditable, setIsEditable] = useState(false)
  const finishUpdate = () => setIsEditable(false)

  return (
    <div>
      <div className='flex justify-center mb-[20px] items-center gap-3'>
        <PageTitle title={title} />
      </div>
      {!isEditable &&
        <div>
          <div className="relative">
            <div className="max-w-[565px] mx-auto">
              <div className="prose prose-base h-[400px]" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <GridPattern
              width={30}
              height={30}
              x={-1}
              y={-1}
              strokeDasharray={"4 2"}
              className={cn(
                "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
              )}
            />
          </div>
          <div className="max-w-[565px] mx-auto flex justify-between mt-[20px]">
            <PublicLabel isPublic={isPublic}/>
            <Button
              onClick={() => setIsEditable(true)}
              className="cursor-pointer"
            >
              <Pen /> Edit
            </Button>
          </div>
        </div>
      }
      {isEditable && <UpdateForm
        isPublic={isPublic}
        diaryId={diaryId}
        content={content}
        finishUpdate={finishUpdate}
         />}
    </div>
  );
}
