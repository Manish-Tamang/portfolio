"use client";

import { useState } from "react";
import StickersCanvas, { StickerData } from "@/components/stickers-wall/StickersCanvas";
import CanvasBox from "@/components/stickers-wall/CanvasBox";

export default function StickersWall() {
  const [stickers, setStickers] = useState<StickerData[]>([
    {
      id: "1",
      src: "/stickers/Visual-Studio-Code-Sticker.png",
      x: -21,
      y: 32,
    },
    {
      id: "2",
      src: "/stickers/njk.png",
      x: 96,
      y: -38,
    },
    {
      id: "3",
      src: "/stickers/chumbak.png",
      x: 176,
      y: -27,
    },
    {
      id: "4",
      src: "/stickers/albatross.png",
      x: 176,
      y: -27, 
    },
    {
      id: "5",
      src: "/stickers/react.png",
      x: 220,
      y: 116,
    },
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 relative">
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-2 font-peachi text-gray-900 dark:text-white">
            Stickers Wall
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Drag and drop stickers around the canvas. This is a prototype - more features coming soon!
          </p>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <CanvasBox />
          <StickersCanvas stickers={stickers} onStickersChange={setStickers} />
        </div>
      </div>
    </main>
  );
}

