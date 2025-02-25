const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: async () => {
      const remarkGfm = (await import("remark-gfm")).default;
      const remarkHtml = (await import("remark-html")).default;
      const remarkSugarHigh = (await import("remark-sugar-high")).default;

      return [remarkGfm, remarkHtml, remarkSugarHigh];
    },
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

module.exports = withMDX(nextConfig);