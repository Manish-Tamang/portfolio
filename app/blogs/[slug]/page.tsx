// app/blogs/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { client } from '@/sanity/lib/client'; // Updated import path
import { postQuery, postSlugsQuery } from '@/lib/queries';
import { mdxToHtml } from '@/lib/mdx';
import { Post } from '@/lib/types';
import components from '@/components/MDXComponents';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';

interface Props {
    params: { slug: string };
}

async function getData(slug: string) {
    return await client.fetch(postQuery, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getData(params.slug);

    if (!post) {
        return { title: 'Blog Post Not Found' };
    }

    return {
        title: `Blog | ${post.title}`,
        description: post.excerpt || 'A blog post from our site',
        openGraph: {
            title: `Blog | ${post.title}`,
            description: post.excerpt || 'A blog post from our site',
            url: `/blogs/${params.slug}`,
            type: 'article',
        },
    };
}

export async function generateStaticParams() {
    const posts = await client.fetch<{ slug: string }[]>(postSlugsQuery);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}


export default async function BlogPostPage({ params }: Props) {
    const post = await getData(params.slug);

    if (!post) {
        notFound();
    }

    const { html, readingTime } = await mdxToHtml(post.content);

    return (
        <MDXRemote
            source={post.content}
            components={components}
            options={{
                mdxOptions: {
                    remarkPlugins: [], // Your remark plugins
                    rehypePlugins: [], // Your rehype plugins
                },
            }}
        />
    );
}