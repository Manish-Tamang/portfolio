import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { format } from 'date-fns';
import Container from '@/components/Container';
import { postQuery } from '@/lib/queries';
import { MDXRemote } from 'next-mdx-remote';
import components from '@/components/MDXComponent';
import { Post } from '@/lib/types';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  // Fetch the post from Sanity using the slug
  const post: Post = await client.fetch(postQuery, { slug });

  // If post is not found, show a 404 page
  if (!post) {
    notFound();
  }

  // Get the MDX content, already pre-processed by Sanity
  const mdxContent = post.content;

  return (
    <Container>
      <article className="py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 dark:text-gray-400">
            Published on {format(new Date(post.date), 'MMMM d, yyyy')}
          </div>
        </header>

        {/* Display cover image if available */}
        {post.coverImage && (
          <img
            src={urlFor(post.coverImage).url()}
            alt={post.title}
            className="w-full h-auto rounded-lg mb-6"
          />
        )}

        {/* Render the MDX content using MDXRemote */}
        <div className="prose dark:prose-dark max-w-none">
          <MDXRemote
            source={mdxContent}
            components={components} // Use your custom MDX components
          />
        </div>
      </article>
    </Container>
  );
}
