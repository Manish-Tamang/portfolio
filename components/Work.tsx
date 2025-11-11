"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface WorkItem {
  title: string;
  href: string;
  role: string;
  period: string;
  image: string;
}

const workItems: WorkItem[] = [
  {
    title: "Digital Pathshala",
    href: "https://www.digitalpathshalanepal.com/",
    role: "MERN Intern",
    period: "Sep. 2025 - Present",
    image: "/img/digital-pathsala.png",
  },
  {
    title: "Swikar Codes",
    href: "https://swikarcodes.com",
    role: "Full Stack Developer",
    period: "Aug. 2024 - Feb. 2025",
    image: "/img/swikar-codes.png",
  },
  {
    title: "Freelancing",
    href: "https://github.com/Manish-Tamang/opera-surgical-centre",
    role: "Full Stack Developer",
    period: "Aug. 2024 - current",
    image: "/img/freelance.jpg",
  },
];

export default function Work() {
  return (
    <section className="mb-2">
      <h2 className="text-2xl font-peachi font-medium mb-2 flex items-center gap-2">
        Work{" "}
        <Image
          src="/img/guestbook-flowers/flower-fourteen.png"
          alt="Flower"
          width={32}
          height={40}
          className="pointer-events-none select-none"
        />
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base">
        I craft high-performance, future-ready solutions where speed meets precision. Every line of code I write is a
        blend of efficiency and structure, designed for scalability and long-term maintainability. For me, great
        development is about delivering fast without compromising on a solid, lasting foundation.
      </p>

      <div className="space-y-4">
        {workItems.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0 last:pb-0">
            <div className="flex items-start gap-3 flex-1">
              <div className="relative w-12 h-12 rounded-[4px] overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={item.image}
                  alt={`${item.title} logo`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1 text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-[#38A662] dark:hover:text-[#7AC594] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item.role}</p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 w-fit h-fit">
              {item.period}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

