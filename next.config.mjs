import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";
import createMDX from "@next/mdx";

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: { code: "Code" },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: { esmExternals: true },
  transpilePackages: ["codehike"],
  typescript: {
    ignoreBuildErrors: true, 
  },
};

export default withMDX(nextConfig);
