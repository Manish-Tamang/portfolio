// components/mdx/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import { Code } from "@/components/mdx/code";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    code: ({ className, children }) => {
      const language = className ? className.replace('language-', '') : undefined;
      return <Code language={language}>{children as string}</Code>;
    },
  };
}