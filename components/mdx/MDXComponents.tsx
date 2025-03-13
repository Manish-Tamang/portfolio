"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Check } from 'lucide-react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { BlurFadeImage } from '../BlurFade';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

interface CodeBlockProps {
  language: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <SyntaxHighlighter
        PreTag="div"
        language={language}
        wrapLines={true}
        style={atomDark}
        className="rounded-[4px] overflow-hidden shadow-md font-mono"
      >
        {children.replace(/\n$/, '')}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-[4px] bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  );
};

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  toc: TocItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  const handleTocItemClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="sticky top-0 overflow-y-auto p-4">
      <ul className="list-none pl-0">
        {toc.map((item) => (
          <li
            key={item.id}
            className={`ml-${(item.level - 1) * 4} text-gray-700 dark:text-gray-300 hover:text-[#38A662]`}
          >
            <a
              className="block py-1 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                handleTocItemClick(item.id);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface MDXComponentsProps {
  content: string;
}

export const MDXComponents: React.FC<MDXComponentsProps> = ({ content }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headings: TocItem[] = [];
    const headingElements = contentRef.current?.querySelectorAll("h1, h2, h3, h4");

    headingElements?.forEach((element) => {
      const level = parseInt(element.tagName.substring(1), 10);
      const text = element.textContent || "";
      const id = slugify(text);
      element.id = id;
      headings.push({ id, text, level });
    });

    setToc(headings);
  }, [content]);

  return (
    <div>
      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="table-of-contents">
          <AccordionTrigger className="font-semibold">Table of Contents</AccordionTrigger>
          <AccordionContent className="p-0">
            {toc.length > 0 ? <TableOfContents toc={toc} /> : <p>No table of contents available.</p>}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div ref={contentRef}>
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h1 id={id} className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100 border-b pb-2 border-gray-200 dark:border-gray-700">
                  {children}
                </h1>
              );
            },
            h2: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h2 id={id} className="text-3xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                  {children}
                </h2>
              );
            },
            h3: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h3 id={id} className="text-2xl font-semibold font-peachi mt-5 mb-2 text-gray-800 dark:text-gray-200">
                  {children}
                </h3>
              );
            },
            h4: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h4 id={id} className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">
                  {children}
                </h4>
              );
            },
            p: ({ children }) => (
              <p className="my-0 text-gray-700 dark:text-gray-300 leading-relaxed">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 my-0 text-gray-700 dark:text-gray-300 space-y-0">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 my-0 text-gray-700 dark:text-gray-300 space-y-0">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="mb-0">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="relative border-l-4 border-gray-400 dark:border-gray-600 pl-6 italic text-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <span className="absolute -top-3 left-2 text-4xl text-gray-400 dark:text-gray-600">“</span>
                {children}
                <span className="absolute -bottom-3 right-2 text-4xl text-gray-400 dark:text-gray-600">”</span>
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <BlurFadeImage
                src={src || ''}
                alt={alt || ''}
                delay={0.3}
                className="object-cover w-full h-full mt-4 mb-2"
                width={800}
                height={600}
              />
            ),
            hr: () => (
              <hr className="my-8 border-gray-200 dark:border-gray-700" />
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-6 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50 dark:bg-gray-800">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr>{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {children}
              </td>
            ),
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');

              return match ? (
                <CodeBlock language={match[1]}>
                  {String(children).replace(/\n$/, '')}
                </CodeBlock>
              ) : (
                <code
                  {...props}
                  className="bg-gray-200 dark:bg-gray-700 text-pink-500 px-2 py-1 rounded font-mono text-sm"
                >
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="my-6">{children}</pre>
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};