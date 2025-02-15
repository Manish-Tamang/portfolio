import { MDXRemote } from 'next-mdx-remote';
import { mdxToHtml } from '@/lib/mdx';
import { client } from '@/sanity/lib/client';
import { postQuery, postSlugsQuery } from '@/lib/queries';
import components from '@/components/MDXComponents';
import { Metadata } from 'next';

interface Props {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
    const slugs = await client.fetch(postSlugsQuery);
    return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}

async function getData(slug: string) {
    const post = await client.fetch(postQuery, {
        slug: slug
    });

    return post
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;
    const post = await getData(slug)

    if (!post) {
        return {
            title: 'Blog Post Not Found',
        };
    }

    return {
        title: `Blog | ${post.title}`,
    };
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const post = await getData(slug)

    if (!post) {
        return <div>Post not found</div>;
    }

    const { html, readingTime } = await mdxToHtml(post.content);

    return (
        <div>
            <h1>{post.title}</h1>
            <MDXRemote {...html} components={components} />
        </div>
    );
}