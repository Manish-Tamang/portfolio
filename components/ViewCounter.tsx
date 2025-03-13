"use client";

import { useState, useEffect } from "react";

interface ViewCounterProps {
    slug: string;
}

async function registerView(slug: string) {
    try {
        fetch(`/api/views/${slug}`, { method: "POST" }); 
    } catch (error) {
        console.error("Error registering view:", error);
    }
}

const ViewCounter: React.FC<ViewCounterProps> = ({ slug }) => {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchViews = async () => {
            try {
                const response = await fetch(`/api/views/${slug}`);
                if (!response.ok) throw new Error("Failed to fetch views");
                const data = await response.json();
                setViews(data.views);
            } catch (error) {
                console.error("Error fetching view count:", error);
            }
        };

        fetchViews();
        registerView(slug);
    }, [slug]);

    return <span className="text-gray-500 text-sm">{views ?? "0"} views</span>; 
};

export default ViewCounter;
