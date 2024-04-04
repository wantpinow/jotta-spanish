import { promises as fs } from "fs";

export const getAllBlogParams = async () => {
  // get all date folders from the blog folder
  const dateFolders = await fs.readdir(`${process.cwd()}/blog`);

  // get all slugs within each date folder
  let params = [];
  for (let folderIdx = 0; folderIdx < dateFolders.length; folderIdx++) {
    const dateFolder = dateFolders[folderIdx] as string;
    const markdownFiles = await fs.readdir(
      `${process.cwd()}/blog/${dateFolder}`,
    );
    const markdownSlugs = markdownFiles
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
    for (let slugIdx = 0; slugIdx < markdownSlugs.length; slugIdx++) {
      const slug = markdownSlugs[slugIdx] as string;
      params.push({
        slug,
        date: dateFolder,
      });
    }
  }
  return params.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const blogTitleFromSlug = (slug: string) => {
  return slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
};
