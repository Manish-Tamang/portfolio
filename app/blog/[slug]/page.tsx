// /app/blogs/[slug]/page.tsx

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import Image from 'next/image';
import CarbonAds from '@/components/carbonAds';
import { Metadata } from 'next';

export interface FullBlog {
  currentSlug: string;
  title: string;
  content: string;
  coverImage?: any;
  date: string;
}

const estimateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
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

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const post = await getBlogPostContent(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: `Read more about ${post.title} on Manish Tamang's blog.`,
  };
}

async function registerView(slug: string) {
  try {
    const response = await fetch(`/api/views/${slug}`, { method: 'POST' });
    if (!response.ok) {
      console.error("Failed to register view", response);
    }
  } catch (error) {
    console.error("Error registering view:", error);
  }
}

async function getViews(slug: string): Promise<number> {
  try {
    const response = await fetch(`/api/views/${slug}`);
    if (!response.ok) {
      console.error("Failed to get views", response);
      return 0;
    }
    const data = await response.json();
    return data.views || 0;
  } catch (error) {
    console.error("Error getting views:", error);
    return 0;
  }
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params;
  const { slug } = params;
  const post = await getBlogPostContent(slug);

  if (!post) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Post not found or error loading.
      </div>
    );
  }

  // Register view and get view count
  await registerView(slug);
  const views = await getViews(slug);

  const formattedDate = formatDate(post.date);
  const readingTime = estimateReadingTime(post.content);

  return (
    <article className="container mx-auto py-12 px-6 max-w-3xl">
      <h1 className="text-4xl font-bold mb-2 font-peachi">{post.title}</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/profile.png"
            alt="Manish Tamang"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-gray-500 text-sm">Manish Tamang</span>
        </div>
        <span className="text-gray-500 text-sm">
          {formattedDate} - {readingTime} min read - Views: {views}
        </span>
      </div>
      <hr className="mb-8 border-gray-200 dark:border-gray-700" />
      {/* Uncomment and adjust if you want to include the cover image */}
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
        <CarbonAds className="fixed bottom-4 left-20 w-1/4" />
        <MDXComponents content={post.content} />
      </div>
    </article>
  );
}