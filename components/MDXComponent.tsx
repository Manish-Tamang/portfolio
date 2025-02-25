"use client";

import ImageWithTheme from '@/components/ImageWithTheme';
import { highlight } from 'sugar-high';
import { ReactNode } from 'react';
import { BlurFadeImage } from './BlurFade';
import Link from 'next/link';
import TOCInline from '@/components/ui/TOCinline'
import Pre from '@/components/ui/pre'
import React from 'react';

const CustomLink = ({ href, children, ...props }: { href: string, children: ReactNode }) => {
    const isInternalLink = href.startsWith('/') || href.startsWith('#');
    return isInternalLink ? (
        <Link href={href} {...props}>{children}</Link>
    ) : (
        <a target="_blank" rel="noopener noreferrer" href={href} {...props}>{children}</a>
    );
};

const RoundedImage = ({ alt, ...props }: { alt: string, src: string, width: number, height: number }) => (
    <BlurFadeImage alt={alt} delay={0.7} className="w-full h-full" {...props} />
);

const Callout = ({ emoji, children }: { emoji: string, children: ReactNode }) => (
    <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-4 my-8">
        <div className="flex items-center w-4 mr-4">{emoji}</div>
        <div className="w-full callout">{children}</div>
    </div>
);

const PreFormatted = ({ children, ...props }: { children: ReactNode }) => (
    <Pre {...props} >
        {children}
    </Pre>
);

const Code = ({ children }: { children: string }) => {
    const isInlineCode = children.startsWith('`') && children.endsWith('`') && !children.includes('\n');
    return isInlineCode ? (
        <code className="bg-pink-100 text-pink-900 rounded px-1 py-0.5 text-sm">
            {highlight(children.slice(1, -1))}
        </code>
    ) : (

        <div className="bg-gray-900 p-4 rounded-lg">
            <Pre>
                <code className="sugar-high rounded px-1 py-0.5 text-sm" dangerouslySetInnerHTML={{ __html: highlight(children) }} />
            </Pre>
        </div>
    );
};


const MDXComponents = {
    Image: RoundedImage,
    ImageWithTheme,
    a: CustomLink,
    Callout,
    pre: PreFormatted,
    code: Code,
    TOCInline,
    h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
    h2: (props: any) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h3: (props: any) => <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />,
    h4: (props: any) => <h4 className="text-xl font-bold mt-4 mb-2" {...props} />,
    p: (props: any) => <p className="mb-4" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside mb-4" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside mb-4" {...props} />,
    li: (props: any) => <li className="mb-2" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-gray-300 pl-4 my-4" {...props} />,
};

export default MDXComponents;