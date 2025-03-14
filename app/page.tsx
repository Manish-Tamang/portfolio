"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TechStacks from "@/components/TechStacks";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import FeaturedProjects from "@/components/FeaturedProject";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import FeaturedPhotos from "@/components/FeaturedPhotos";

const HomeScene = dynamic(() => import("@/components/3d-scene"), {
  ssr: false,
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4">
      <section className="mb-4 pt-20">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            {isMobile ? (
              <h1 className="text-4xl md:text-6xl lg:text-5xl font-ridemybike flex items-center flex-wrap gap-2">
                Hi, I'm
                <div className="inline-flex items-center">
                  <div className="flip-container inline-block" style={{ width: '50px', height: '50px' }}>
                    <div className="flip-card" style={{ width: '50px', height: '50px' }}>
                      <div className="flip-card-front">
                        <Image
                          alt="Profile Image"
                          src="/profile.png"
                          width={50}
                          height={50}
                          priority
                          className="rounded-full"
                        />
                      </div>
                      <div className="flip-card-back">
                        <Image
                          alt="Back Image"
                          src="/chill-guy.png"
                          width={50}
                          height={50}
                          priority
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="font-medium">Manish Tamang</span>,
                <span className="block">
                  developer & creator
                </span>
                <span className="">
                  at Swikar Codes.
                </span>
              </h1>
            ) : (
              <h1 className="text-4xl md:text-6xl lg:text-5xl font-peachi flex items-center flex-wrap gap-2">
                Hi, I'm
                <div className="inline-flex items-center">
                  <div className="flip-container inline-block" style={{ width: '50px', height: '50px' }}>
                    <div className="flip-card" style={{ width: '50px', height: '50px' }}>
                      <div className="flip-card-front">
                        <Image
                          alt="Profile Image"
                          src="/profile.png"
                          width={50}
                          height={50}
                          priority
                          className="rounded-full"
                        />
                      </div>
                      <div className="flip-card-back">
                        <Image
                          alt="Back Image"
                          src="/chill-guy.png"
                          width={50}
                          height={50}
                          priority
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="font-medium">Manish Tamang</span>,
                <span className="block">
                  developer & creator
                </span>
                <span className="">
                  at Swikar Codes.
                </span>
              </h1>
            )}
            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl">
              A wizard who loves development and code. I tell stories through my projects
              and applications. I spend most of my time crafting web experiences
              and creating useful tools.
            </p>
          </div>
        </div>
        <TechStacks />
      </section>
      <section className="mb-16">
        <h2 className="text-2xl font-peachi font-medium mb-1">Work</h2>
        <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed max-w-3xl">
          I focus on building fast, future-proof solutions that thrive at the intersection of speed and precision.
          Every line of code I write balances rapid execution with meticulous structure, ensuring scalability and
          maintainability. To me, great development means shipping efficiently and leaving a foundation that lasts.
        </p>
        <div>
          <Link
            href="https://staging.swikarcodes.com"
            className="group flex items-center gap-2 text-xl font-medium underline mb-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Swikar Codes
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          <p className="text-gray-700 dark:text-gray-300">Full Stack Developer</p>
          <p className="text-gray-600 dark:text-gray-400">Aug. 2024 - current</p>
        </div>
        <div className="mt-4">
          <Link
            href="https://github.com/Manish-Tamang/opera-surgical-centre"
            className="group flex items-center gap-2 text-xl font-medium underline mb-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freelancing
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          <p className="text-gray-700 dark:text-gray-300">Full Stack Developer</p>
          <p className="text-gray-600 dark:text-gray-400">Aug. 2024 - current</p>
        </div>
        <FeaturedProjects />
        <FeaturedBlogs />
        <FeaturedPhotos />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div></div>
          <div>
            <HomeScene />
          </div>
        </div> */}
      </section>
    </main>
  );
}
