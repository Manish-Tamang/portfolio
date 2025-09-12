"use client";
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
import Image from 'next/image';

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
    <div className="relative group my-6">
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
      <ul className="list-none pl-0 space-y-2">
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

  // Image zoom modal state
  const [zoomedImg, setZoomedImg] = useState<{ src: string; alt: string } | null>(null);

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

  const handleCloseModal = () => setZoomedImg(null);

  return (
    <div className="py-6">
      {zoomedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-full max-h-full flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Close image zoom"
              className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-[#3EB76C] z-10"
              onClick={handleCloseModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
            <Image
              src={zoomedImg.src}
              alt={zoomedImg.alt}
              width={1200}
              height={900}
              className="rounded-lg shadow-2xl max-h-[80vh] max-w-[90vw] object-contain"
              style={{ background: '#fff' }}
            />
          </div>
        </div>
      )}
      <Accordion type="single" collapsible>
        <AccordionItem value="table-of-contents">
          <AccordionTrigger className="font-semibold text-lg py-4">Table of Contents</AccordionTrigger>
          <AccordionContent className="p-0">
            {toc.length > 0 ? <TableOfContents toc={toc} /> : <p className="p-4">No table of contents available.</p>}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div ref={contentRef} className="space-y-6">
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h1 id={id} className="text-4xl font-bold mt-10 mb-4 text-gray-900 dark:text-gray-100 border-b pb-4 border-gray-200 dark:border-gray-700">
                  {children}
                </h1>
              );
            },
            h2: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h2 id={id} className="text-3xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">
                  {children}
                </h2>
              );
            },
            h3: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h3 id={id} className="text-2xl font-semibold font-peachi mt-6 mb-3 text-gray-800 dark:text-gray-200">
                  {children}
                </h3>
              );
            },
            h4: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h4 id={id} className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                  {children}
                </h4>
              );
            },
            p: ({ children }) => (
              <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-8 my-4 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-8 my-4 text-gray-700 dark:text-gray-300 space-y-2 text-lg">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="mb-2">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="pl-3 my-4 text-xs text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-600">
                {children}
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
              <>
                <Image
                  src={src || ''}
                  alt={alt || ''}
                  className="object-cover w-full h-full my-6 rounded-md cursor-zoom-in transition-transform hover:scale-105"
                  width={400}
                  height={200}
                  onClick={() => src && setZoomedImg({ src, alt: alt || '' })}
                  style={{ background: '#fff' }}
                />
                <span className="block text-center text-xs text-gray-400 mt-1 select-none">Click to zoom</span>
              </>
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
              <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
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
              <pre className="my-0">{children}</pre>
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};