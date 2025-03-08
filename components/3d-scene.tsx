import { Suspense } from "react";
import { Html, OrbitControls, Preload, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Dog } from "./Model";
import { Skeleton } from "@/components/ui/skeleton";

const HomeSceneFallback = () => {
    const { progress } = useProgress();

    return (
        <Html center className="flex flex-col items-center justify-center">
            <Skeleton className="w-24 h-24 rounded-full mb-2" />
            <Skeleton className="w-36 h-4 rounded mb-1" />
            <Skeleton className="w-20 h-4 rounded" />
            <p className="text-sm text-gray-500 mt-2">{progress.toFixed(1)}% loaded</p>
        </Html>
    );
};

const HomeScene = () => {
    return (
        <Canvas
            className="size-full"
            camera={{
                fov: 30,
                near: 0.1,
                far: 200,
                position: [4, 3, 6],
            }}
            gl={{ antialias: true }}
            dpr={[1, 2]}
        >
            <ambientLight intensity={2} />
            <Suspense fallback={<HomeSceneFallback />}>
                <Dog position={[0, -0.9, 0]} scale={[0.67, 0.67, 0.67]} />
                <OrbitControls autoRotate autoRotateSpeed={0.5} />
                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default HomeScene;
