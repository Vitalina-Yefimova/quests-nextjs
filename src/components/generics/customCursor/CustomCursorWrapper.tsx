"use client";

import { useState, useRef, ReactNode } from "react";
import CursorHandIcon from "@/components/icons/CursorHandIcon";

interface CustomCursorWrapperProps {
  children: ReactNode;
}

export default function CustomCursorWrapper({
  children,
}: CustomCursorWrapperProps) {
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cursorRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cursorRef}
      className="relative cursor-none"
      onMouseEnter={() => setIsCursorVisible(true)}
      onMouseLeave={() => setIsCursorVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {isCursorVisible && (
        <div
          className="absolute pointer-events-none transition-transform duration-75 z-50"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <CursorHandIcon />
        </div>
      )}
      {children}
    </div>
  );
}