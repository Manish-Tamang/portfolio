"use client";

import Comments from '@/components/Comments';
import React, { useState } from 'react';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

export default function BlogPostLayout({ children }: Props) {
  const [showNewsletter, setShowNewsletter] = useState(true);
  return (
    <section className="w-full max-w-full sm:max-w-2xl md:max-w-3xl mx-auto px-1 sm:px-2 md:px-6 relative">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {children}
          <Comments />
        </div>
      </div>
      {showNewsletter && (
        <div className="fixed bottom-4 right-20 w-80 max-w-xs z-40 hidden md:block">
          <div className="relative p-6 bg-[#ECF1FD] dark:bg-neutral-900 border border-[#3EB76C] rounded-[4px] flex flex-col items-center text-center gap-3 shadow-lg">
            <button
              aria-label="Close newsletter callout"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-[#3EB76C]"
              onClick={() => setShowNewsletter(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M14 6l-8 8" />
              </svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 34 34" height="48" width="48" className="mb-2">
              <path strokeLinejoin="round" strokeWidth="2.5" stroke="#3EB76C" d="M7.08385 9.91666L5.3572 11.0677C4.11945 11.8929 3.50056 12.3055 3.16517 12.9347C2.82977 13.564 2.83226 14.3035 2.83722 15.7825C2.84322 17.5631 2.85976 19.3774 2.90559 21.2133C3.01431 25.569 3.06868 27.7468 4.67008 29.3482C6.27148 30.9498 8.47873 31.0049 12.8932 31.1152C15.6396 31.1838 18.3616 31.1838 21.1078 31.1152C25.5224 31.0049 27.7296 30.9498 29.331 29.3482C30.9324 27.7468 30.9868 25.569 31.0954 21.2133C31.1413 19.3774 31.1578 17.5631 31.1639 15.7825C31.1688 14.3035 31.1712 13.564 30.8359 12.9347C30.5004 12.3055 29.8816 11.8929 28.6437 11.0677L26.9171 9.91666"></path>
              <path strokeLinejoin="round" strokeWidth="2.5" stroke="#3EB76C" d="M2.83331 14.1667L12.6268 20.0427C14.7574 21.3211 15.8227 21.9603 17 21.9603C18.1772 21.9603 19.2426 21.3211 21.3732 20.0427L31.1666 14.1667"></path>
              <path strokeWidth="2.5" stroke="#3EB76C" d="M7.08331 17V8.50001C7.08331 5.82872 7.08331 4.49307 7.91318 3.66321C8.74304 2.83334 10.0787 2.83334 12.75 2.83334H21.25C23.9212 2.83334 25.2569 2.83334 26.0868 3.66321C26.9166 4.49307 26.9166 5.82872 26.9166 8.50001V17"></path>
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#3EB76C" d="M14.1667 14.1667H19.8334M14.1667 8.5H19.8334"></path>
            </svg>
            <p className="font-semibold text-[#2B2B2F] dark:text-white">Don&apos;t miss out!</p>
            <p className="text-sm text-[#5F5D6B] dark:text-neutral-300">Subscribe to my newsletter for the latest tech topics, coding tips, and project updates delivered weekly.</p>
            <Link href="/newsletter" className="inline-block px-4 py-1 bg-[#3EB76C] text-white rounded-[4px] font-medium hover:bg-[#38A662] transition-colors mt-2">Subscribe Now</Link>
          </div>
        </div>
      )}
    </section>
  );
}