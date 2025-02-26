// components/mdx/MDXContent.tsx
"use server";

import dynamic from "next/dynamic";

const MDXServer = dynamic(() => import("./MDXServer"), { ssr: false });

export default function MDXContent({ content }: { content: string }) {
  return <MDXServer content={content} />;
}
