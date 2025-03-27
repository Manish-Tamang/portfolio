"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import { BlurFadeImage, BlurFadeContent } from "@/components/BlurFade";
import Education from "@/components/Education";
import ImageGrid from "@/components/ImageGrid";
import Timeline from "@/components/Timeline";

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

    return (
        <Container>
            <section className="py-12 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12">
                    <div className="w-full">
                        <h1 className="text-5xl font-ridemybike mb-6 leading-tight">
                            Hi, I'm Manish Tamang from{" "}
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
                            , where I craft, break, and rebuild the internet, one line at a time.
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            Driven by a love for web development, I'm a 16-year-old full stack aspirant from Itahari, Nepal. My coding journey began early, and since then, I’ve dedicated myself to crafting engaging web experiences using technologies like React, Next.js, and Tailwind CSS.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            I'm constantly seeking new challenges and learning opportunities to refine my skills.
                        </p>
                        <blockquote className="relative border-l-4 border-gray-400 dark:border-gray-600 pl-6 italic text-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <span className="absolute -top-3 left-2 text-4xl text-gray-400 dark:text-gray-600">“</span>
                            Good artists borrow, great artists steal.
                            <span className="absolute -bottom-3 right-2 text-4xl text-gray-400 dark:text-gray-600">”</span>
                        </blockquote>
                    </div>
                    {isLargeScreen && (
                        <div className="flex flex-col items-center top-40 self-start">
                            <div className="relative rounded-md w-48 h-full">
                                <div className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-72 w-56 rounded-2xl hover:duration-700">
                                    <div className="w-56 h-72 text-gray-800">
                                        <div className="flex flex-row justify-between opacity-90">
                                            <Image
                                                src="/img/manish.png"
                                                alt="Manish Tamang"
                                                width={200}
                                                height={200}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bg-gray-50 dark:bg-neutral-900 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                                        <span className="text-[#38A662] font-bold text-xs">Hover here</span>
                                        <span className="text-[#38A662] font-bold font-peachi text-3xl">Manish Gole</span>
                                        <p className="text-neutral-800 dark:text-neutral-100">My friends also call me Gole.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-4 font-peachi">
                            My Driving Ambition
                        </h2>
                        <p className="text-gray-700 font-inter dark:text-gray-300 leading-relaxed mb-6">
                            I aspire to become a highly skilled full-stack developer, proficient in both front-end and back-end technologies, enabling me to build innovative and impactful web solutions. I am dedicated to continuous learning, honing my craft, and making a positive difference through technology.
                        </p>
                        <div className="relative rounded-xl overflow-hidden mb-6">
                            <BlurFadeImage
                                src="/IMG-20250217-WA0011.jpg"
                                alt="Manish Tamang in Sushma Godawari College"
                                delay={0.3}
                                className="object-cover w-full h-full"
                                width={800}
                                height={600}
                            />
                        </div>
                        <BlurFadeContent
                            delay={0.2}
                            content="Captured during my first week of high school."
                            textClassName="text-sm text-gray-500"
                        />
                        <h2 className="text-2xl font-semibold mt-10 mb-4 font-peachi">
                            Key Skills
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <span className="font-semibold">Continuous Learning:</span> Passionate about web development and committed to expanding my knowledge and skills, as evident on <a href="https://manishtamang.com" className="text-blue-500 underline">my website</a>.
                            </li>
                            <li>
                                <span className="font-semibold">Adaptability:</span> Demonstrated ability to quickly learn and apply new technologies like TypeScript and Next.js in complex projects during my internship.
                            </li>
                            <li>
                                <span className="font-semibold">Community Engagement:</span> Actively involved in open-source projects and the developer community, contributing through mentorship and knowledge sharing.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-10 mb-4 font-peachi">
                            Education
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            A glimpse into my educational journey.
                        </p>
                        <Education />
                        <div className="relative rounded-xl overflow-hidden mb-6">
                            <BlurFadeImage
                                src="/img/IMG-20250308-WA0011.jpg"
                                alt="Class 10"
                                delay={0.3}
                                className="w-full h-full"
                                width={800}
                                height={600}
                            />
                        </div>
                    </div>
                </div>
               <Timeline />
            </section>
        </Container>
    );
};

export default About;