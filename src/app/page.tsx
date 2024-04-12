import { SiGithub } from "@icons-pack/react-simple-icons";
import { ShapesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LLMPlayground } from "~/components/ai/llm-playground";
import { ThemeToggle } from "~/components/theme/toggle";
import { Button } from "~/components/ui/button";

export default function Homepage() {
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
          <ThemeToggle meme />
          <Link
            href={"https://github.com/wantpinow/jotta-spanish"}
            target="_blank"
          >
            {/* @ts-expect-error: props are messed on this */}
            <SiGithub />
          </Link>
          <Button variant="secondary" asChild>
            Sign In
          </Button>
        </div>
      </div>
      <main className="container max-w-[700px] py-2">
        <LLMPlayground />
        <div className="mb-4 text-center text-5xl font-black">
          I'm learning{" "}
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
          And by 'learning spanish', I mean spending 6 months building yet
          another a language learning app, instead of actually doing something
          useful with my time.
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
