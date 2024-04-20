import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/theme/provider";
import { Toaster } from "~/components/ui/sonner";
import { OpenAIKeyProvider } from "~/components/openai/key-provider";
import { env } from "~/env";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Jotta",
  description: "Jotta.ai",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const openAIKey = env.OPENAI_API_KEY;
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "antialiased")}>
          <div>
            <TRPCReactProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <OpenAIKeyProvider initialKey={openAIKey}>
                  {children}
                  <Toaster />
                </OpenAIKeyProvider>
              </ThemeProvider>
            </TRPCReactProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
