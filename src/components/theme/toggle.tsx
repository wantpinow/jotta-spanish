"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";
import { toast } from "sonner";

export function ThemeToggle({ meme = false }: { meme?: boolean }) {
  const { setTheme } = useTheme();

  // Write me 10 inspiration quotes about darkness. Something like "In the midst of darkness, light persists.". Keep them to short sentences.
  const inspirationalQuotes = [
    "Darkness is merely a canvas for the light.",
    "Through the shadows, we find the brilliance of courage.",
    "Even the longest night gives way to the dawn.",
    "In darkness, every light shines brighter.",
    "Stars cannot shine without the darkness.",
    "Dark times teach us the value of light.",
    "Embrace the dark, for it shows you the light.",
    "Out of darkness comes the power of clarity.",
    "Shadows make the light worth seeking.",
    "Darkness frames the beauty of the stars.",
  ];
  const authors = [
    "Morgan Freeman",
    "Helen Keller",
    "Charles Dickens",
    "Ice Spice",
    "Latin Proverb",
    "Ed Balls",
    "J.R.R. Tolkien",
    "Plato",
    "Sun Tzu",
    "Mahatma Gandhi",
    "Paul Gascoigne",
  ];
  const authorsYears = [
    "2002",
    "1948",
    "1867",
    "2022",
    "100 BC",
    "2013",
    "1954",
    "400 BC",
    "500 BC",
    "1942",
    "1990",
  ];
  const modifiers = ["probably", "maybe", "potentially", "alledgedly"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
            if (meme) {
              setTimeout(() => {
                setTheme("dark");
                setTimeout(() => {
                  const quote =
                    inspirationalQuotes[
                      Math.floor(Math.random() * inspirationalQuotes.length)
                    ];
                  const authorIdx = Math.floor(Math.random() * authors.length);
                  const author = authors[authorIdx];
                  const year = authorsYears[authorIdx];
                  const modifier =
                    modifiers[Math.floor(Math.random() * modifiers.length)];
                  toast(quote, {
                    description: `${author}, ${modifier} (${year})`,
                    duration: 5000,
                  });
                }, 1000);
              }, 500);
            }
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
