import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
    title: "About - Manish Tamang",
    description:
        "Learn more about Manish Tamang, a passionate full-stack developer from Itahari, Nepal. Explore his journey, skills, education, and ambitions.",
    openGraph: {
        title: "About - Manish Tamang",
        description:
            "Discover the story of Manish Tamang, a young and ambitious web developer from Nepal, striving to build impactful web applications.",
        url: "https://manishtamang.com/about",
        type: "website",
        images: '/IMG-20250217-WA0011.jpg',
    },
    twitter: {
        card: "summary_large_image",
        site: "@Manishtamangxyz", 
        title: "About - Manish Tamang",
        description:
            "Discover the journey and ambitions of Manish Tamang, a full-stack developer passionate about technology and innovation.",
            images: '/IMG-20250217-WA0011.jpg',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Container>{children}</Container>;
}
