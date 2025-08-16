interface EmptyProjectsStateProps {
    searchQuery: string;
    onClearSearch: () => void;
}

export default function EmptyProjectsState({ searchQuery, onClearSearch }: EmptyProjectsStateProps) {
    return (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-[4px]">
            <p className="text-gray-500 dark:text-gray-400">
                No projects found matching &quot;{searchQuery}&quot;
            </p>
            <button
                className="mt-4 text-blue-600 dark:text-blue-400 underline"
                onClick={onClearSearch}
            >
                Clear search
            </button>
        </div>
    );
}
