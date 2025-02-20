import Link from 'next/link';
import { CH } from '@code-hike/mdx/components';
import ImageWithTheme from '@/components/ImageWithTheme';
import { highlight } from 'sugar-high';
import { ReactNode } from 'react';
import { BlurFadeImage } from './BlurFade';

interface CustomLinkProps {
    href: string;
    children: React.ReactNode;
}

const CustomLink = ({ href, children, ...props }: CustomLinkProps) => {
    const isInternalLink = href.startsWith('/') || href.startsWith('#');
    return isInternalLink ? (
        <Link href={href} {...props}>{children}</Link>
    ) : (
        <a target="_blank" rel="noopener noreferrer" href={href} {...props}>{children}</a>
    );
};

interface RoundedImageProps {
    alt: string;
    src: string;
    width: number;
    height: number;
}

const RoundedImage = ({ alt, ...props }: RoundedImageProps) => {
    return <BlurFadeImage alt={alt}
        delay={0.7}
        className="w-full h-full" {...props} />;
};

interface CalloutProps {
    emoji: string;
    children: ReactNode;
}

const Callout = ({ emoji, children }: CalloutProps) => {
    return (
        <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-4 my-8">
            <div className="flex items-center w-4 mr-4">{emoji}</div>
            <div className="w-full callout">{children}</div>
        </div>
    );
};

interface PreProps {
    children: ReactNode;
}

const Pre = ({ children, ...props }: PreProps) => {
    return (
        <pre {...props} className="sugar-high overflow-auto p-4 rounded-lg">
            {children}
        </pre>
    );
};

interface CodeProps {
    children: string;
}

const Code = ({ children }: CodeProps) => {
    // Remove the triple backticks if present
    const codeContent = children.trim();
    
    // Check for inline code (single backtick)
    const isInlineCode = codeContent.startsWith('`') && codeContent.endsWith('`') && !codeContent.includes('\n');
    
    // Check for block code (triple backticks)
    const isBlockCode = codeContent.startsWith('```') && codeContent.endsWith('```');
    
    // Check for block code with no language specified (i.e., no language after the opening backticks)
    const isBlockCodeUnspecifiedLanguage = isBlockCode && !codeContent.includes('\n') && !codeContent.includes('```');

    if (isInlineCode) {
        // Inline code with pink background (no div)
        return (
            <code className="bg-pink-100 text-pink-900 rounded px-1 py-0.5 text-sm">
                {highlight(codeContent.slice(1, -1))} {/* Remove backticks */}
            </code>
        );
    }

    if (isBlockCodeUnspecifiedLanguage) {
        // Block code without language (e.g., curl - ***)
        return (
            <code className="bg-pink-100 text-pink-900 rounded px-1 py-0.5 text-sm block">
                {highlight(codeContent.slice(3, -3))} {/* Remove the triple backticks */}
            </code>
        );
    }

    // Block code with language (e.g., ```bash)
    return (
        <div className='bg-gray-900 border-4 border-gray-600 rounded-lg p-2'>
            <code className="sugar-high rounded px-1 py-0.5 text-sm" dangerouslySetInnerHTML={{ __html: highlight(codeContent) }} />
        </div>
    );
};

const MDXComponents = {
    Image: RoundedImage,
    ImageWithTheme,
    a: CustomLink,
    Callout,
    CH,
    pre: Pre,
    code: Code,
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
