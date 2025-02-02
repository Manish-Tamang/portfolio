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
    <main>
      <section className="mb-16">
        <div className="flex items-center justify-between">
          {/* <h2 className="text-4xl font-medium">
            <span className="mr-2"></span> Hi, I&apos;m Manish!
          </h2> */}
          <h1 className="font-mediumbold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
            <span className="relative inline-block group overflow-hidden">
              <span
                className=
                'block transform transition-transform duration-500 group-hover:translate-y-full'
              >
                Hi, I&apos;m Manish!
              </span>
              <span
                className='absolute inset-0 block transform translate-y-full transition-transform duration-500 group-hover:translate-y-0'
              >
                Gole Tamang
              </span>
            </span>
          </h1>
          <div className="mr-10">
            <div className="flip-container flex basis-1/3 justify-end w-[160px] mb-8 sm:mb-0">
              <div className="flip-card">
                <div className="flip-card-front">
                  <Image
                    alt="Profile Image"
                    src='/profile.png'
                    width={120}
                    height={120}

                    priority
                    className="rounded-full"
                  />
                </div>
                <div className="flip-card-back">
                  <Image
                    alt="Back Image"
                    src="/chill-guy.png"
                    width={120}
                    height={120}

                    priority
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg mt-6 leading-relaxed">
          a 16-year-old from Itahari, Nepal, with a fervent passion for web development.
        </p>
        <p className="text-lg leading-relaxed">
          This is my personal space, where I share my work, projects, and some notes I write here and there.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
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
              <p className="font-medium">{tech.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>

        <h2 className="text-2xl font-medium mb-4">Work</h2>
        <p className="text-lg mb-12 leading-relaxed">
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
