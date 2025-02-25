import 'server-only';

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';
import Container from '@/components/Container';
import { postQuery } from '@/lib/queries';
import { MDXRemote } from 'next-mdx-remote';
import components from '@/components/MDXComponent';
import { Post } from '@/lib/types';
import { notFound } from 'next/navigation';
import PostLayout from '@/components/PostLayout';

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  const post: Post = await client.fetch(postQuery, { slug });

  if (!post) {
    notFound();
  }

  const mdxContent = post.content;

  return (
    <Container>
      <PostLayout mdxSource={mdxContent} components={components}>
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
      </PostLayout>
    </Container>
  );
}