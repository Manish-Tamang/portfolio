// components/ImageGrid.tsx

import Image from "next/image";

const stories = [
    {
        id: 1,
        image: "/img/chindey.jpg",
    },
    {
        id: 2,
        image: "/img/manish.png",
    },
    {
        id: 3,
        image:
            "/img/IMG-20241228-WA0053.jpg",
    },
    {
        id: 4,
        image:
            "/img/dev.png",
    },
    {
        id: 5,
        image:
            "/profile.png",
    },
];

export default function ImageGrid() {
    return (
        
            <div className="mb-4 flex justify-center items-center gap-4 max-w-6xl">
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
