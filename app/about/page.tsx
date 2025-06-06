"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Education from "@/components/Education";
import Timeline from "@/components/Timeline";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { BiSolidQuoteRight } from "react-icons/bi";
import SocialLinks from "@/components/SocialLinks";

const About = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const schoolImages = [
    "/img/classx.jpeg",
    "/img/ktaharu.jpg",
    "/img/IMG-20241219-WA0000.jpg",
    "/img/ashik.jpg",
  ];

  return (
    <Container>
      <section className="py-12 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12">
          <div className="w-full">
            <h1 className="text-5xl font-ridemybike mb-6 leading-tight">
              Hi, I&apos;m Manish Tamang from{" "}
              <span className="group relative inline-block">
                <span>Itahari</span>
                <div className="hidden group-hover:block">
                  <div className="absolute -top-8 rounded-[4px] left-1/2 z-50 flex -translate-x-1/2 flex-col items-center text-center text-sm text-slate-300">
                    <div className="rounded-[4px] bg-black py-1 px-2 font-geist">
                      <p className="whitespace-nowrap">
                        A serene city nestled in eastern Nepal.
                      </p>
                    </div>
                    <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
                  </div>
                </div>
              </span>
              , where I craft, break, and rebuild the internet, one line at a
              time.
            </h1>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Driven by a love for web development, I&apos;m a{" "}
              <span className="font-bold text-[#38A662]">17-year-old</span> full stack aspirant
              from Itahari, Nepal. My coding journey began early, and since
              then, I&apos;ve dedicated myself to crafting engaging web
              experiences using technologies like React, Next.js, and Tailwind
              CSS.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              I&apos;m constantly seeking new challenges and learning
              opportunities to refine my skills.
            </p>
            <SocialLinks />
            <blockquote className="relative overflow-hidden tracking-tight text-lg my-8 lg:py-6 lg:pl-6 pr-12 p-4 border dark:border-zinc-800 border-zinc-200 rounded-[4px]">
              <BiSolidQuoteRight
                className="text-7xl absolute -top-7 -right-5 -rotate-12 dark:text-zinc-800 text-zinc-200"
                aria-hidden="true"
              />
              Good artists borrow, great artists steal.
              <br />
              <span className="text-sm text-gray-500">- Pablo Picasso</span>
            </blockquote>
          </div>

          <div className="flex flex-col items-center top-40 self-start">
            <div className="relative rounded-md w-48 h-full">
              <div className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-72 w-56 rounded-2xl hover:duration-700">
                <div className="w-56 h-72 text-gray-800">
                  <div className="flex flex-row justify-between opacity-90">
                    <Image
                      src="/img/about-image.png"
                      alt="Manish Tamang"
                      width={200}
                      height={200}
                      className="w-full h-full"
                      draggable={false}
                      style={{ userSelect: "none" }}
                    />
                  </div>
                </div>
                <div className="absolute bg-gray-50 dark:bg-neutral-900 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                  <span className="text-[#38A662] font-bold text-xs">
                    Hover here
                  </span>
                  <span className="text-[#38A662] font-bold font-peachi text-3xl">
                    Manish Gole
                  </span>
                  <p className="text-neutral-800 dark:text-neutral-100">
                    My friends also call me Gole.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 font-peachi">
              My Driving Ambition
            </h2>
            <p className="text-gray-700 font-inter dark:text-gray-300 leading-relaxed mb-6">
              I aspire to become a highly skilled full-stack developer,
              proficient in both front-end and back-end technologies, enabling
              me to build innovative and impactful web solutions. I am dedicated
              to continuous learning, honing my craft, and making a positive
              difference through technology.
            </p>
            <div className="w-full mb-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {schoolImages.map((src, idx) => (
                    <CarouselItem key={idx}>
                      <div className="relative aspect-video rounded-lg">
                        <BlurImage
                          src={src}
                          alt={`School photo ${idx + 1}`}
                          className="object-cover"
                          fill
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/60 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300" />
                <CarouselNext className="right-2 bg-white/60 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300" />
              </Carousel>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Carousel images are from my school days and current college days,
              capturing moments that shaped my journey.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 font-peachi">
              Key Skills
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Continuous Learning:</span>{" "}
                Passionate about web development and committed to expanding my
                knowledge and skills, as evident on{" "}
                <a
                  href="https://manishtamang.com"
                  className="text-blue-500 underline"
                >
                  my website
                </a>
                .
              </li>
              <li>
                <span className="font-semibold">Adaptability:</span>{" "}
                Demonstrated ability to quickly learn and apply new technologies
                like TypeScript and Next.js in complex projects during my
                internship.
              </li>
              <li>
                <span className="font-semibold">Community Engagement:</span>{" "}
                Actively involved in open-source projects and the developer
                community, contributing through mentorship and knowledge
                sharing.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-10 mb-4 font-peachi">
              Education
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              A glimpse into my educational journey.
            </p>
            <Education />
          </div>
        </div>
        <Timeline />
      </section>
    </Container>
  );
};

export default About;

function BlurImage(
  props: JSX.IntrinsicAttributes &
    Omit<
      React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
      >,
      "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
    > & {
      src: string | import("next/dist/shared/lib/get-img-props").StaticImport;
      alt: string;
      width?: number | `${number}`;
      height?: number | `${number}`;
      fill?: boolean;
      loader?: import("next/image").ImageLoader;
      quality?: number | `${number}`;
      priority?: boolean;
      loading?: "eager" | "lazy" | undefined;
      placeholder?: "blur" | "empty";
      blurDataURL?: string;
      unoptimized?: boolean;
      overrideSrc?: string;
      onLoadingComplete?: (img: HTMLImageElement) => void;
      layout?: string;
      objectFit?: string;
      objectPosition?: string;
      lazyBoundary?: string;
      lazyRoot?: string;
    } & React.RefAttributes<HTMLImageElement | null>
) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={props.alt}
      className={cn(
        props.className,
        "duration-700 ease-in-out rounded-[4px]",
        isLoading
          ? "grayscale blur-2xl scale-110"
          : "grayscale-0 blur-0 scale-100"
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
