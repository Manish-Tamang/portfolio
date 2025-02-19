import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';
import React from 'react';
import { postQuery } from '@/lib/queries';
import Container from '@/components/Container';
import BlogPostContent from '@/components/BlogPostContent';
import { serialize } from 'next-mdx-remote/serialize'

interface Props {
    params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = params;

    const post = await client.fetch(postQuery, { slug });

    if (!post) {
        return (
            <Container>
                <div>Post not found</div>
            </Container>
        );
    }

    const mdxSource = await serialize(post.content || '')

    return (
        <Container>
            <article className="py-12">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    <div className="text-gray-600 dark:text-gray-400">
                        Published on {format(new Date(post.date), 'MMMM d, yyyy')}
                    </div>
                </header>

                {post.coverImage && (
                    <img
                        src={urlFor(post.coverImage).url()}
                        alt={post.title}
                        className="w-full h-auto rounded-lg mb-6"
                    />
                )}

                <BlogPostContent mdxSource={mdxSource} />
            </article>
        </Container>
    );
}