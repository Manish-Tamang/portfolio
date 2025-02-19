"use client"
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { remarkCodeHike } from '@code-hike/mdx';
import '@code-hike/mdx/styles.css';

interface Props {
    mdxSource: any;
}

export async function mdxToHtml(source: string) {
    return await serialize(source, {
        mdxOptions: {
            remarkPlugins: [
                [
                    remarkCodeHike,
                    {
                        theme: 'github-dark-dimmed',
                        lineNumbers: true, // Enables line numbers
                        showCopyButton: true, // Adds a copy button
                        autoImport: false, // Ensure it's false for Next.js
                        skipLanguages: ['mermaid'], // Exclude unsupported languages
                    }
                ]
            ],
            useDynamicImport: true,
        },
    });
}


const BlogPostContent = ({ mdxSource }: Props) => {
    return (
        <article className="max-w-none prose prose-lg dark:prose-invert">
            <MDXRemote {...mdxSource} />
        </article>
    );
};

export default BlogPostContent;
