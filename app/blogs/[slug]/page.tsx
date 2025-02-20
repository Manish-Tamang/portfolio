import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';
import Container from '@/components/Container';
import { postQuery } from '@/lib/queries';
import { MDXRemote } from 'next-mdx-remote/rsc';
import components from '@/components/MDXComponent';
import { Post } from '@/lib/types';
import { notFound } from 'next/navigation';
import { compile } from '@mdx-js/mdx'

interface Props {
    params: Promise<{ slug: string }> | { slug: string };
}

async function getMdxSource(content: string) {
    try {
        
        const compiledMdx = await compile(content, {
            outputFormat: 'function-body',
            development: process.env.NODE_ENV === 'development',
        });


        return content; 
    } catch (error) {

        return ''; 
    }
}

export default async function BlogPostPage({ params }: Props) {
    const resolvedParams = await Promise.resolve(params);
    const { slug } = resolvedParams;

    const post: Post = await client.fetch(postQuery, { slug });

    if (!post) {
        notFound()
    }

    const mdxContent = await getMdxSource(post.content);

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
                <div className="prose dark:prose-dark max-w-none">
                    {}
                    <div style={{ display: 'none' }}>
                        Raw content: {JSON.stringify(post.content).slice(0, 100)}...
                    </div>

                    <MDXRemote
                        source={mdxContent}
                        components={components}
                    />
                </div>
            </article>
        </Container>
    );
}