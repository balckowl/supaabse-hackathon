import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="pb-[150px]">
        <h2 className="text-5xl font-bold text-center mb-[30px]">
          Post your diary<br /> get a random one back.
        </h2>
        <div className="flex justify-center">
          <Button>
            <Link href="/login">
              Let’s start a diary today
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
