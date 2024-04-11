import { redirect } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function DeckLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const deck = await api.deck.getDeckById({ id: parseInt(params.id) });

  if (!deck) {
    return redirect("/");
  }

  // const links = [
  //   {
  //     href: `/deck/${deck.id}`,
  //     name: "Cards",
  //     icon: LayoutIcon,
  //   },
  //   {
  //     href: `/deck/${deck.id}/take`,
  //     name: "Take",
  //     icon: ShapesIcon,
  //   },
  //   {
  //     href: `/deck/${deck.id}/manage`,
  //     name: "Manage",
  //     icon: SettingsIcon,
  //   },
  // ];
  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Decks</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{deck.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="border border-muted bg-foreground/5 px-6 py-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <div className="text-3xl font-bold">{deck.name}</div>
            <div className="text-foreground/70">{deck.description}</div>
          </div>
          <Button variant="link" size="sm">
            Edit
          </Button>
        </div>
        <div className="grid h-4 w-full grid-cols-12 overflow-clip rounded-full">
          <div className="col-span-2 bg-red-600"></div>
          <div className="col-span-1 bg-orange-600"></div>
          <div className="col-span-3 bg-yellow-600"></div>
          <div className="col-span-6 bg-green-600"></div>
        </div>
      </div>

      {/* <Separator className="my-4" /> */}
      {/* <div className="block md:flex md:gap-4">
        <div className="space-y-2 md:w-[220px] md:flex-none">
          {links.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              name={link.name}
              // icon={link.icon}
            />
          ))}
        </div>
        <div>{children}</div>
      </div> */}
      <div className="py-4">{children}</div>
    </div>
  );
}
