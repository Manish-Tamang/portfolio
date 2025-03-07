import { Skeleton } from "@/components/ui/skeleton";

const GuestbookCardSkeleton = () => {
    return (
        <div className="rounded-lg p-4 w-full border border-gray-200 dark:border-gray-700 shadow-sm mb-2 bg-white dark:bg-gray-900">
            <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex flex-col flex-1">
                    <Skeleton className="h-4 w-[150px] mb-1" />
                    <Skeleton className="h-3 w-[100px]" />
                    <Skeleton className="h-4 w-full mt-2" />
                </div>
            </div>
        </div>
    );
};

export const GuestbookSkeletons = () => (
    <>
        <GuestbookCardSkeleton />
        <GuestbookCardSkeleton />
        <GuestbookCardSkeleton />
        <GuestbookCardSkeleton />
        <GuestbookCardSkeleton />
        <GuestbookCardSkeleton />
        <GuestbookCardSkeleton />
        <GuestbookCardSkeleton />
    </>
);