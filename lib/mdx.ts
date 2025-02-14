// lib/mdx.ts
import { serialize } from "next-mdx-remote/serialize";
import { remarkCodeHike } from "@code-hike/mdx";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function mdxToHtml(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [
          remarkCodeHike,
          {
            theme: "github-dark-dimmed",
            skipLanguages: ["mermaid"],
            autoImport: false,
            showCopyButton: true,
          },
        ],
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
      useDynamicImport: true,
      format: "mdx",
    },
  });

  return {
    html: mdxSource,
    readingTime: readingTime(source).text,
  };
}
