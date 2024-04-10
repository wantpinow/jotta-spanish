import { ShapesIcon } from "lucide-react";
import Link from "next/link";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ThemeToggle } from "~/components/theme/toggle";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-6">
      <div className="container mb-8 flex items-center justify-between">
        <Link href="/blog">
          <div className="text-xl font-light tracking-widest">
            <ShapesIcon className="mr-2.5 inline-block stroke-[1px]" />
            jotta blog
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle meme />
          <Link href={"https://github.com/wantpinow/jotta-spanish"}>
            {/* @ts-ignore */}
            <SiGithub />
          </Link>
        </div>
      </div>
      <main className="container max-w-[700px] py-6">{children}</main>
    </div>
  );
}
