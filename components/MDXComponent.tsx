import Link from 'next/link';
import Image from 'next/image';

import { CH } from '@code-hike/mdx/components';
import ImageWithTheme from '@/components/ImageWithTheme';

import { AnchorHTMLAttributes, DetailedHTMLProps, ImgHTMLAttributes, JSX, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, RefAttributes } from 'react';
import { PlaceholderValue, OnLoadingComplete } from 'next/dist/shared/lib/get-img-props';

const CustomLink = (props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
        return (
            <Link href={href} passHref>
                <a {...props}>{props.children}</a>
                {props.children}
            </Link>
        );
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props: JSX.IntrinsicAttributes & Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"> & { src: string | import("next/dist/shared/lib/get-img-props").StaticImport; alt: string; width?: number | `${number}`; height?: number | `${number}`; fill?: boolean; loader?: import("next/image").ImageLoader; quality?: number | `${number}`; priority?: boolean; loading?: "eager" | "lazy" | undefined; placeholder?: PlaceholderValue; blurDataURL?: string; unoptimized?: boolean; overrideSrc?: string; onLoadingComplete?: OnLoadingComplete; layout?: string; objectFit?: string; objectPosition?: string; lazyBoundary?: string; lazyRoot?: string; } & RefAttributes<HTMLImageElement | null>) {
    const { alt, ...rest } = props;
    return <Image alt={alt} className="rounded-lg" {...rest} />;
}

function Callout(props: { emoji: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | Iterable<ReactNode> | null | undefined; }) {
    return (
        <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-4 my-8">
            <div className="flex items-center w-4 mr-4">{props.emoji}</div>
            <div className="w-full callout">{props.children}</div>
        </div>
    );
}

const MDXComponents = {
    Image: RoundedImage,
    ImageWithTheme,
    a: CustomLink,
    Callout,
    CH
};

export default MDXComponents;
