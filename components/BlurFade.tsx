"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, ReactNode } from "react";
import type { UseInViewOptions } from "framer-motion";

export const BlurFade = ({
    children,
    delay = 0,
    className = "",
    margin = "0px 0px -100px 0px" as const
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
    margin?: UseInViewOptions["margin"];
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{
                opacity: isInView ? 1 : 0,
                filter: isInView ? "blur(0px)" : "blur(10px)",
            }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.17, 0.55, 0.55, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const BlurFadeImage = ({
    src,
    alt,
    width = 500,
    height = 500,
    className = "",
    delay = 0,
    imageClassName = "",
    withShadow = true
}: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    delay?: number;
    imageClassName?: string;
    withShadow?: boolean;
}) => {

    return (
        <BlurFade delay={delay} className={className}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`rounded-[4px] ${imageClassName}`}
                priority
            />
        </BlurFade>
    );
};

export const BlurFadeContent = ({
    content,
    className = "",
    delay = 0,
    textClassName = "text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal"
}: {
    content: string | ReactNode;
    className?: string;
    delay?: number;
    textClassName?: string;
}) => {
    return (
        <BlurFade delay={delay} className={className}>
            {typeof content === "string" ? (
                <p className={textClassName}>{content}</p>
            ) : (
                content
            )}
        </BlurFade>
    );
};