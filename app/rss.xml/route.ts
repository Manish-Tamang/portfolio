import { client } from "@/sanity/lib/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://manishtamang.com";

type SanityPost = {
  title: string;
  slug?: { current?: string } | string;
  content?: string; // markdown/mdx from Sanity
  excerpt?: string;
  date?: string;
};

const groqQuery = `*[_type == "post"] | order(date desc)[0...50] {
  title,
  slug,
  content,
  excerpt,
  date
}`;

function stripMarkdown(markdown: string): string {
  if (!markdown) return "";
  let text = markdown;
  // Remove code blocks and inline code
  text = text.replace(/```[\s\S]*?```/g, " ").replace(/`([^`]+)`/g, "$1");
  // Remove images and links, keep alt/text
  text = text.replace(/!\[[^\]]*\]\([^\)]*\)/g, " ");
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  // Headings, emphasis, blockquotes, lists
  text = text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[>*_~`#]/g, "")
    .replace(/^\s*[-+*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "");
  // HTML tags
  text = text.replace(/<[^>]+>/g, " ");
  // Collapse whitespace
  return text.replace(/\s+/g, " ").trim();
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(date?: string): string {
  try {
    return new Date(date || Date.now()).toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

export async function GET() {
  const posts: SanityPost[] = await client.fetch(groqQuery);

  const itemsXml = posts
    .filter((p) => p?.slug)
    .map((post) => {
      const slug = typeof post.slug === "string" ? post.slug : post.slug?.current || "";
      const link = `${siteUrl}/blog/${slug}`;
      const title = xmlEscape(post.title || "Untitled");
      const descriptionSource = post.excerpt || post.content || "";
      const description = xmlEscape(stripMarkdown(descriptionSource).slice(0, 500));
      const pubDate = toRfc822(post.date);
      return `
        <item>
          <title>${title}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${pubDate}</pubDate>
          <description>${description}</description>
        </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:blogChannel="https://manishtamang.com/blog">
  <channel>
    <title>Manish Tamang — Blog</title>
    <link>${siteUrl}</link>
    <description>Latest posts from Manish Tamang</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  });
}


