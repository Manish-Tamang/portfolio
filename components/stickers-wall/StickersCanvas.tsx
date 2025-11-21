"use client";

import { useState, useEffect, useRef } from "react";
import Sticker from "./Sticker";

export interface StickerData {
  id: string;
  src: string;
  x: number;
  y: number;
}

interface StickersCanvasProps {
  stickers: StickerData[];
  onStickersChange: (stickers: StickerData[]) => void;
}

export default function StickersCanvas({
  stickers,
  onStickersChange,
}: StickersCanvasProps) {
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, stickerId: string) => {
    e.preventDefault();
    const sticker = stickers.find((s) => s.id === stickerId);
    if (!sticker || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setDragging(stickerId);
    setDragOffset({
      x: e.clientX - rect.left - sticker.x,
      y: e.clientY - rect.top - sticker.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;

      onStickersChange(
        stickers.map((sticker) =>
          sticker.id === dragging
            ? { ...sticker, x: newX, y: newY }
            : sticker
        )
      );
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, dragOffset, stickers, onStickersChange]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
      style={{
        zIndex: 40,
      }}
    >
      {stickers.map((sticker) => (
        <Sticker
          key={sticker.id}
          id={sticker.id}
          src={sticker.src}
          x={sticker.x}
          y={sticker.y}
          isDragging={dragging === sticker.id}
          onMouseDown={handleMouseDown}
        />
      ))}
    </div>
  );
}

