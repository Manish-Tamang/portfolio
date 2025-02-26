// components/mdx/MDXServer.tsx
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useMDXComponents } from "./mdx-components";
import { Code } from "@/components/mdx/code";

export default async function MDXServer({ content }: { content: string }) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return <MDXRemote {...mdxSource} components={{ code: Code, ...useMDXComponents({}) }} />;
}
