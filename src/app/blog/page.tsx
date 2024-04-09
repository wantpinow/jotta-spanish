import { format } from "date-fns";
import Link from "next/link";
import { blogTitleFromSlug, getAllBlogParams } from "~/lib/blog";

export default async function BlogHomepage() {
  const allBlogParams = await getAllBlogParams();
  console.log("rendering blog homepage");
  return (
    <div>
      <div className="mb-8 text-center font-mono text-3xl font-semibold uppercase">
        Jotta Blog
      </div>
      <div className="space-y-2">
        {allBlogParams.map((params) => {
          return (
            <Link
              key={`/blog/${params.date}/${params.slug}`}
              href={`/blog/${params.date}/${params.slug}`}
              className="flex items-center justify-between border bg-foreground/5 px-6 py-4 hover:bg-foreground/10"
            >
              <span>{blogTitleFromSlug(params.slug)}</span>
              <span className="text-xs font-bold text-foreground/70">
                {format(new Date(params.date), "LLL do")}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
