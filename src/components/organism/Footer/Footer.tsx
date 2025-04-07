import Link from "next/link";
import { Button } from "../../ui/button";
import { signOut } from "@/actions/auth";

type Props = {
  avaterUrl: string;
  name: string;
}

export default function Footer({ avaterUrl, name }: Props) {
  return (
    <div className="border-t mt-[100px] pt-[20px]">
      <div className="max-w-[650px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={avaterUrl}
            className="border rounded-full"
            width={40}
            height={40}
            alt=""
          />
          <p className="font-semibold">@{name}</p>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <Button type="submit"
              className="cursor-pointer"
              variant="ghost"
            >
              Sign out
            </Button>
          </form>

        </div>
        <Button asChild variant="ghost">
          <Link href="/diaries">
            View all diaries
          </Link>
        </Button>
      </div>
    </div>
  );
}
