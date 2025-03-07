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
                <div className="my-8">
                    <div className="grid grid-cols-4 border-l border-t border-gray-200 dark:border-gray-800">
                        <IconItem
                            url="https://nextjs.org/"
                            icon={<SiNextdotjs size={32} className="text-black dark:text-white" />}
                        />
                        <IconItem
                            url="https://tailwindcss.com/"
                            icon={<SiTailwindcss size={32} className="text-[#38B2AC]" />}
                        />
                        <IconItem
                            url="https://mdxjs.com/"
                            icon={<SiMdx size={32} className="text-[#FC427B]" />}
                        />
                        <IconItem
                            url="https://vercel.com/"
                            icon={<SiVercel size={32} className="text-black dark:text-white" />}
                        />
                        <IconItem
                            url="https://firebase.google.com/"
                            icon={<SiFirebase size={32} className="text-[#FFCA28]" />}
                        />
                        <IconItem
                            url="https://supabase.com/"
                            icon={<SiSupabase size={32} className="text-[#39ca94]" />}
                        />
                        <IconItem
                            url="https://www.postgresql.org/"
                            icon={<SiPostgresql size={32} className="text-[#336791]" />}
                        />
                        <IconItem
                            url="https://github.com/"
                            icon={<SiGithub size={32} className="text-black dark:text-white" />}
                        />
                        <IconItem
                            url="https://www.sanity.io/"
                            icon={<SiSanity size={32} className="text-[#F05340]" />}
                        />
                        <IconItem
                            url="https://www.typescriptlang.org/"
                            icon={<SiTypescript size={32} className="text-[#3178C6]" />}
                        />
                        <IconItem
                            url="https://react.dev/"
                            icon={<SiReact size={32} className="text-[#61DAFB]" />}
                        />
                        <IconItem
                            url="https://git-scm.com/"
                            icon={<FaGit size={32} className="text-[#F05032]" />}
                        />
                    </div>
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
        </div>
    );
};

interface IconItemProps {
    url: string;
    icon: React.ReactNode;
}

const IconItem: React.FC<IconItemProps> = ({ url, icon }) => (
    <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-24 border-r border-b border-gray-200 dark:border-gray-800 hover:opacity-80 transition-opacity"
    >
        {icon}
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