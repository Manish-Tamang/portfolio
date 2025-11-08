"use client";

import { motion, useScroll } from "framer-motion";
import React from "react";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            style={{
                scaleX: scrollYProgress,
                backgroundColor: "#38a662",
            }}
            className="fixed top-0 left-0 right-0 h-1 origin-left z-[9999]"
        />
    );
}
