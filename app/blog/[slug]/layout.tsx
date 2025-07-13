import Comments from '@/components/Comments';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function BlogPostLayout({ children }: Props) {
  return (
    <section className="w-full max-w-full sm:max-w-2xl md:max-w-3xl mx-auto px-1 sm:px-2 md:px-6">
      {children}
      <Comments />
    </section>
  );
}