"use client";
import Link from 'next/link';
import Container from '@/components/Container';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const { theme } = useTheme();
    const [imageSource, setImageSource] = useState('/img/light-404.png');

    useEffect(() => {
        if (theme === 'dark') {
            setImageSource('/img/dark-404.png');
        } else {
            setImageSource('/img/light-404.png');
        }
    }, [theme]);

    return (
        <Container>
            <div className="flex flex-col items-center justify-center h-screen">
                <Image
                    src={imageSource}
                    alt="404 Page Not Found"
                    width={400}
                    height={600}
                    priority
                />
                <h1 className="text-4xl font-bold mb-4 font-peachi">Page Not Found</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    The page you are looking for does not exist.
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