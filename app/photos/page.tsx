"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { BlurImage } from "@/components/BlurImage";
import Image from "next/image";
import { images } from "@/data/images";

interface ImageType {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  gridArea: string;
}

export default function PhotoGallery() {
  const [zoomedImage, setZoomedImage] = useState<ImageType | null>(null);

  const handleImageClick = (image: ImageType) => {
    setZoomedImage(image);
    document.body.style.overflow = "hidden";
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
    document.body.style.overflow = "";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-peachi font-bold text-left">
          Photo Gallery
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          A collection of random images from my gallery.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-[200px]">
        {images.map((image: ImageType) => (
          <div
            key={image.id}
            className={`relative overflow-hidden rounded-[4px] transition-transform duration-300 hover:scale-[1.02] cursor-pointer ${image.gridArea === "span 2 / span 2"
                ? "col-span-2 row-span-2"
                : image.gridArea === "span 1 / span 2"
                  ? "col-span-2"
                  : image.gridArea === "span 2 / span 1"
                    ? "row-span-2"
                    : ""
              }`}
            onClick={() => handleImageClick(image)}
          >
            <BlurImage
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

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
        This page is inspired by{" "}
        <a href="https://ouassim.tech/lens/" className="underline">
          Ouassim
        </a>
        .
      </p>
      <p className="text-xl text-gray-500 dark:text-gray-400 mt-8"
      >
        Last Update: <span className="font-bold">17 October 2025</span>
      </p>

      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <button
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
              onClick={handleCloseZoom}
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={zoomedImage.src}
                alt={zoomedImage.alt}
                width={zoomedImage.width}
                height={zoomedImage.height}
                className="object-contain max-h-[90vh] mx-auto"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
