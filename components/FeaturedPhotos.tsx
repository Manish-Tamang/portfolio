'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';


interface Photo {
    id: number;
    src: string;
    alt: string;
}

const initialPhotos: Photo[] = [
    {
        id: 7,
        src: "/img/IMG-20241228-WA0053.jpg",
        alt: "Gallery Image 7",

    },
    {
        id: 8,
        src: "/img/IMG-20250308-WA0021.jpg",
        alt: "Gallery Image 8",

    },
    {
        id: 9,
        src: "/img/IMG-20250322-WA0081.jpg",
        alt: "Gallery Image 9",

    },
];

const PhotoSkeleton = () => (
    <div className="flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700 aspect-square">
        <Skeleton className="w-full h-full" />
    </div>
);

export default function FeaturedPhotos() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setLoading(false);
        setPhotos(initialPhotos);
    }, []);

    if (loading) {
        return (
            <section className="py-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-bold text-xl mb-4 font-peachi">
                        Photos
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        If you're wondering what I look like in real life, here are some of my photos. I don’t usually take pictures, but here are a few!
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        <PhotoSkeleton />
                        <PhotoSkeleton />
                        <PhotoSkeleton />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8">
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-bold text-xl mb-4 font-peachi">
                    Photos
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    If you're wondering what I look like in real life, here are some of my photos. I don’t usually take pictures, but here are a few!
                </p>
                <div className="grid grid-cols-3 gap-4">
                    {photos.map((photo) => (
                        <div key={photo.id} className="relative aspect-[3/4] overflow-hidden rounded-[4px]">
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    ))}
                </div>
                <Link href="/photos">
                    <Button
                        className={`cursor-pointer transition-all bg-[#38A662] text-white px-4 py-2 rounded-[4px] 
                                         border-[#2D8A4D] border-b-[4px] hover:bg-[#3EBF70] hover:-translate-y-[1px] 
                                       hover:border-b-[6px] active:border-b-[2px] active:bg-[#2D8A4D] active:translate-y-[2px]
                                             flex items-center justify-center dark:bg-[#38A662] dark:border-[#2D8A4D] dark:text-white
                                            dark:hover:bg-[#3EBF70] dark:active:bg-[#2D8A4D]
                                             w-full h-10 mt-6 
                                          sm:w-auto`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        See All
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 ml-1 transition-transform duration-200 ${isHovered ? 'transform translate-x-1' : ''}`}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Button>
                </Link>
            </div>
        </section>
    );
}