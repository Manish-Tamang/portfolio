"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { BlurImage } from "@/components/BlurImage";
import Image from "next/image";

const images = [
  {
    id: 1,
    src: "/polaroid/1.jpeg",
    alt: "Manish in his childhood",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 2,
    src: "/img/ktaharu.jpg",
    alt: "Manish With his classmates",
    width: 600,
    height: 800,
    gridArea: "span 1 / span 2",
  },
  {
    id: 3,
    src: "/profile.png",
    alt: "Manish Profile Picture",
    width: 1200,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 4,
    src: "/img/IMG-20250322-WA0113.jpg",
    alt: "Manish Tamang near Gausala Itahari",
    width: 800,
    height: 800,
    gridArea: "span 2 / span 2",
  },
  {
    id: 5,
    src: "/img/IMG_20250226_194104.jpg",
    alt: "Manish and his mates atg Imohang house",
    width: 600,
    height: 600,
    gridArea: "span 1 / span 2",
  },
  {
    id: 6,
    src: "/img/classx.jpeg",
    alt: "Manish Tamang and his school mates, 2080 BS",
    width: 600,
    height: 400,
    gridArea: "span 1 / span 2",
  },
  {
    id: 7,
    src: "/img/IMG_20250712_132655.jpg",
    alt: "Gallery Image 10",
    width: 1200,
    height: 800,
    gridArea: "span 2 / span 2",
  },
  {
    id: 8,
    src: "/img/IMG-20250712-WA0078.jpg",
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
    src: "/img/IMG-20241228-WA0053.jpg",
    alt: "Manish and Abhiman",
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
    src: "/img/harisir-bd.jpg",
    alt: "Hari Sir Birthday 2080",
    width: 600,
    height: 800,
    gridArea: "span 1 / span 2",
  },
  {
    id: 13,
    src: "/img/IMG-20250308-WA0021.jpg",
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
    src: "/img/IMG-20250605-WA0021.jpg",
    alt: "Manish Tamang Playing Electric Guitar",
    width: 800,
    height: 600,
    gridArea: "span 2 / span 2",
  },
  {
    id: 17,
    src: "/img/IMG_20250712_130554.jpg",
    alt: "Manish and Ankit at Shiva Jatta",
    width: 800,
    height: 600,
    gridArea: "span 2 / span 2",
  },
  {
    id: 18,
    src: "/img/IMG-20250416-WA0010.jpg",
    alt: "Manish Tamang At Dharan",
    width: 800,
    height: 600,
    gridArea: "span 2 / span 2",
  },
  {
    id: 19,
    src: "/img/IMG-20250701-WA0009.jpg",
    alt: "Abhishek, Nishan, Manish and Sajak",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 2",
  },
  {
    id: 20,
    src: "/img/boquet.jpg",
    alt: "Boquet of Paper flowers",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 21,
    src: "/img/IMG-20240814-WA0005.jpg",
    alt: "Color painting during holi 2073",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 22,
    src: "/img/IMG_20250712_132655.jpg",
    alt: "Manish Tamang, Dharan",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 23,
    src: "/img/IMG_E1504.JPG",
    alt: "Manish Tamang, Vishwa Adarsha",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 24,
    src: "/img/hackathon/IMG_1473.JPG",
    alt: "Imohang, Nawaraj bhai, Manish, Bipan",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 2",
  },
  {
    id: 25,
    src: "/img/hackathon/IMG-20250827-WA0058.jpg",
    alt: "Planning during hackathon",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 26,
    src: "/img/hackathon/IMG-20250827-WA0077.jpg",
    alt: "Sharing ideas",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 27,
    src: "/img/hackathon/IMG-20250829-WA0016.jpg",
    alt: "Nux Bhai Showing Results to me",
    width: 800,
    height: 600,
    gridArea: "span 2 / span 2",
  },
  {
    id: 28,
    src: "/img/noah-standing-in-front-of-the-house-in-the-notebook-1-1024x576.jpg",
    alt: "Nux Bhai Showing Results to me",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 2",
  },
  {
    id: 29,
    src: "/img/photos/IMG_20250913_155053.jpg",
    alt: "Anish Bhai, Amit and Manish",
    width: 800,
    height: 600,
    gridArea: "span 2 / span 2",
  },
  {
    id: 30,
    src: "/img/photos/IMG_20250714_130748.jpg",
    alt: "Aaryan, Suman and Manish",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 31,
    src: "/img/photos/IMG_20250829_162530.jpg",
    alt: "Imo, Bipan, Nux Bhai and Manish",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
  {
    id: 32,
    src: "/img/photos/IMG_20250805_195407.jpg",
    alt: "Manish, Suman, Aaryan",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 2",
  },
  {
    id: 33,
    src: "/img/photos/daydream-brt.jpg",
    alt: "Nawaraj Bhai, Bipan, Manish",
    width: 800,
    height: 600,
    gridArea: "span 1 / span 1",
  },
];

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
        {images.map((image) => (
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
        Last Update: <span className="font-bold">1 October 2025</span>
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
