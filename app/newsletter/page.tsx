'use client';

import React, { useState, useEffect } from "react";
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { BlurFadeImage } from '@/components/BlurFade';
import Image from 'next/image';

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setBlogsLoading(true);
      try {
        const data = await client.fetch(`*[_type == "post"] | order(date desc)[0...4]{ title, slug, excerpt, date, coverImage }`);
        setBlogs(data);
      } catch {
        setBlogs([]);
      } finally {
        setBlogsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        toast({ title: 'Thank you for subscribing!', description: 'You will receive weekly updates.' });
      } else {
        setStatus("error");
        toast({ title: 'Subscription failed', description: 'Please try again later.' });
      }
    } catch {
      setStatus("error");
      toast({ title: 'Subscription failed', description: 'Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-12">
      <div className="w-full max-w-md md:max-w-2xl">
        <div className="flex flex-col md:flex-row bg-white dark:bg-neutral-800 rounded-[4px] mb-10 shadow-md overflow-hidden">
          {/* Form section */}
          <div className="flex-1 p-6 flex flex-col gap-5 justify-center">
            <h1 className="text-3xl font-bold mb-2 text-[#3EB76C]">Subscribe to the Newsletter</h1>
            <p className="mb-6 text-gray-700 dark:text-gray-300">Get the latest hot tech topics, coding tips, and project updates delivered to your inbox every week. No spam, just value.</p>
            <form className="flex flex-col items-start gap-5" onSubmit={handleSubmit}>
              <div className="flex items-center justify-center w-14 h-14 bg-[#ECF1FD] rounded-[4px] mb-2">
                {/* SVG icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" height="34" width="34">
                  <path strokeLinejoin="round" strokeWidth="2.5" stroke="#3EB76C" d="M7.08385 9.91666L5.3572 11.0677C4.11945 11.8929 3.50056 12.3055 3.16517 12.9347C2.82977 13.564 2.83226 14.3035 2.83722 15.7825C2.84322 17.5631 2.85976 19.3774 2.90559 21.2133C3.01431 25.569 3.06868 27.7468 4.67008 29.3482C6.27148 30.9498 8.47873 31.0049 12.8932 31.1152C15.6396 31.1838 18.3616 31.1838 21.1078 31.1152C25.5224 31.0049 27.7296 30.9498 29.331 29.3482C30.9324 27.7468 30.9868 25.569 31.0954 21.2133C31.1413 19.3774 31.1578 17.5631 31.1639 15.7825C31.1688 14.3035 31.1712 13.564 30.8359 12.9347C30.5004 12.3055 29.8816 11.8929 28.6437 11.0677L26.9171 9.91666"></path>
                  <path strokeLinejoin="round" strokeWidth="2.5" stroke="#3EB76C" d="M2.83331 14.1667L12.6268 20.0427C14.7574 21.3211 15.8227 21.9603 17 21.9603C18.1772 21.9603 19.2426 21.3211 21.3732 20.0427L31.1666 14.1667"></path>
                  <path strokeWidth="2.5" stroke="#3EB76C" d="M7.08331 17V8.50001C7.08331 5.82872 7.08331 4.49307 7.91318 3.66321C8.74304 2.83334 10.0787 2.83334 12.75 2.83334H21.25C23.9212 2.83334 25.2569 2.83334 26.0868 3.66321C26.9166 4.49307 26.9166 5.82872 26.9166 8.50001V17"></path>
                  <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#3EB76C" d="M14.1667 14.1667H19.8334M14.1667 8.5H19.8334"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-lg text-[#2B2B2F] dark:text-white">Subscribe for updates</label>
                <span className="font-semibold text-sm text-[#5F5D6B] dark:text-neutral-300">Subscribe to this weekly newsletter so you don’t miss out on the new hot tech topics.</span>
              </div>
              <input
                placeholder="Enter your e-mail"
                title="Enter your e-mail"
                name="email"
                type="email"
                className="w-full h-10 px-3 rounded-[4px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3EB76C] transition"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer transition-all bg-[#3EB76C] text-white px-6 py-2 rounded-[4px] border-[#2D8A4D] w-full border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
          {/* Cat image section */}
          <div className="hidden md:flex flex-col items-center justify-center gap-4 p-6 bg-[#F8FAFB] dark:bg-neutral-900">
            <Image
              src="/img/cat.jpg"
              alt="Cat"
              width={180}
              height={180}
              className="rounded-[4px] object-cover"
              draggable={false}
                  style={{ userSelect: "none" }}
              priority
            />
            <Image
              src="/img/cat2.jpg"
              alt="Cat 2"
              width={180}
              height={180}
              className="rounded-[4px] object-cover"
              draggable={false}
                  style={{ userSelect: "none" }}
            />
          </div>
        </div>
      </div>
      {/* Blog cards section */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4 text-[#3EB76C]">Latest from the Blog</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Check out some of my recent posts while you wait for the next newsletter!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-[4px] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 h-64 animate-pulse" />
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog, i) => (
              <Link
                key={blog.slug.current || blog.slug}
                href={`/blog/${blog.slug.current || blog.slug}`}
                className="rounded-[4px] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 flex flex-col hover:border-[#3EB76C] transition-colors duration-200 group overflow-hidden"
              >
                {blog.coverImage && (
                  <div className="relative w-full h-32 mb-4 flex-shrink-0">
                    <BlurFadeImage
                      src={urlFor(blog.coverImage).width(400).height(200).url()}
                      alt={blog.title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full block"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col p-4">
                  <h3 className="text-lg font-semibold mt-2 mb-1 group-hover:text-[#3EB76C] transition-colors">{blog.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{blog.excerpt?.slice(0, 100)}{blog.excerpt && blog.excerpt.length > 100 ? '...' : ''}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 col-span-2">No recent blog posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
} 