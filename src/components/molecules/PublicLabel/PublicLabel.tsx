import { Lock, Unlock } from "lucide-react";

type Props = {
  isPublic: boolean
}

export default function PublicLabel({ isPublic }: Props) {
  return (
    <>
      {!isPublic &&
        <div className="flex items-center gap-2 text-red-600 font-bold">
          <Lock />
          You can't receive someone’s diary.
        </div>
      }
      {isPublic &&
        <div className="flex items-center gap-2">
          <Unlock />
          You can receive someone’s diary.
        </div>
      }
    </>
  );
}
