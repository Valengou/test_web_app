import React, { useState } from 'react';

interface BoundingBoxProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onBoxDrawn: (box: { x: number; y: number; width: number; height: number }) => void;
}

export default function BoundingBox({ containerRef, onBoxDrawn }: BoundingBoxProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const startDrawing = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartPos({ x, y });
  };

  const updateDrawing = (e: React.MouseEvent) => {
    if (!isDrawing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const width = currentX - startPos.x;
    const height = currentY - startPos.y;

    setCurrentBox({
      x: width > 0 ? startPos.x : currentX,
      y: height > 0 ? startPos.y : currentY,
      width: Math.abs(width),
      height: Math.abs(height)
    });
  };

  const finishDrawing = () => {
    if (currentBox) {
      onBoxDrawn(currentBox);
    }
    setIsDrawing(false);
    setCurrentBox(null);
  };

  return (
    <div
      className="absolute inset-0"
      onMouseDown={startDrawing}
      onMouseMove={updateDrawing}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
    >
      {currentBox && (
        <div
          className="absolute border-2 border-blue-500 bg-blue-500/20"
          style={{
            left: currentBox.x,
            top: currentBox.y,
            width: currentBox.width,
            height: currentBox.height
          }}
        />
      )}
    </div>
  );
}