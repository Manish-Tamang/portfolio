'use client'
import { Skeleton } from "@/components/ui/skeleton";

interface BlogCardSkeletonProps {
    width?: string;
    height?: string;
}

const BlogCardSkeleton: React.FC<BlogCardSkeletonProps> = ({
    width = "100%",
    height = "475px",
}) => {
    return (
        <div style={{ width, height }} className="relative overflow-hidden rounded-[4px] bg-white dark:bg-gray-800 border shadow-md transition-all duration-300 flex flex-col">
            <Skeleton className="relative h-64 w-full" />
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="text-xl font-bold mb-2 h-6 w-48" />
                <Skeleton className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-4 w-full" />
                <Skeleton className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-4 w-32" />
                <Skeleton className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-4 w-40" />
                <div className="mt-auto">
                    <Skeleton className="inline-flex items-center text-[#38A662] dark:text-[#7AC594] text-sm font-medium h-4 w-24" />
                </div>
            </div>
        </div>
    );
};

export default BlogCardSkeleton;