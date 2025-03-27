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
        className="flex items-center space-x-2 bg-gray-100 dark:bg-neutral-800 px-2 py-2 rounded-[4px] shadow-sm transition-transform duration-300 hover:scale-105 w-44 mr-2 sm:w-44"
    >
        <div className="text-xl">{tech.icon}</div>
        <div>
            <p className="text-sm font-medium">{tech.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
        </div>
    </div>
);


const TechStacks = () => {
    const techStack = [
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
    ];

    const firstRow = techStack.slice(0, 5);  
    const secondRow = techStack.slice(5); 

    return (
        <>
            <div className="relative flex w-full flex-col mt-1 items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:30s] [--gap:0.2rem]">
                    <div className="flex">
                        {firstRow.map((tech, index) => (
                            <TechCard key={`first-${tech.label}`} tech={tech} index={index} />
                        ))}
                    </div>
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:30s] [--gap:0.2rem]">
                    <div className="flex">
                        {secondRow.map((tech, index) => (
                            <TechCard key={`second-${tech.label}`} tech={tech} index={index} />
                        ))}
                    </div>
                </Marquee>
            </div>
        </>
    );
};

export default TechStacks;