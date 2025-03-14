"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaTwitter, FaLinkedin, FaLink } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";

const ShareButton = ({ url }: { url: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={`cursor-pointer transition-all bg-[#38A662] text-white px-4 py-2 rounded-[4px] 
                            border-[#2D8A4D] border-b-[4px] hover:bg-[#3EBF70] hover:-translate-y-[1px] 
                          hover:border-b-[6px] active:border-b-[2px] active:bg-[#2D8A4D] active:translate-y-[2px]
                              flex items-center gap-2 dark:bg-[#38A662] dark:border-[#2D8A4D] dark:text-white
                             dark:hover:bg-[#3EBF70] dark:active:bg-[#2D8A4D]
                              w-full h-10 
                           sm:w-auto`}
                >
                    <PiShareFat className="w-5 h-5" />
                    Share
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-44 p-2 space-y-2 shadow-md border rounded-[4px]
                    bg-white dark:bg-gray-900 dark:border-gray-700"
            >
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md 
                        hover:bg-gray-100 dark:hover:bg-gray-800 transition 
                        text-gray-900 dark:text-gray-100"
                >
                    <FaFacebook className="text-blue-600 dark:text-blue-500" />
                    Facebook
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md 
                        hover:bg-gray-100 dark:hover:bg-gray-800 transition 
                        text-gray-900 dark:text-gray-100"
                >
                    <FaTwitter className="text-blue-400 dark:text-blue-300" />
                    Twitter
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-md 
                        hover:bg-gray-100 dark:hover:bg-gray-800 transition 
                        text-gray-900 dark:text-gray-100"
                >
                    <FaLinkedin className="text-blue-700 dark:text-blue-600" />
                    LinkedIn
                </a>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md 
                        hover:bg-gray-100 dark:hover:bg-gray-800 transition 
                        text-gray-900 dark:text-gray-100"
                >
                    <FaLink className="text-gray-500 dark:text-gray-400" />
                    {copied ? "Copied!" : "Copy Link"}
                </button>
            </PopoverContent>
        </Popover>
    );
};

export default ShareButton;