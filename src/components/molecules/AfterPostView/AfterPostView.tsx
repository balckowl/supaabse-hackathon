import { cn } from "@/lib/utils";
import { GridPattern } from "../../magicui/grid-pattern";
import { Button } from "../../ui/button";
import DiaryBlock from "../DiaryBlock/DiaryBlock";
import Link from "next/link";

type Props = {
  diary: any
}

export default function AfterPostView({ diary }: Props) {
  return (
    <div className="h-[400px] relative">
      <div className="flex justify-center flex-col h-full items-center relative z-100">
        <div className="mb-[20px] z-100">
          <DiaryBlock diary={diary} />
        </div>
        <p className="mb-[15px]">Diary for today, posted!</p>
        <Button asChild>
          <Link href="/diaries">
            View all diaries
          </Link>
        </Button>
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
  );
}
