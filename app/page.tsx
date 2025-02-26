import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiSanity,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiFirebase,
  SiPostgresql,
  SiSupabase
} from 'react-icons/si';
import { FaGit } from "react-icons/fa";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4">
      <section className="mb-16 pt-20">
        <div className="flex flex-col items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl md:text-6xl lg:text-5xl font-peachi flex items-center flex-wrap gap-2">
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
              <span className="font-medium bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-transparent bg-clip-text">Manish Tamang</span>,
              <span className="block">
                developer & creator
              </span>
              <span className="block bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-green-500">
                at Swikar Codes.
              </span>
            </h1>
            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl">
              A wizard who loves development and code. I tell stories through my projects
              and applications. I spend most of my time crafting web experiences
              and creating useful tools.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {[
            { icon: <SiReact color="#61DBFB" />, label: "React" },
            { icon: <SiTypescript color="#007acc" />, label: "TypeScript" },
            { icon: <SiJavascript color="#F7DF1E" />, label: "JavaScript" },
            { icon: <SiNextdotjs className="text-black dark:text-white" />, label: "NextJS" },
            { icon: <SiTailwindcss color="#20c8e9" />, label: "Tailwindcss" },
            { icon: <SiSanity color="#ea4a36" />, label: "Sanity" },
            { icon: <FaGit color="#f64d27" />, label: "Git" },
            { icon: <SiFirebase color="#ffcb2d" />, label: "Firebase" },
            { icon: <SiSupabase color="#39ca94" />, label: "Supabase" },
            { icon: <SiPostgresql color="#336791" />, label: "PostgreSQL" }
          ].map((tech, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105"
            >
              {tech.icon}
              <p className="font-small">{tech.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-16">
        <h2 className="text-2xl font-medium mb-4">Work</h2>
        <p className="text-lg mb-12 leading-relaxed max-w-3xl">
          I focus on building fast, future-proof solutions that thrive at the intersection of speed and precision.
          Every line of code I write balances rapid execution with meticulous structure, ensuring scalability and
          maintainability. To me, great development means shipping efficiently and leaving a foundation that lasts.
        </p>

        <div className="space-y-8">
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
        </div>
      </section>
    </main>
  );
}