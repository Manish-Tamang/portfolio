import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ProjectSearchFilterProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortOrder: "newest" | "oldest" | "a-z" | "z-a";
    setSortOrder: (order: "newest" | "oldest" | "a-z" | "z-a") => void;
    projectCount: number;
}

export default function ProjectSearchFilter({
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    projectCount
}: ProjectSearchFilterProps) {
    return (
        <div className="mb-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-2">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        className="pl-10 pr-4 py-2 border dark:bg-neutral-800 bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#38A662] transition-all rounded-[4px]"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-auto">
                    <Select onValueChange={(value) => setSortOrder(value as "newest" | "oldest" | "a-z" | "z-a")} defaultValue="newest">
                        <SelectTrigger className="w-full md:w-[120px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                            <SelectItem value="a-z">A-Z</SelectItem>
                            <SelectItem value="z-a">Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <p className="text-sm text-gray-500 ml-2">
                {projectCount} {projectCount === 1 ? 'project' : 'projects'} found
            </p>
        </div>
    );
}
