import Image from "next/image";
import React, { useState } from "react";

interface GuestbookCardProps {
    name: string;
    avatar?: string;
    timestamp: string;
    comment: string;
}

const MAX_LENGTH = 90;

const GuestbookCard: React.FC<GuestbookCardProps> = ({
    name,
    avatar,
    timestamp,
    comment,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedComment =
        comment.length > MAX_LENGTH ? comment.slice(0, MAX_LENGTH) + "..." : comment;

    return (
        <div className="rounded-[4px] p-3 w-full border border-gray-200 dark:border-gray-700 shadow-sm mb-2 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
                {avatar ? (
                    <Image
                        width={10}
                        height={10}
                        src={avatar}
                        alt={name}
                        className="w-7 h-7 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                        priority
                    />
                ) : (
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="18"
                            width="18"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinejoin="round"
                                fill="#707277"
                                strokeLinecap="round"
                                strokeWidth="2"
                                stroke="#707277"
                                d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                            ></path>
                            <path
                                strokeWidth="2"
                                fill="#707277"
                                stroke="#707277"
                                d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                            ></path>
                        </svg>
                    </div>
                )}
                <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">
                        {name}
                    </span>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{timestamp}</p>
                </div>
            </div>
            <p className="mt-2 text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed">
                {isExpanded ? comment : truncatedComment}
                {comment.length > MAX_LENGTH && (
                    <span
                        className="text-blue-500 cursor-pointer ml-1"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? " See less" : " See more"}
                    </span>
                )}
            </p>
        </div>
    );
};

export default GuestbookCard;
