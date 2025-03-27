"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

const initialImages = [
    {
        id: 1,
        src: "/polaroid/1.jpeg",
        alt: "Gallery Image 1",
        width: 800,
        height: 600,
        gridArea: "span 1 / span 1",
    },
    {
        id: 2,
        src: "/img/ktaharu.jpg",
        alt: "Gallery Image 2",
        width: 600,
        height: 800,
        gridArea: "span 1 / span 2",
    },
    {
        id: 3,
        src: "/profile.png",
        alt: "Gallery Image 3",
        width: 1200,
        height: 600,
        gridArea: "span 1 / span 1",
    },
    {
        id: 4,
        src: "/img/IMG-20250322-WA0081.jpg",
        alt: "Gallery Image 4",
        width: 800,
        height: 800,
        gridArea: "span 2 / span 2",
    },
    {
        id: 5,
        src: "/img/IMG_20250226_194104.jpg",
        alt: "Gallery Image 5",
        width: 600,
        height: 600,
        gridArea: "span 1 / span 2",
    },
    {
        id: 6,
        src: "/img/classx.jpeg",
        alt: "Gallery Image 6",
        width: 600,
        height: 400,
        gridArea: "span 1 / span 2",
    },
    {
        id: 7,
        src: "/img/IMG-20241228-WA0053.jpg",
        alt: "Gallery Image 7",
        width: 1200,
        height: 800,
        gridArea: "span 2 / span 2",
    },
    {
        id: 8,
        src: "/img/IMG-20241219-WA0000.jpg",
        alt: "Gallery Image 8",
        width: 400,
        height: 600,
        gridArea: "span 1 / span 2",
    },
    {
        id: 9,
        src: "/img/IMG-20241228-WA0224.jpg",
        alt: "Gallery Image 9",
        width: 800,
        height: 400,
        gridArea: "span 1 / span 1",
    },
    {
        id: 10,
        src: "/img/IMG_20231003_205151_626 (1).jpg",
        alt: "Gallery Image 10",
        width: 800,
        height: 400,
        gridArea: "span 1 / span 1",
    },
    {
        id: 11,
        src: "/img/manish-junior.jpg",
        alt: "Gallery Image 1",
        width: 800,
        height: 600,
        gridArea: "span 1 / span 1",
    },
    {
        id: 12,
        src: "/img/received_624136276549992_053056.jpg",
        alt: "Gallery Image 2",
        width: 600,
        height: 800,
        gridArea: "span 1 / span 2",
    },
    {
        id: 13,
        src: "/img/haseko.jpg",
        alt: "Gallery Image 1",
        width: 800,
        height: 600,
        gridArea: "span 1 / span 1",
    },
    {
        id: 14,
        src: "/img/ashik.jpg",
        alt: "Gallery Image 1",
        width: 800,
        height: 600,
        gridArea: "span 1 / span 2",
    },
    {
        id: 15,
        src: "/img/sandesh-sanga.jpg",
        alt: "Gallery Image 1",
        width: 800,
        height: 600,
        gridArea: "span 1 / span 2",
    },
    {
        id: 16,
        src: "/img/IMG-20250308-WA0021.jpg",
        alt: "Gallery Image 1",
        width: 800,
        height: 600,
        gridArea: "span 2 / span 2",
    },
]

interface ImageType {
    id: number
    src: string
    alt: string
    width: number
    height: number
    gridArea: string
}

const IMAGES_PER_LOAD = 10;

export default function PhotoGallery() {
    const [images, setImages] = useState<ImageType[]>([])
    const [loading, setLoading] = useState(true)
    const [allLoaded, setAllLoaded] = useState(false)
    const [displayedImages, setDisplayedImages] = useState<ImageType[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setImages(initialImages);
            setDisplayedImages(initialImages.slice(0, IMAGES_PER_LOAD)); 
            setLoading(false);
            if (initialImages.length <= IMAGES_PER_LOAD) {
                setAllLoaded(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const loadMoreImages = () => {
        setLoading(true);
        setTimeout(() => {
            const nextImages = initialImages.slice(displayedImages.length, displayedImages.length + IMAGES_PER_LOAD);
            setDisplayedImages((prevImages) => [...prevImages, ...nextImages]);

            if (displayedImages.length + nextImages.length >= initialImages.length) {
                setAllLoaded(true);
            }

            setLoading(false);
        }, 1000);
    };



    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-peachi font-bold text-left">Photo Gallery</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    A collection of random images from my gallery.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                {loading && displayedImages.length === 0
                    ? Array.from({ length: IMAGES_PER_LOAD }).map((_, index) => (
                        <Skeleton
                            key={`skeleton-${index}`}
                            className={`rounded-[4px] ${index % 5 === 0 ? "col-span-2 row-span-2" : index % 3 === 0 ? "col-span-2" : index % 2 === 0 ? "row-span-2" : ""}`}
                        />
                    ))
                    : displayedImages.map((image) => (
                        <div
                            key={image.id}
                            className={`relative overflow-hidden rounded-[4px] transition-transform duration-300 hover:scale-[1.02] ${image.gridArea === "span 2 / span 2"
                                ? "col-span-2 row-span-2"
                                : image.gridArea === "span 1 / span 2"
                                    ? "col-span-2"
                                    : image.gridArea === "span 2 / span 1"
                                        ? "row-span-2"
                                        : ""}`}
                        >
                            <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                        </div>
                    ))}
            </div>

            {!allLoaded && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={loadMoreImages}
                        disabled={loading}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
                    >
                        {loading ? "Loading..." : "Load More Images"}
                    </button>
                </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                This page is inspired by <a href="https://ouassim.tech/lens/" className="underline">Ouassim</a>.
            </p>
        </div>
    )
}