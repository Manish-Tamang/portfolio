import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { MDXComponents } from "@/components/mdx/MDXComponents";
import CarbonAds from "@/components/carbonAds";
import { Metadata } from "next";
import LikeButtons from "@/components/LikeButtons";
import ShareButton from "@/components/ShareButton";
import ViewCounter from "@/components/ViewCounter";

export interface FullBlog {
  currentSlug: string;
  title: string;
  content: string;
  coverImage?: any;
  date: string;
  excerpt: string;
}

const estimateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

async function getBlogPostContent(slug: string): Promise<FullBlog | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
 "currentSlug": slug.current,
 title,
 date,
 coverImage,
 content,
 excerpt
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
  params: { slug: string };
}): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const post = await getBlogPostContent(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description:
      post.excerpt ||
      `Read more about ${post.title} on Manish Tamang's blog.`,
    openGraph: {
      title: post.title,
      description:
        post.excerpt ||
        `Read more about ${post.title} on Manish Tamang's blog.`,
      images: post.coverImage
        ? [urlFor(post.coverImage).url()]
        : ["/profile.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        post.excerpt ||
        `Read more about ${post.title} on Manish Tamang's blog.`,
      images: post.coverImage
        ? [urlFor(post.coverImage).url()]
        : ["/profile.png"],
    },
  };
}

export default async function BlogPost(props: { params: { slug: string } }) {
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

  const formattedDate = formatDate(post.date);
  const readingTime = estimateReadingTime(post.content);

  return (
    <article className="container mx-auto py-12 px-6 max-w-3xl">
      <h1 className="text-4xl font-bold mb-2 font-peachi">{post.title}</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">
            {formattedDate} - {readingTime} min read
          </span>
          <span className="text-gray-400">•</span>
          <ViewCounter slug={post.currentSlug} />
        </div>
      </div>
      <hr className="mb-8 border-gray-200 dark:border-gray-700" />
      <div className="prose dark:prose-invert max-w-none leading-relaxed font-geist">
        <MDXComponents content={post.content} />
        <div className="flex border-t border-b mt-4 justify-center space-x-4">
          <ShareButton
            url={
              process.env.NEXT_PUBLIC_SITE_URL + `/blog/${post.currentSlug}`
            }
          />
          <LikeButtons slug={post.currentSlug} />
        </div>
      </div>
    </article>
  );
}