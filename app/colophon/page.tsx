import React from 'react';
import Link from 'next/link';
import {
    SiNextdotjs,
    SiTailwindcss,
    SiMdx,
    SiVercel,
    SiGithub,
    SiReact,
    SiTypescript,
    SiSanity,
    SiFirebase,
    SiSupabase,
    SiPostgresql,
    SiUmami
} from 'react-icons/si';
import { FaGit } from "react-icons/fa";


const ColophonPage = () => {
    return (
        <div className="container mx-auto py-12 px-6 max-w-3xl">
            <h1 className="text-4xl font-bold mb-6 font-peachi">Colophon</h1>


            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Website</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This website is my personal portfolio, built to showcase my skills and projects.
                    It's crafted with a modern tech stack and a focus on performance and user experience.
                </p>
            </section>


            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This website is created with Next.js, Tailwind CSS, MDX, and more. It's
                    hosted on Vercel, and you're welcome to explore the source code on
                    GitHub.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <TechItem
                        label="Next.js"
                        url="https://nextjs.org/"
                        icon={<SiNextdotjs size={32} color="#000000" />} 
                    />
                    <TechItem
                        label="Tailwind CSS"
                        url="https://tailwindcss.com/"
                        icon={<SiTailwindcss size={32} color="#38B2AC" />} 
                    />
                    <TechItem label="MDX" url="https://mdxjs.com/" icon={<SiMdx size={32} color="#FC427B" />} />
                    <TechItem label="Vercel" url="https://vercel.com/" icon={<SiVercel size={32} color="#000000" />} /> 
                    <TechItem label="GitHub" url="https://github.com/" icon={<SiGithub size={32} color="#181717" />} /> 
                    <TechItem
                        label="Sanity"
                        url="https://www.sanity.io/"
                        icon={<SiSanity size={32} color="#F05340" />} 
                    />
                    <TechItem
                        label="Firebase"
                        url="https://firebase.google.com/"
                        icon={<SiFirebase size={32} color="#FFCA28" />} 
                    />
                    <TechItem
                        label="Supabase"
                        url="https://supabase.com/"
                        icon={<SiSupabase size={32} color="#39ca94" />} 
                    />
                    <TechItem
                        label="PostgreSQL"
                        url="https://www.postgresql.org/"
                        icon={<SiPostgresql size={32} color="#336791" />} 
                    />
                    <TechItem
                        label="TypeScript"
                        url="https://www.typescriptlang.org/"
                        icon={<SiTypescript size={32} color="#3178C6" />} 
                    />
                    <TechItem
                        label="React"
                        url="https://react.dev/"
                        icon={<SiReact size={32} color="#61DAFB" />} 
                    />
                    <TechItem
                        label="Git"
                        url="https://git-scm.com/"
                        icon={<FaGit size={32} color="#F05032" />} 
                    />
                    <TechItem
                        label="Umami"
                        url="https://umami.is/"
                        icon={<SiUmami size={32} />} 
                    />
                </div>
            </section>


            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Typography</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    I'm using Geist for most of the content, Peachi for Headings, Life of apple for name and MonoLisa for code snippets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TypographyItem label="Geist Regular" font="'Geist', sans-serif" />
                    <TypographyItem label="Peachi Regular" font="'Peachi', sans-serif" />
                    <TypographyItem label="Life of Apple Regular" font="'Life of Apple', sans-serif" />
                    <TypographyItem label="Ride My Bike" font="'Ride My Bike', sans-serif" />
                </div>
            </section>


            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Design & Colors</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    I personally handpicked the brand's color palette, tailored to my taste
                    and enriched by feedback. The main theme is a balance between modern and accessible design.
                </p>
                <ColorPalette />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    These colors are used throughout the website to maintain consistency and visual appeal.
                </p>
            </section>


            {/* <section>
    <h2 className="text-2xl font-bold mb-4">Logo</h2>
    <p className="text-gray-700 dark:text-gray-300">
     My personal logo is designed by Eduardo Pratti.
    </p>
    <div className="flex items-center mt-4">
     <div className="border p-4 rounded-[4px] mr-4">
      <span className="text-2xl">JF</span>
     </div>
     <div className="border p-4 rounded-[4px]">
      <span className="text-2xl">JF</span>
     </div>
    </div>
   </section> */}
        </div>
    );
};


interface TechItemProps {
    label: string;
    url: string;
    icon: React.ReactNode;
}


const TechItem: React.FC<TechItemProps> = ({ label, url, icon }) => (
    <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline"
    >
        {icon}
        {label}
    </Link>
);


const TypographyItem: React.FC<{ label: string; font?: string }> = ({ label, font }) => (
    <div className="border p-4 text-4xl rounded-[4px] text-center" style={{ fontFamily: font || 'inherit' }}>
        {label}
    </div>
);


const ColorPalette: React.FC = () => {
    const colors = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    return (
        <div className="flex flex-wrap gap-1">
            {colors.map((color) => (
                <div
                    key={color}
                    className="w-6 h-6 rounded-[4px]"
                    style={{ backgroundColor: `hsl(220, 89%, ${100 - color / 10}%)` }}
                ></div>
            ))}
        </div>
    );
};


export default ColophonPage;