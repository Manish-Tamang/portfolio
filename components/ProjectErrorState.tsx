interface ProjectErrorStateProps {
    error: string;
}

export default function ProjectErrorState({ error }: ProjectErrorStateProps) {
    return (
        <div className="text-center py-12 border border-dashed border-red-300 rounded-[4px]">
            <p className="text-red-500 dark:text-red-400">Error: {error}</p>
        </div>
    );
}
