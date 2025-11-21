"use client";

import Image from "next/image";

interface StickerProps {
  id: string;
  src: string;
  x: number;
  y: number;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent, stickerId: string) => void;
}

export default function Sticker({
  id,
  src,
  x,
  y,
  isDragging,
  onMouseDown,
}: StickerProps) {
  return (
    <div
      className="absolute cursor-move select-none pointer-events-auto"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        transition: isDragging ? "none" : "transform 0.2s",
        zIndex: 40,
      }}
      onMouseDown={(e) => onMouseDown(e, id)}
    >
      <div style={{ width: "80px", height: "80px", position: "relative" }}>
        <Image
          src={src}
          alt="Sticker"
          fill
          className="pointer-events-none"
          draggable={false}
          style={{ objectFit: "contain" }}
          sizes="80px"
        />
      </div>
      {/* <div className="absolute -bottom-6 left-0 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono pointer-events-none whitespace-nowrap">
        x: {Math.round(x)}, y: {Math.round(y)}
      </div> */}
    </div>
  );
}

