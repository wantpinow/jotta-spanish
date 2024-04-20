import { SignIn } from "@clerk/nextjs";
import { ShapesIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container py-6">
      <div className="text- mb-12 mt-24 text-center">
        <Link href="/">
          <div className="text-xl font-light tracking-widest">
            <ShapesIcon className="mr-2.5 inline-block stroke-[1px]" />
            jotta.ai
          </div>
        </Link>
      </div>
      <div className="mx-auto w-fit">
        <SignIn />
      </div>
    </div>
  );
}
