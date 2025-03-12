import Image from "next/image";
import Container from "@/components/Container";
import { BlurFadeImage, BlurFadeContent } from "@/components/BlurFade";
import Education from "@/components/Education";
import ImageGrid from "@/components/ImageGrid";
import { Dock } from "@/components/Dock";
import Piano from "@/components/piano/Piano";



const About = () => {
    return (
        <Container>
            <section className="py-12 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12">
                    <div className="w-full">
                        <h1 className="text-5xl font-lifeofapple mb-6 leading-tight">
                            I'm Manish Tamang, I live in{' '}
                            <span className="group relative inline-block">
                                <span>Itahari</span>
                                <div className="hidden group-hover:block">
                                    <div className="absolute -top-8 rounded-[4px] left-1/2 z-50 flex -translate-x-1/2 flex-col items-center text-center text-sm text-slate-300">
                                        <div className="rounded-[4px] bg-black py-1 px-2 font-geist">
                                            <p className="whitespace-nowrap">A beautiful city in eastern Nepal</p>
                                        </div>
                                        <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
                                    </div>
                                </div>
                            </span>
                            , where I build the future.
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6"> I'm a 16-year-old from Itahari,
                            Nepal, driven by a fervent passion for web development. My coding journey began at a young age, and
                            since then, I've immersed myself in building captivating websites, integrating and customizing various
                            technologies like React, Next.js, Tailwind CSS, Postgresql, and more.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6"> I strongly believe in continuous
                            learning and improving myself, so I try my best to learn in any situation possible,
                            unfavorable or not.
                        </p>
                        <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-6 text-gray-600 dark:text-gray-400">
                            म आफुलाइ राम्रो ठान्छु तर म भन्दा ठूलो पापी छैन, <br />
                            मैले गरेको पाप हरुको सायेद कुनै माफी , <br />
                            हे भग्वान समये बित्यो ऐले म सारै लज्जित छु, <br />
                            पस्चताप को आगो ले म निकै त्रसित छु
                        </blockquote>
                        {/* <Dock /> */}
                    </div>
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
                                <div className="absolute bg-gray-50 dark:bg-gray-800 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                                    <span className="text-[#38A662] font-bold text-xs">Hover here</span>
                                    <span className="text-[#38A662] font-bold font-peachi text-3xl">Manish Gole</span>
                                    <p className="text-neutral-800 dark:text-neutral-100">My friends also call me Gole.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <ImageGrid />
                        <h2 className="text-2xl font-semibold mb-4 font-peachi mt-4">What is My Ambition?</h2>
                        <p className="text-gray-700 font-inter dark:text-gray-300 leading-relaxed mb-6">
                            My ambition is to grow into a proficient full-stack developer, mastering both
                            front-end and back-end development to craft powerful, versatile web applications.
                            Each <a href="#" className="text-[#38A662] hover:underline">project</a> is an opportunity to refine my skills, expand my knowledge, and adapt
                            to the ever-evolving world of technology. I’m dedicated to making a meaningful impact
                            through innovation and creativity, one project at a time. A passionate and amateur computer
                            science enthusiast, I have a deep love for technology and innovation. 🚀
                        </p>
                        <div className="relative rounded-lg overflow-hidden mb-6">
                            <BlurFadeImage
                                src="/IMG-20250217-WA0011.jpg"
                                alt="Manish Tamang in Sushma Godawari Collage"
                                delay={0.3}
                                className="object-cover w-full h-full"
                                width={800}
                                height={600}
                            />
                        </div>
                        <BlurFadeContent
                            delay={0.2}
                            content="Me, absolutely chaotic in my first week of high school."
                            textClassName="text-sm text-gray-500"
                        />
                        <h2 className="text-2xl font-semibold mt-10 mb-4 font-peachi">Soft Skills</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <span className="font-semibold">Attention to detail:</span> I take pleasure in creating designs and UIs with careful precision, emphasizing quality over quantity.
                            </li>
                            <li>
                                <span className="font-semibold">Open-source/Collaboration:</span> I founded a community on GitHub called Communitypro that helps newbie developers learn how to contribute to open-source projects and collaborate in building together.
                            </li>
                            <li>
                                <span className="font-semibold">Ability to work with little supervision:</span> I understand people are busy and strive to deliver assignments and projects efficiently.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-10 mb-4 font-peachi">Education</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            Here's little <a href="/photos" className="text-[#38A662] hover:underline">photo </a>snippet and timeline of my education
                        </p>
                        <Education />
                        <div className="relative rounded-lg overflow-hidden mb-6">
                            <BlurFadeImage
                                src="/img/IMG-20250308-WA0011.jpg"
                                alt="Class 10"
                                delay={0.3}
                                className="w-full h-full"
                                width={800}
                                height={600}
                            />
                        </div>
                        <BlurFadeContent
                            delay={0.2}
                            content="Group Photo of Me and My Classmates (2023/2024 SEE Batch)"
                            textClassName="text-sm text-gray-500"
                        />
                    </div>
                </div>
                <div className="mt-4" >
                    <h2 className="text-2xl font-peachi font-medium mb-4">Piano</h2>
                    <Piano />
                </div>
            </section>
        </Container >
    );
};

export default About;