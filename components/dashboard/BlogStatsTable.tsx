import { BlogPostStats } from "@/lib/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogStatsTableProps {
    stats: BlogPostStats[] | undefined;
    isLoading: boolean; 
}

const BlogStatsTable: React.FC<BlogStatsTableProps> = ({ stats, isLoading }) => {

    const renderSkeletonRows = () => (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                    <TableCell className="font-medium"><Skeleton className="h-4 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
                </TableRow>
            ))}
        </>
    );

    return (
        <Table>
            <TableCaption>A summary of my blog posts' engagement.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Reactions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    renderSkeletonRows()
                ) : stats && stats.length > 0 ? (
                    stats.map((stat) => (
                        <TableRow key={stat.slug}>
                            <TableCell className="font-medium">{stat.title}</TableCell>
                            <TableCell><code>{stat.slug}</code></TableCell>
                            <TableCell>{stat.views}</TableCell>
                            <TableCell>{stat.totalReactions}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">No data available</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default BlogStatsTable;