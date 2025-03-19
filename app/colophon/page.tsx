"use client"
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
    SiUmami,
    SiNodedotjs
} from 'react-icons/si';
import { Karla } from 'next/font/google';
import CarbonAds from '@/components/carbonAds';
import dynamic from "next/dynamic";

const HomeScene = dynamic(() => import("@/components/3d-scene"), {
    ssr: false,
});

const karla = Karla({ subsets: ['latin'] });

const ColophonPage = () => {
    return (
        <div className="container mx-auto py-12 px-6 max-w-3xl">
            <h1 className="text-4xl font-bold mb-6 font-peachi">Colophon</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Website</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This website is my personal portfolio—my place on the internet. It's a digital canvas where I showcase my skills, projects, and everything I'm passionate about.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This is the third version of my portfolio. My journey began in 2022 when I deployed my first portfolio, which I had copied from a YouTube tutorial. Later, after passing my SEE examination, I built the second version—this time inspired by and heavily influenced by Leerob’s portfolio. Now, with everything I’ve learned along the way, I’ve crafted this version from the ground up, blending all my experiences into a site that truly represents me.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    Built with Sanity, MDX, Firebase, TypeScript, NextJS and PostgreSQL, this website prioritizes performance, user experience, and maintainability.
                </p>

            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This website is proudly crafted with the following technologies:
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
                            url="https://nodejs.org/en"
                            icon={<SiNodedotjs size={32} className="text-[#68A063]" />}
                        />
                    </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                    I purchased my domain <span className="font-medium">manishtamang.com</span> for this site from{" "}
                    <Link href="https://www.bisup.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                        Bisup
                    </Link>, and the site is deployed on{" "}
                    <Link href="https://vercel.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                        Vercel
                    </Link>.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Typography</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    A carefully selected set of typefaces contributes to the website's visual identity:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                    <li><b>Karla:</b> Used for the majority of the body content for readability.</li>
                    <li><b>Peachi:</b> Applied to headings to create a distinct and memorable visual hierarchy.</li>
                    <li><b>Life of Apple:</b> Elegantly displays my name, lending a personal touch.</li>
                    <li><b>MonoLisa:</b> Chosen for code snippets, ensuring clarity and legibility.</li>
                    <li><b>Ride My Bike:</b> Font for some special sections of the website.</li>
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TypographyItem label="Geist Regular" font="var(--font-geist)" />
                    <TypographyItem label="Karla Regular" font="'Karla', sans-serif" />
                    <TypographyItem label="Peachi Regular" font="'Peachi', sans-serif" />
                    <TypographyItem label="Life of Apple Regular" font="var(--font-lifeofapple)" />
                    <TypographyItem label="Ride My Bike" font="var(--font-ridemybike)" />
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Design & Colors</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    The website's color palette is a result of deliberate selection and feedback, reflecting my personal aesthetic while prioritizing accessibility and a modern feel.
                </p>
                <ColorPalette />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    These colors are consistently applied throughout the site to maintain a cohesive and visually appealing experience.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">External APIs & Libraries</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    This website leverages several external APIs and libraries to enhance functionality and user experience:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li><Link href="https://web3forms.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Web3Forms</Link>: For handling form submissions.</li>
                    <li>Weather API: To dynamically display weather information.</li>
                    <li>Joke API: To generate random jokes.</li>
                    <li>Spotify API: To showcase listening activity.</li>
                    <li>WakaTime API: To display coding statistics.</li>
                    <li><Link href="https://timezonedb.com/api" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Time API</Link>: To display time in contact page.</li>
                    <li><Link href="https://umami.is/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Umami API</Link>: For privacy-focused website analytics.</li>
                    <li><Link href="https://feedback.fish/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Feedback.fish</Link>: Providing the feedback widget.</li>
                    <li><Link href="https://threejs.org/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Three.js</Link> & <Link href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">React Three Fiber</Link>: For creating interactive 3D elements.</li>
                    <li><Link href="https://github.com/pmndrs/drei" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">@react-three/drei</Link>: For useful helpers and abstractions for React Three Fiber.</li>
                    <li><Link href="https://github.com/pmndrs/fiber" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">@react-three/fiber</Link>: For React renderer for Threejs.</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                    The 3D model on the About page is generously provided by <Link href="https://craftz.dog/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Takuya Matsuyama at craftz.dog</Link>.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Additional Libraries & Functionality</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Beyond the core tech stack, the website utilizes the following libraries to enhance specific features:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li><Link href="https://ui.shadcn.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Shadcn UI</Link>: For beautifully-designed, accessible components</li>
                    <li><Link href="https://authjs.dev/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">auth.js v2</Link>: For secure and streamlined user authentication.</li>
                    <li>Icons: Sourced from both <Link href="https://react-icons.github.io/react-icons/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">react-icons</Link> and <Link href="https://feathericons.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">react-feather</Link>, providing a diverse and consistent icon set.</li>
                    <li><Link href="https://recharts.org/en-US/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">recharts</Link>: Used for data visualization in the dashboard.</li>
                    <li><Link href="https://react-hot-toast.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">react-hot-toast</Link>: For displaying user-friendly toast notifications.</li>
                    <li><Link href="https://www.npmjs.com/package/react-canvas-confetti" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">react-canvas-confetti</Link>: To generate engaging confetti effects.</li>
                    <li><Link href="https://custom-cursor.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Custom Cursor</Link>: For unique and personalized custom cursors.</li>
                    <li><Link href="https://www.npmjs.com/package/react-medium-image-zoom" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">react-medium-image-zoom</Link>: Enables image zooming functionality.</li>
                    <li><Link href="https://www.npmjs.com/package/react-cookie" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">react-cookie</Link>: For Storing Blog Views and Likes.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Acknowledgements</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    I would like to express my sincere gratitude to the following individuals and their work, which have significantly inspired the design and development of this portfolio:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li><Link href="https://ouassim.tech/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Ouassim</Link>: For the inspiration to re-create my new portfolio.</li>
                    <li><Link href="https://jahir.dev/colophon" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Jahir Fiquitiva</Link></li>
                    <li><Link href="https://theodorusclarence.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Theodorus Clarence</Link></li>
                    <li><Link href="https://bonabrian.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Bona Brian Siagian</Link></li>
                    <li><Link href="https://leerob.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Lee Robinson</Link></li>
                    <li><Link href="https://marcbouchenoire.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Marc Bouchenoire</Link></li>
                    <li><Link href="https://victoreke.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Victor Eke</Link></li>
                    <li><Link href="https://aulianza.id/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Ryan Aulia</Link></li>
                    <li><Link href="https://vjy.me/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Vijay Verma</Link></li>
                    <li><Link href="https://www.raphaelchelly.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Raphaël Chelly</Link></li>
                    <li><a href="https://danielwirtz.com/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">danielwirtz</a></li>
                    <li><Link href="https://darn.es/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">DavidDarnes</Link></li>
                    <li><Link href="https://sayandey.dev/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Sayan Dey</Link></li>
                    <li><Link href="https://www.havardbrynjulfsen.design/" className="font-medium text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Håvard Brynjulfsen</Link></li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                    And to many more talented developers and designers whose work has unknowingly shaped my perspective and approach. Thank you all.
                </p>
            </section>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                This page is inspired by <a href="https://jahir.dev/colophon" className="underline">Jahir Fiquitiva</a>.
            </p>
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
    <div className="border p-4 text-4xl text-center" style={{ fontFamily: font || 'inherit' }}>
        {label}
    </div>
);

const ColorPalette: React.FC = () => {
    const shades = [90, 80, 70, 60, 50, 40, 30, 20, 10, 5];
    return (
        <div className="flex flex-wrap gap-1">
            {shades.map((shade, index) => (
                <div
                    key={index}
                    className="w-6 h-6 rounded-[4px]"
                    style={{ backgroundColor: `hsl(147, 50%, ${shade}%)` }}
                ></div>
            ))}
        </div>
    );
};

export default ColophonPage;