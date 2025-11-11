"use client";
import Image from "next/image";
import TechStacks from "@/components/TechStacks";
import FeaturedProjects from "@/components/FeaturedProject";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import FeaturedPhotos from "@/components/FeaturedPhotos";
import CarbonAds from "@/components/carbonAds";
import React from "react";
import { Polaroid } from "@/components/Polaroid";
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Timeline from "@/components/Timeline";
import Work from "@/components/Work";

export default function Home() {
  const redGradient =
    'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-transparent bg-clip-text';


  return (
    <main className="max-w-4xl mx-auto px-4">
      <section className="mb-4 pt-20">
        <div className="flex flex-col-reverse sm:flex-row items-start mb-4">
          <div className="flex flex-col basis-2/3 justify-start pr-8">
            <h1 className="font-peachi text-3xl md:text-5xl tracking-tight text-black dark:text-white">
              <span className="relative inline-block group overflow-hidden">
                <span
                  className={clsx(
                    redGradient,
                    'block transform transition-transform duration-500 group-hover:translate-y-full'
                  )}
                >
                  Hi, I&apos;m Manish
                </span>
                <span
                  className={clsx(
                    redGradient,
                    'absolute text-[#1D4ED8] inset-0 block transform translate-y-full transition-transform duration-500 group-hover:translate-y-0'
                  )}
                >
                  Gole Tamang
                </span>
              </span>
            </h1>

            <h2 className="text-gray-700 dark:text-gray-200 mb-2">
              <span className="relative inline-block group overflow-hidden">
                <span
                  className={clsx(
                    'bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-green-500',
                    'after:bg-gradient-to-r block transform transition-transform duration-500 group-hover:translate-y-full'
                  )}
                >
                  Web developer{' '}
                </span>
                <span
                  className={clsx(
                    'bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-green-500',
                    'after:bg-gradient-to-r absolute inset-0 block transform translate-y-full transition-transform duration-500 group-hover:translate-y-0'
                  )}
                >
                  And a Student
                </span>
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              A wizard of code, weaving stories through projects and applications. I’m passionate about web development and an enthusiast for technology, constantly crafting web experiences and building tools that make an impact.
            </p>
          </div>
          <div className="flip-container flex basis-1/3 justify-end w-[120px] mb-8 sm:mb-0 mr-8">
            <motion.div
              animate={{ x: 100 }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
            <div className="flip-card">
              <div className="flip-card-front">
                <Image
                  alt="Profile Image"
                  src='/profile.png'
                  width={120}
                  height={120}
                  sizes="30vw"
                  priority
                  className="w-full h-full object-cover rounded-full"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              </div>
              <div className="flip-card-back">
                <Image
                  alt="Back Image"
                  src="/rickroll-roll.gif"
                  width={120}
                  height={120}
                  sizes="30vw"
                  priority
                  className="w-full h-full object-cover rounded-full"
                  draggable={false}
                  style={{ userSelect: "none" }}
                />
              </div>
            </div>
          </div>
        </div>

        <TechStacks />
      </section>
      <Work />
      <FeaturedProjects />
      <FeaturedBlogs />
      <FeaturedPhotos />
      <Timeline />
    </main>
  );
}