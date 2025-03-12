import Comments from '@/components/Comments';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function BlogPostLayout({ children }: Props) {
  return (
    <section className="container mx-auto">
      {children}
      <Comments />
    </section>
  );
}