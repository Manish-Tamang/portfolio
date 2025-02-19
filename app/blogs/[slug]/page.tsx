import { MDXRemote } from 'next-mdx-remote/rsc';
import { client } from '@/sanity/lib/client';
import { postQuery } from '@/lib/queries';
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

    // Serialize the MDX content with options
    const mdxSource = await serialize(post.content, {
        components,
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <article className="prose dark:prose-invert mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
                {post.mainImage && (
                    <img
                        src={post.mainImage}
                        alt={post.title}
                        className="w-full h-auto object-cover rounded-lg mb-8"
                    />
                )}
                <div className="mdx-content">
                    <MDXRemote source={mdxSource} components={components} />
                </div>
            </article>
        </div>
    );
}
