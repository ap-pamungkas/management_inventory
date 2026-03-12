"use client";

import React, { useState, useEffect, useCallback } from "react";

interface WarehouseGridDesignerProps {
  initialPosX?: number;
  initialPosY?: number;
  initialWidth?: number;
  initialHeight?: number;
  gridCols?: number;
  gridRows?: number;
  onChange: (pos: { posX: number; posY: number; width: number; height: number }) => void;
}

export default function WarehouseGridDesigner({
  initialPosX = 0,
  initialPosY = 0,
  initialWidth = 10,
  initialHeight = 10,
  gridCols = 20,
  gridRows = 10,
  onChange,
}: WarehouseGridDesignerProps) {
  const [selection, setSelection] = useState<{
    r1: number;
    c1: number;
    r2: number;
    c2: number;
  } | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Map percentages back to grid cells for initial state
  useEffect(() => {
    if (initialWidth > 0 && initialHeight > 0) {
      const c1 = Math.round((initialPosX / 100) * gridCols);
      const r1 = Math.round((initialPosY / 100) * gridRows);
      const c2 = Math.round(((initialPosX + initialWidth) / 100) * gridCols) - 1;
      const r2 = Math.round(((initialPosY + initialHeight) / 100) * gridRows) - 1;
      
      setSelection({ 
        r1: Math.max(0, r1), 
        c1: Math.max(0, c1), 
        r2: Math.min(gridRows - 1, r2), 
        c2: Math.min(gridCols - 1, c2) 
      });
    }
  }, []);

  const handleMouseDown = (r: number, c: number) => {
    setIsMouseDown(true);
    setSelection({ r1: r, c1: c, r2: r, c2: c });
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (isMouseDown && selection) {
      setSelection({ ...selection, r2: r, c2: c });
    }
  };

  const handleMouseUp = useCallback(() => {
    if (isMouseDown && selection) {
      setIsMouseDown(false);
      
      const cStart = Math.min(selection.c1, selection.c2);
      const rStart = Math.min(selection.r1, selection.r2);
      const cEnd = Math.max(selection.c1, selection.c2);
      const rEnd = Math.max(selection.r1, selection.r2);

      const posX = (cStart / gridCols) * 100;
      const posY = (rStart / gridRows) * 100;
      const width = ((cEnd - cStart + 1) / gridCols) * 100;
      const height = ((rEnd - rStart + 1) / gridRows) * 100;

      onChange({ posX, posY, width, height });
    }
  }, [isMouseDown, selection, gridCols, gridRows, onChange]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  const cells = [];
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      const isSelected = selection && 
        r >= Math.min(selection.r1, selection.r2) &&
        r <= Math.max(selection.r1, selection.r2) &&
        c >= Math.min(selection.c1, selection.c2) &&
        c <= Math.max(selection.c1, selection.c2);

      cells.push(
        <div
          key={`${r}-${c}`}
          onMouseDown={() => handleMouseDown(r, c)}
          onMouseEnter={() => handleMouseEnter(r, c)}
          className={`aspect-square border border-slate-700 transition-colors cursor-crosshair
            ${isSelected ? "bg-indigo-500/60 border-indigo-400 brightness-110 shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]" : "bg-slate-900/40 hover:bg-slate-800/60"}
          `}
        />
      );
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 shadow-sm">
            Visual Placement Guide
          </h4>
          <p className="text-[10px] text-slate-500 italic">
            Klik dan tahan untuk menggambar area rak di gudang
          </p>
        </div>
        <div className="bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          <span className="text-[10px] font-mono text-indigo-400 font-bold">
            Posisi: {isMouseDown ? "Menggambar..." : selection ? `${selection.c1},${selection.r1} ke ${selection.c2},${selection.r2}` : "-"}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2 -mx-2 px-2 custom-scrollbar">
        <div 
          className="grid bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-800 p-2 shadow-2xl min-w-[600px]"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          }}
        >
          {cells}
        </div>
      </div>
    </div>
  );
}
