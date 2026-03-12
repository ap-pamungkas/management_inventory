"use client";

import React, { useState } from "react";

interface GridSelectorProps {
  maxRows?: number;
  maxCols?: number;
  initialRows?: number;
  initialCols?: number;
  onChange: (rows: number, cols: number) => void;
}

export default function GridSelector({
  maxRows = 10,
  maxCols = 10,
  initialRows = 1,
  initialCols = 1,
  onChange,
}: GridSelectorProps) {
  const [hovered, setHovered] = useState({ rows: initialRows, cols: initialCols });
  const [selected, setSelected] = useState({ rows: initialRows, cols: initialCols });

  const handleMouseEnter = (r: number, c: number) => {
    setHovered({ rows: r, cols: c });
  };

  const handleMouseLeave = () => {
    setHovered({ rows: 0, cols: 0 });
  };

  const handleClick = (r: number, c: number) => {
    setSelected({ rows: r, cols: c });
    onChange(r, c);
  };

  const currentRows = hovered.rows || selected.rows;
  const currentCols = hovered.cols || selected.cols;

  return (
    <div className="flex flex-col gap-2 p-3 bg-white border border-slate-200 rounded-xl shadow-sm w-fit" onMouseLeave={handleMouseLeave}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Ukuran: {currentRows} x {currentCols}
        </span>
        <span className="text-[9px] text-slate-400 italic">Max {maxRows}x{maxCols}</span>
      </div>
      
      <div 
        className="grid gap-1"
        style={{
          gridTemplateRows: `repeat(${maxRows}, 1fr)`,
          gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
        }}
      >
        {Array.from({ length: maxRows }).map((_, rIndex) => {
          const r = rIndex + 1;
          return Array.from({ length: maxCols }).map((_, cIndex) => {
            const c = cIndex + 1;
            const isHovered = r <= hovered.rows && c <= hovered.cols;
            const isSelected = r <= selected.rows && c <= selected.cols;
            const isActive = hovered.rows > 0 ? isHovered : isSelected;

            return (
              <div
                key={`${r}-${c}`}
                onMouseEnter={() => handleMouseEnter(r, c)}
                onClick={() => handleClick(r, c)}
                className={`w-5 h-5 rounded-[3px] border transition-all duration-75 cursor-pointer
                  ${isActive 
                    ? "bg-blue-500 border-blue-600 shadow-sm z-10 scale-105" 
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }
                `}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
