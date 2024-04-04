import { promises as fs } from "fs";
import { format } from "date-fns";

import Markdown from "react-markdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { blogTitleFromSlug, getAllBlogParams } from "~/lib/blog";

export async function generateStaticParams() {
  return await getAllBlogParams();
}

export default async function BlogPostPage({
  params,
}: {
  params: { date: string; slug: string };
}) {
  // return 404 if markdown file doesn't exist
  const filename = `${process.cwd()}/blog/${params.date}/${params.slug}.md`;
  try {
    await fs.access(filename);
  } catch (e) {
    return <div>404 - cant find markdown file</div>;
  }

  // read the markdown file
  const markdown = await fs.readFile(filename, "utf8");

  const generateSlug = (string: string) => {
    let str = string.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return str;
  };

  // format the title
  const title = blogTitleFromSlug(params.slug);

  console.log("rendering", title);
  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/spanish/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Markdown
        components={{
          h2: ({ ...props }) => (
            <a
              href={
                props.children
                  ? `#${generateSlug(props.children as string)}`
                  : undefined
              }
              style={{ textDecoration: "none" }}
            >
              <h2
                id={
                  props.children
                    ? generateSlug(props.children as string)
                    : undefined
                }
                {...props}
              ></h2>
            </a>
          ),
        }}
        className="markdown"
      >
        {markdown}
      </Markdown>
      <div className="my-8 text-right text-sm text-foreground/60">
        {format(new Date(), "'Published on ' LLLL do y")}
      </div>
    </>
  );
}
