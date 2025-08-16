export default function ProjectLoadingSkeleton() {
    return (
        <section className="container mx-auto py-12 px-4">
            <div className="animate-pulse">
                <div className="h-12 bg-gray-200 dark:bg-neutral-700 rounded mb-4 w-1/3"></div>
                <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded mb-8 w-2/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-200 dark:bg-neutral-700 rounded-lg h-64"></div>
                    ))}
                </div>
            </div>
        </section>
    );
}
