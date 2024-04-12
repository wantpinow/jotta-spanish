import { SiGithub } from "@icons-pack/react-simple-icons";
import { ShapesIcon } from "lucide-react";
import Link from "next/link";
import { ChatAnalysis } from "~/app/chat-analysis";
import { ThemeToggle } from "~/components/theme/toggle";

export default function PlaygroundPage() {
  return (
    <div className="py-6">
      <div className="container mb-8 flex items-center justify-between">
        <Link href="/">
          <div className="text-xl font-light tracking-widest">
            <ShapesIcon className="mr-2.5 inline-block stroke-[1px]" />
            jotta
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle meme />
          <Link
            href={"https://github.com/wantpinow/jotta-spanish"}
            target="_blank"
          >
            {/* @ts-expect-error: props are messed on this */}
            <SiGithub />
          </Link>
        </div>
      </div>
      <main className="container max-w-[700px] py-6">
        <ChatAnalysis />
      </main>
    </div>
  );
}
