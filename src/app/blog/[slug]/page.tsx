// big thanks to https://gaudion.dev/blog/nextjs-mdx-blog

import fs from "fs";
import path from "path";

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { getBlogBySlug } from "~/lib/blog";
import { Separator } from "~/components/ui/separator";
import { format } from "date-fns";
import { BlogPostTagBadge } from "~/components/common/blog/tag";

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = getBlogBySlug(params.slug);

  return {
    title: blog.title,
    description: blog.description,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);
  return (
    <article className="prose prose-sm prose-slate !prose-invert mx-auto mb-24 md:prose-base lg:prose-lg">
      <h1>{blog.title}</h1>
      <div className="flex items-end justify-between">
        <div className="max-w-sm">
          {blog.tags.map((tag) => (
            <BlogPostTagBadge
              key={tag}
              tag={tag}
              displayIcon={true}
              displayText={true}
              className="mr-1 translate-y-[2px]"
            />
          ))}
        </div>
        <p className="text-right text-sm italic">
          Published on {format(blog.date, "LLLL do y")}
        </p>
      </div>
      <Separator className="mt-2" />
      <MDXRemote // @ts-expect-error: no idea fam
        options={mdxOptions}
        source={blog.content}
        components={{ BlogPostTagBadge }}
      />
    </article>
  );
}
