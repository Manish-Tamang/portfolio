// app/blogs/[slug]/page.tsx
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { postQuery } from '@/lib/queries';
import MDXContent from '@/components/mdx/MDXcontent';

interface BlogPostProps {
  params: { slug: string };
}

export default async function BlogPost({ params }: BlogPostProps) {
  // Correctly extract the slug
  const slug = params.slug;
  
  // Use the slug directly in the fetch
  const post = await client.fetch(postQuery, { slug });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      {post.coverImage && (
        <img
          src={urlFor(post.coverImage).url()}
          alt={post.title}
          className="w-full h-auto mb-4 rounded-md"
        />
      )}

      <div className="prose dark:prose-invert max-w-none">
        <MDXContent content={post.content} />
      </div>
    </article>
  );
}