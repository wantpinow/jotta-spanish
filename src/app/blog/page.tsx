import Link from "next/link";
import { Separator } from "~/components/ui/separator";
import { getAllBlogs } from "~/lib/blog";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "~/components/ui/pagination";
import { BlogPostTagBadge } from "~/components/common/blog/tag";
import { cn } from "~/lib/utils";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { DumbSwitch } from "./_components/dumb-switch";

export default function BlogHomepage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  // @ts-ignore
  const page = "page" in searchParams ? parseInt(searchParams.page) : 1;
  const allBlogs = getAllBlogs();
  const show = 5;
  const blogs = allBlogs.slice((page - 1) * show, page * show);
  const numPages = Math.ceil(allBlogs.length / show);

  return (
    <main className="flex flex-col">
      <section>
        <div className="flex justify-between gap-4">
          <h2 className="text-3xl font-bold">Recent Posts</h2>
          <DumbSwitch id="tech">Technical Articles</DumbSwitch>
        </div>
        <Separator className="mt-4" />
        <div className="grid grid-cols-1 py-2">
          {blogs.map((blog) => (
            <Link href={"/blog/" + blog.slug} passHref key={blog.slug}>
              <div className="flex justify-between gap-2 py-4 align-middle transition-transform duration-200 hover:translate-x-0.5 hover:brightness-[1.4]">
                <div>
                  <h3
                    className={cn(
                      "text-lg font-bold",
                      !blog.published && "text-orange-500",
                    )}
                  >
                    {blog.title}
                    {!blog.published && " [DRAFT]"}
                  </h3>
                  <p className="text-foreground/70">
                    <span className="mr-3">{blog.description}</span>
                    <TooltipProvider>
                      {blog.tags.map((tag) => (
                        <Tooltip key={tag}>
                          <TooltipTrigger>
                            <BlogPostTagBadge
                              tag={tag}
                              displayIcon
                              displayText={false}
                              className="mr-1 translate-y-[2px]"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tag}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </p>
                </div>
                <div className="my-auto text-gray-400">
                  <p>{format(blog.date, "LLLL do y")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {numPages > 1 && (
        <>
          <Separator className="mb-4" />
          <Pagination>
            <PaginationContent className="ml-auto w-fit">
              {page - 1 >= 1 && (
                <PaginationItem>
                  <PaginationLink href={`/blog?page=${page - 1}`}>
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={`/blog?page=${page}`} isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              {page + 1 <= numPages && (
                <PaginationItem>
                  <PaginationLink href={`/blog?page=${page + 1}`}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {page + 2 <= numPages && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`/blog?page=${numPages}`}>
                      {numPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
            </PaginationContent>
          </Pagination>
        </>
      )}
    </main>
  );
}
