'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CH } from '@code-hike/mdx/components';
import ProsCard from '@/components/ProsCard';
import ConsCard from '@/components/ConsCard';
import ImageWithTheme from '@/components/ImageWithTheme';

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href || '';
    const isInternalLink = href.startsWith('/') || href.startsWith('#');

    if (isInternalLink) {
        return (
            <Link href={href} {...props}>
                {props.children}
            </Link>
        );
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props: React.ComponentProps<typeof Image>) {
    const { alt, ...rest } = props;
    return <Image alt={alt || ''} className="rounded-lg" {...rest} />;
}

function Callout({ emoji, children }: { emoji: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-4 my-8">
            <div className="flex items-center w-4 mr-4">{emoji}</div>
            <div className="w-full callout">{children}</div>
        </div>
    );
}

const MDXComponents = {
    Image: RoundedImage,
    ImageWithTheme,
    a: CustomLink,
    Callout,
    ConsCard,
    ProsCard,
    CH
};

export default MDXComponents;
