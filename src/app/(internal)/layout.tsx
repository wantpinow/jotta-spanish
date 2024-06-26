import "~/styles/globals.css";

import { ThemeToggle } from "~/components/theme/toggle";
import { OpenAiKeyDialog } from "~/components/openai/key-dialog";
// import { getServerAuthSession } from "~/server/auth";
import { ShapesIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { currentUser } from "@clerk/nextjs";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const openAIKey = env.OPENAI_API_KEY;
  return (
    <>
      <div className="border-b py-2">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <div className="text-xl font-light tracking-widest">
              <ShapesIcon className="mr-2.5 inline-block stroke-[1px]" />
              jotta
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <OpenAiKeyDialog key={openAIKey} />
            <ThemeToggle />
            <Button variant="secondary" asChild>
              {/* <Link href={user ? "/api/auth/signout" : "/api/auth/signin"}>
                {user ? "Logout" : "Login"}
              </Link> */}
            </Button>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-4xl py-6">{children}</main>
    </>
  );
}
