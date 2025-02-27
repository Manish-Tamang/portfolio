import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
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


const TechCard = ({ tech, index }: { tech: any, index: number }) => (
    <div
        key={index}
        className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105 w-full mr-2 sm:w-48"
    >
        <div className="text-xl">{tech.icon}</div>
        <div>
            <p className="text-sm font-medium">{tech.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
        </div>
    </div>
);


const Icons = () => {
    return (
        <div className="flex flex-wrap">
            {[
                { icon: <SiReact color="#61DBFB" />, label: "React", desc: "UI Library" },
                { icon: <SiTypescript color="#007acc" />, label: "TypeScript", desc: "Typed JavaScript" },
                { icon: <SiJavascript color="#F7DF1E" />, label: "JavaScript", desc: "Web Language" },
                { icon: <SiNextdotjs className="text-black dark:text-white" />, label: "Next.js", desc: "React Framework" },
                { icon: <SiTailwindcss color="#20c8e9" />, label: "Tailwind CSS", desc: "Utility-first CSS" },
                { icon: <SiSanity color="#ea4a36" />, label: "Sanity", desc: "Headless CMS" },
                { icon: <FaGit color="#f64d27" />, label: "Git", desc: "Version Control" },
                { icon: <SiFirebase color="#ffcb2d" />, label: "Firebase", desc: "Backend Services" },
                { icon: <SiSupabase color="#39ca94" />, label: "Supabase", desc: "Open-source DB" },
                { icon: <SiPostgresql color="#336791" />, label: "PostgreSQL", desc: "Relational DB" }
            ].map((tech, index) => (
                <TechCard tech={tech} index={index} />
            ))}
        </div>
    );
};

export default function TechStacks() {
    return (
        <>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:30s] [--gap:0.5rem]">
                    <Icons />
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:30s] [--gap:0.5rem]">
                    <Icons />
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>
        </>
    );
}