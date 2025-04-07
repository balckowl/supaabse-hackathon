import { signInWithGithub } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <form action={signInWithGithub}>
          <Button type="submit" className="cursor-pointer">
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
}

