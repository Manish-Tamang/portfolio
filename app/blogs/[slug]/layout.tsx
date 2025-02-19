import React, { PropsWithChildren, Suspense } from 'react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Post } from '@/lib/types';




interface BlogLayoutProps extends PropsWithChildren<{ post: Post }> { }

export default function BlogLayout({ children, post }: BlogLayoutProps) {

    return (
<main
        id="skip"
        className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
      >
        <article className="flex flex-col items-start justify-center w-full max-w-[45rem] mx-auto mb-16">

            <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">

            </div>


            <Suspense fallback={null}>
                <div className="w-full mt-4 prose dark:prose-dark max-w-none">
                    {children}
                </div>

                <div className="mt-8 w-full flex justify-center">

                </div>
                <div className="mt-8 w-full">

                </div>
            </Suspense>
        </article>
        </main>
    );
}