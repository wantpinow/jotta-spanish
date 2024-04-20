import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  ChevronDown,
  ChevronRightIcon,
  LogInIcon,
  ShapesIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { LLMPlayground } from "~/components/ai/llm-playground";
import { ThemeToggle } from "~/components/theme/toggle";
import { Button } from "~/components/ui/button";
import { SITE_CONFIG } from "~/lib/config";

export default async function Homepage() {
  const { userId } = auth();
  return (
    <div className="py-6">
      <div className="container mb-8 flex items-center justify-between">
        <Link href="/">
          <div className="text-xl font-light tracking-widest">
            <ShapesIcon className="mr-2.5 inline-block stroke-[1px]" />
            jotta.ai
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="link" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href={SITE_CONFIG.repo} target="_blank">
              GitHub
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link href={userId ? "/home" : "/sign-in"}>
              {userId ? (
                "Dashboard"
              ) : (
                <>
                  Get Started
                  <ChevronRightIcon className="ml-1" size={16} />
                </>
              )}
            </Link>
          </Button>
        </div>
      </div>
      <main className="container max-w-[700px] py-2">
        <div className="mb-4 text-center text-5xl font-black">
          I&apos;m learning{" "}
          <span className="inline-block bg-gradient-to-b from-red-600 via-yellow-500 to-red-600 bg-clip-text text-transparent">
            Spanish
          </span>{" "}
          🇪🇸
        </div>
        <div className="relative mb-2 h-72 w-full overflow-clip rounded-lg">
          <Image
            src="/spanish.png"
            alt="Spanish"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="mb-8 text-center text-base font-light text-foreground/70">
          And by &apos;learning spanish&apos;, I mean spending 6 months building
          yet another a language learning app, instead of actually doing
          something useful with my time.
        </div>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/blog">Learn More</Link>
          </Button>
          <Button size="lg">Get Started</Button>
        </div>
      </main>
    </div>
  );
}
