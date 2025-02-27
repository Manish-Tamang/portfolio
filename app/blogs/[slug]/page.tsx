import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import Image from 'next/image';
import CarbonAds from '@/components/carbonAds';

export interface FullBlog {
  currentSlug: string;
  title: string;
  content: string;
  coverImage?: any;
  date: string;
}

async function getBlogPostContent(slug: string): Promise<FullBlog | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "currentSlug": slug.current,
    title,
    date,
    coverImage,
    content
  }`;

  try {
    const post = await client.fetch(query, { slug });
    return post || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await getBlogPostContent(slug);

  if (!post) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Post not found or error loading.
      </div>
    );
  }

  return (
    <article className="container mx-auto py-12 px-6 max-w-3xl">
      <h1 className="text-4xl font-bold mb-2 font-peachi">{post.title}</h1>
      <span className="block text-gray-500 text-sm mb-6">{post.date}</span>
      {/* {post.coverImage && (
        <Image
        width={100}
        height={100}
          src={urlFor(post.coverImage).url()}
          alt={post.title}
          className="w-full h-auto mb-6 rounded-[8px]"
        />
      )} */}
      <div className="prose dark:prose-invert max-w-none leading-relaxed font-geist">
        <CarbonAds className="fixed bottom-4 right-4 w-1/4" />
        <MDXComponents content={post.content} />
      </div>
    </article>
  );
}
