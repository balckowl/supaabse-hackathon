import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Lock } from "lucide-react";
import Link from "next/link";

type Props = {
  diary: any
}

const extractText = (html: string) => {
  const textOnly = html.replace(/<[^>]*>/g, "").trim();
  return textOnly.charAt(0);
};

export default function DiaryBlock({ diary }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href={`/diaries/${diary.id}`} className="border bg-white relative rounded-2xl shadow-md w-[90px] h-[90px] grid place-content-center">
            <p className="font-bold text-4xl">{extractText(diary.content)}</p>
            {!diary.is_public && <Lock color="red" className="absolute top-[-10px] left-0" />}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{diary.diary_date}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
