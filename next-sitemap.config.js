/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.manishtamang.com", 
  generateRobotsTxt: true, 
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "test-bot",
        allow: ["/colophon", "/contact"],
      },
      {
        userAgent: "baiduspider",
        disallow: ["/colophon", "/contact"],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/server-sitemap.xml`, 
    ],
  },
  exclude: ["/studio", "/studio/[[...index]]", "/api/*"],
};
