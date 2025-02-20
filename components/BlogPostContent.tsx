// components/BlogPostContent.tsx
'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { HighlightedCode, Inline, Pre } from "codehike/code";

interface Props {
    mdxSource: any;
}

interface CodeProps {
    codeblock: HighlightedCode;
}

interface InlineCodeProps {
    codeblock: HighlightedCode;
}


function Code({ codeblock }: CodeProps) {
    return <Pre code={codeblock} />;
}

function InlineCode({ codeblock }: InlineCodeProps) {
    return <Inline code={codeblock} />;
}

const components = {
    h1: (props: any) => <h1 className="text-3xl font-bold mb-4">{props.children}</h1>,
    h2: (props: any) => <h2 className="text-2xl font-semibold mb-3">{props.children}</h2>,
    p: (props: any) => <p className="mb-2">{props.children}</p>,
    ul: (props: any) => <ul className="list-disc pl-5 mb-2">{props.children}</ul>,
    li: (props: any) => <li className="mb-1">{props.children}</li>,
    a: (props: any) => (
        <a href={props.href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            {props.children}
        </a>
    ),
    code: Code,
    inlineCode: InlineCode,
};


const BlogPostContent = ({ mdxSource }: Props) => {

    return (
        <article className="max-w-none prose prose-lg dark:prose-invert">
            {mdxSource && <MDXRemote {...mdxSource} components={components} />}
        </article>
    );
};

export default BlogPostContent;