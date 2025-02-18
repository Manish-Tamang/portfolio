import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxToHtml } from '@/lib/mdx';
import { client } from '@/sanity/lib/client';
import { postQuery } from '@/lib/queries';
import components from '@/components/MDXComponents';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
    params: { slug: string };
}

async function getData(slug: string) {
    return await client.fetch(postQuery, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await Promise.resolve(params);
    const post = await getData(resolvedParams.slug);

    if (!post) {
        return { title: 'Blog Post Not Found' };
    }

    return {
        title: `Blog | ${post.title}`,
        description: post.excerpt || 'A blog post from our site',
        openGraph: {
            title: `Blog | ${post.title}`,
            description: post.excerpt || 'A blog post from our site',
            url: `/blogs/${resolvedParams.slug}`,
            type: 'article',
        },
    };
}

export default async function BlogPage({ params }: Props) {
    const resolvedParams = await Promise.resolve(params);
    const post = await getData(resolvedParams.slug);
    if (!post) return notFound();


    return (
        <article className="prose dark:prose-invert mx-auto max-w-3xl p-4">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <MDXRemote source={post.content} components={components} />
        </article>
    );
}
