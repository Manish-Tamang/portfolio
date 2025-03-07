"use client"
import { LayoutGrid } from "@/components/ui/layout-grid";

export default function LayoutGridDemo() {
    return (
        <div className="h-screen py-20 w-full">
            <LayoutGrid cards={cards} />
        </div>
    );
}


const cards = [
    {
        id: 1,
        className: "md:col-span-2",
        thumbnail:
            "/img/classx.jpeg",
    },
    {
        id: 2,
        className: "col-span-1",
        thumbnail:
            "/img/manish.png",
    },
    {
        id: 3,
        className: "col-span-1",
        thumbnail:
            "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        className: "md:col-span-2",
        thumbnail:
            "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];
