"use client";
import Container from "@/components/Container";
import ImageWithTheme from "@/components/ImageWithTheme";
import Link from "next/link";

export default function BlogNotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-screen">
        <ImageWithTheme
          alt="404 Page Not Found"
          light="/img/light-404.png"
          dark="/img/dark-404.png"
          width={400}
          height={600}
          style={{ userSelect: "none" }}
          draggable={false}
          priority
        />
        <h1 className="text-4xl font-bold mb-4 font-peachi">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The blog you are looking for does not exist.
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-center max-w-md">
          It may have been removed, renamed, or the URL might be incorrect. Please check the address or return to the homepage to explore other blogs.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#38A662] text-white rounded-[4px] hover:bg-[#2c8a4f] transition-colors duration-300"
        >
          Go back home
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
          This illustration belongs to <a href="https://sanity.io" className="underline">Sanity</a>.
        </p>
      </div>
    </Container>
  );
} 