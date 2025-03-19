import { client } from "@/sanity/lib/client";

const generateSitemap = async () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.manishtamang.com";

  const posts = await client.fetch(`
        *[_type == "post"] {
            _updatedAt,
            slug {
                current
            }
        }
    `);

  const projects = await client.fetch(`
        *[_type == "project"] {
            _updatedAt,
            slug {
                current
            }
        }
    `);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${baseUrl}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
            </url>
            <url>
                <loc>${baseUrl}/about</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
            </url>
            <url>
                <loc>${baseUrl}/blog</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>${baseUrl}/projects</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>${baseUrl}/photos</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
            <url>
                <loc>${baseUrl}/guestbook</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.5</priority>
            </url>
            <url>
                <loc>${baseUrl}/uses</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.5</priority>
            </url>
            <url>
                <loc>${baseUrl}/colophon</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>yearly</changefreq>
                <priority>0.3</priority>
            </url>
            <url>
                <loc>${baseUrl}/contact</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>yearly</changefreq>
                <priority>0.3</priority>
            </url>
            ${posts
              .map(
                (post: { _updatedAt: string; slug: { current: string } }) => `
                    <url>
                        <loc>${baseUrl}/blog/${post.slug.current}</loc>
                        <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>0.7</priority>
                    </url>
                `
              )
              .join("")}
            ${projects
              .map(
                (project: {
                  _updatedAt: string;
                  slug: { current: string };
                }) => `
                    <url>
                        <loc>${baseUrl}/projects/${project.slug.current}</loc>
                        <lastmod>${new Date(project._updatedAt).toISOString()}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>0.7</priority>
                    </url>
                `
              )
              .join("")}
        </urlset>`;

  return sitemap;
};

export async function GET() {
  const sitemap = await generateSitemap();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
