import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';
import { PortableText } from '@portabletext/react';
import React from 'react';
import { components } from './components';
import { notFound } from 'next/navigation';

const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    content,
    date,
    coverImage
  }`;

const allSlugsQuery = `*[_type == "post"] {
    slug {
      current
    }
  }`;

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    try {
        const slugs = await client.fetch(allSlugsQuery);
        console.log("Fetched slugs:", slugs); // Log the fetched slugs
        if (!slugs || slugs.length === 0) {
            console.error("No slugs found in Sanity");
            return []; // Return empty array if no slugs
        }

        const params = slugs.map((slugData: any) => {
            console.log("Current Slug object: ", slugData);
            return { slug: slugData?.slug?.current };
        });
        console.log("Generated Params:", params)
        return params;
    } catch (error) {
        console.error("Error fetching slugs:", error);
        return []; // Return empty array on error
    }
}

export default async function BlogPage({ params }: Props) {
    const { slug } = params;

    try {
        const post = await client.fetch(query, { slug });
        if (!post) {
            console.error("Post not found for slug:", slug);
            return notFound();
        }

        return (
            <article className="max-w-2xl mx-auto py-12">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                {post.coverImage && (
                    <img
                        src={urlFor(post.coverImage).width(800).height(400).url()}
                        alt={post.title}
                        className="rounded-md w-full h-[400px] object-cover mb-8"
                    />
                )}
                <div className="text-gray-600 dark:text-gray-400 mb-4">
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                    <PortableText value={post.content} components={components} />
                </div>
            </article>
        );

    } catch (error) {
        console.error("Error fetching post:", error)
        return notFound();
    }
}