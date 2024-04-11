"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";

type SidebarLinkProps = {
  href: string;
  name: string;
  //   todo: why can't I pass the icons down properly?
  //   icon: LucideIcon;
};

export function SidebarLink(props: SidebarLinkProps) {
  const pathname = usePathname();
  const active = props.href === pathname;

  return (
    <Button
      variant={active ? "default" : "secondary"}
      className="flex w-full items-center justify-between gap-4 text-left"
      asChild
    >
      <Link href={props.href}>
        {props.name}
        {/* <props.icon size={18} /> */}
      </Link>
    </Button>
  );
}
