"use client";
import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaHeart, FaTrophy, FaBookmark } from 'react-icons/fa';
import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useCookies } from 'react-cookie';
import { Skeleton } from "@/components/ui/skeleton";

interface LikeCounts {
    thumbsUp?: number;
    heart?: number;
    trophy?: number;
    bookmark?: number;
}

interface LikeButtonsProps {
    slug: string | undefined;
}

const LikeButtons: React.FC<LikeButtonsProps> = ({ slug }) => {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [likeCounts, setLikeCounts] = useState<LikeCounts>({});
    const [cookies, setCookie] = useCookies([`likedPosts-${slug}`]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasReacted, setHasReacted] = useState(false);

    useEffect(() => {
        if (!slug) {
            setIsLoading(false);
            return;
        }

        const fetchLikes = async () => {
            try {
                const docRef = doc(db, 'posts', slug);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setLikeCounts(docSnap.data() as LikeCounts);
                } else {
                    const defaultCounts = {
                        thumbsUp: 0,
                        heart: 0,
                        trophy: 0,
                        bookmark: 0,
                    };
                    await setDoc(docRef, defaultCounts);
                    setLikeCounts(defaultCounts);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchLikes();
    }, [slug]);

    useEffect(() => {
        if (slug) {
            const likedPostFromCookies = cookies[`likedPosts-${slug}`];
            if (likedPostFromCookies) {
                setActiveButton(likedPostFromCookies);
                setHasReacted(true);
            } else {
                setHasReacted(false);
            }
        }
    }, [cookies, slug]);

    const handleButtonClick = async (buttonName: string) => {
        if (!slug || hasReacted || !['thumbsUp', 'heart', 'trophy', 'bookmark'].includes(buttonName)) {
            return;
        }

        try {
            const docRef = doc(db, 'posts', slug);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const currentCounts = docSnap.data() as LikeCounts;
                const updates: Partial<Record<keyof LikeCounts, number>> = {};
                updates[buttonName as keyof LikeCounts] = (currentCounts[buttonName as keyof LikeCounts] || 0) + 1;

                await updateDoc(docRef, updates);

                setLikeCounts((prevCounts) => ({
                    ...prevCounts,
                    ...updates,
                }));

                setActiveButton(buttonName);
                setCookie(`likedPosts-${slug}`, buttonName, {
                    path: '/',
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60,
                });
                setHasReacted(true);
            }
        } catch (error) { }
    };

    return (
        <div className="flex items-center justify-start gap-2">
            <button
                className={`inline-flex items-center justify-center px-3.5 py-2 rounded-full  text-gray-700 dark:text-gray-200 text-base font-medium transition-all duration-300  hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-px ${activeButton === 'thumbsUp' ? 'bg-gray-200 dark:bg-gray-700 ' : ''}`}
                onClick={() => handleButtonClick('thumbsUp')}
                style={{ cursor: hasReacted ? 'not-allowed' : 'pointer' }}
                disabled={hasReacted || isLoading}
            >
                <span className="inline-flex items-center mr-1.5">
                    <FaThumbsUp
                        size={18}
                        color={activeButton === 'thumbsUp' ? '#4dabf7' : undefined}
                    />
                </span>
                {isLoading ? (
                    <Skeleton className="w-4 h-4 rounded-full" />
                ) : (
                    likeCounts.thumbsUp || 0
                )}
            </button>
            <button
                className={`inline-flex items-center justify-center px-3.5 py-2 rounded-full  text-gray-700 dark:text-gray-200 text-base font-medium transition-all duration-300  hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-px ${activeButton === 'heart' ? 'bg-gray-200 dark:bg-gray-700 ' : ''}`}
                onClick={() => handleButtonClick('heart')}
                style={{ cursor: hasReacted ? 'not-allowed' : 'pointer' }}
                disabled={hasReacted || isLoading}
            >
                <span className="inline-flex items-center mr-1.5">
                    <FaHeart
                        size={18}
                        color={activeButton === 'heart' ? '#ff6b6b' : undefined}
                    />
                </span>
                {isLoading ? (
                    <Skeleton className="w-4 h-4 rounded-full" />
                ) : (
                    likeCounts.heart || 0
                )}
            </button>
            <button
                className={`inline-flex items-center justify-center px-3.5 py-2 rounded-full  text-gray-700 dark:text-gray-200 text-base font-medium transition-all duration-300  hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-px ${activeButton === 'trophy' ? 'bg-gray-200 dark:bg-gray-700 ' : ''}`}
                onClick={() => handleButtonClick('trophy')}
                style={{ cursor: hasReacted ? 'not-allowed' : 'pointer' }}
                disabled={hasReacted || isLoading}
            >
                <span className="inline-flex items-center mr-1.5">
                    <FaTrophy
                        size={18}
                        color={activeButton === 'trophy' ? '#ffd43b' : undefined}
                    />
                </span>
                {isLoading ? (
                    <Skeleton className="w-4 h-4 rounded-full" />
                ) : (
                    likeCounts.trophy || 0
                )}
            </button>
            <button
                className={`inline-flex items-center justify-center px-3.5 py-2 rounded-full  text-gray-700 dark:text-gray-200 text-base font-medium transition-all duration-300  hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-px ${activeButton === 'bookmark' ? 'bg-gray-200 dark:bg-gray-700 ' : ''}`}
                onClick={() => handleButtonClick('bookmark')}
                style={{ cursor: hasReacted ? 'not-allowed' : 'pointer' }}
                disabled={hasReacted || isLoading}
            >
                <span className="inline-flex items-center mr-1.5">
                    <FaBookmark
                        size={18}
                        color={activeButton === 'bookmark' ? '#40c057' : undefined}
                    />
                </span>
                {isLoading ? (
                    <Skeleton className="w-4 h-4 rounded-full" />
                ) : (
                    likeCounts.bookmark || 0
                )}
            </button>
        </div>
    );
};

export default LikeButtons;