// components/ImageGrid.tsx

import Image from "next/image";

const stories = [
    {
        id: 1,
        image: "/img/classx.jpeg",
    },
    {
        id: 2,
        image: "/img/manish.png",
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        image:
            "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        image:
            "/profile.png",
    },
];

export default function ImageGrid() {
    return (
        
            <div className="mt-4 mb-4 flex justify-center items-center gap-4 max-w-6xl">
                {stories.map((story, index) => (
                    <div
                        key={story.id}
                        className={`relative w-[150px] h-[200px] rounded-3xl overflow-hidden shadow-xl border-4 border-white transform transition-all duration-300 hover:scale-105 ${
                            index % 2 === 0 ? "rotate-[2deg]" : "rotate-[-2deg]"
                        }`}
                    >
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src={story.image || "/placeholder.svg"}
                                alt={`Story ${story.id}`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                ))}
            </div>

    );
}
