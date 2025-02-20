import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';
import Container from '@/components/Container';
import { postQuery, postSlugsQuery } from '@/lib/queries';
import { serialize } from 'next-mdx-remote/serialize';
import { remarkCodeHike } from '@code-hike/mdx';
import '@code-hike/mdx/styles.css';
import { MDXRemote } from 'next-mdx-remote';
import components from '@/components/MDXComponent';
import { Post } from '@/lib/types';

interface Props {
    params: { slug: string };
}

async function getMdxSource(content: string) {
    return await serialize(content || '', {
        mdxOptions: {
            remarkPlugins: [[remarkCodeHike, { theme: "github-dark-dimmed", showCopyButton: true }]],
            useDynamicImport: true,
        },
    });
}

interface BlogPostProps {
    title: string;
    content: string;
    date: string;
    coverImage: any;
}

export default function BlogPostPage({ post }: { post: Post }) {
    const { slug } = params;
    const post: BlogPostProps = await client.fetch(postQuery, { slug });

    if (!post) {
        return (
            <Container>
                <div>Post not found</div>
            </Container>
        );
    }


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
                <MDXRemote
                    compiledSource={post.content}
                    components={{
                        ...components
                    } as any} scope={undefined} frontmatter={undefined} />
            </article>
        </Container>
    );
}

export async function getStaticPaths() {
    const paths = await client.fetch(postSlugsQuery);
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params, preview = false }) {
    const { post } = await getClient(preview).fetch(postQuery, {
        slug: params.slug
    });

    if (!post) {
        return { notFound: true };
    }

    const { html, readingTime } = await mdxToHtml(post.content);

    return {
        props: {
            post: {
                ...post,
                content: html,
                readingTime
            }
        },
        revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60
    };
}