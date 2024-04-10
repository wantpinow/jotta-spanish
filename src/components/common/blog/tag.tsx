import {
  BotIcon,
  GlobeIcon,
  GraduationCapIcon,
  Megaphone,
  MegaphoneIcon,
  PartyPopperIcon,
} from "lucide-react";
import { type BlogPostTag } from "~/lib/blog";
import { cn } from "~/lib/utils";
const iconMap = {
  Announcements: <PartyPopperIcon className="inline-block size-5 h-full" />,
  "Language Learning": (
    <GraduationCapIcon className="inline-block size-5 h-full" />
  ),
  "Artificial Intelligence": <BotIcon className="inline-block size-5" />,
  "Web Development": <GlobeIcon className="inline-block size-5 h-full" />,
};

export const BlogPostTagBadge = ({
  className,
  tag,
  displayText = true,
  displayIcon = false,
}: {
  className?: string;
  tag: BlogPostTag;
  displayText?: boolean;
  displayIcon?: boolean;
}) => {
  const tagColor = {
    Announcements:
      "bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800",
    "Language Learning":
      "bg-green-500 dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800",
    "Artificial Intelligence":
      "bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-600 dark:hover:bg-yellow-800",
    "Web Development":
      "bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-800",
  };
  const icon = iconMap[tag];
  return (
    <span
      className={cn(
        "inline-flex cursor-default items-center gap-1 whitespace-nowrap rounded-full text-xs font-bold text-white transition-colors duration-200",
        displayIcon && !displayText
          ? "size-7 justify-center p-1.5"
          : "px-3 py-1",
        tagColor[tag],
        className,
      )}
    >
      {displayIcon && icon}
      {displayText && tag}
    </span>
  );
};
