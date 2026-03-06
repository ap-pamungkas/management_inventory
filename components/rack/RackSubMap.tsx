"use client";

import React from "react";
import { Rack, Item } from "@/types/rack";

interface RackSubMapProps {
  rack: Rack;
}

const RackSubMap: React.FC<RackSubMapProps> = ({ rack }) => {
  const rows = rack.layoutRows || 1;
  const cols = rack.layoutCols || 1;

  // Create empty grid
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));

  // Populate grid with items
  rack.items?.forEach((item) => {
    if (
      item.row !== null &&
      item.col !== null &&
      item.row! < rows &&
      item.col! < cols
    ) {
      grid[item.row!][item.col!] = item;
    }
  });

  return (
    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-3xl animate-in zoom-in-95 duration-200">
      <div className="mb-3 flex justify-between items-center">
        <h4 className="text-white font-bold text-xs uppercase tracking-widest">
          Rack Details: {rack.code_rack}
        </h4>
        <span className="text-[10px] text-slate-400">
          {rows}x{cols} Layout
        </span>
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((item: Item | null, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square rounded-md border flex flex-col items-center justify-center p-1 transition-all
                ${
                  item
                    ? "bg-indigo-500/20 border-indigo-500 shadow-[inset_0_0_10px_rgba(79,70,229,0.2)]"
                    : "bg-slate-900/50 border-slate-700 border-dashed"
                }
              `}
            >
              {item ? (
                <div className="text-center">
                  <div className="text-[8px] font-bold text-indigo-300 truncate w-full px-1">
                    {item.name}
                  </div>
                  <div className="text-[10px] font-black text-white">
                    {item.stock}
                  </div>
                </div>
              ) : (
                <div className="text-[8px] text-slate-600 font-mono">
                  {rowIndex},{colIndex}
                </div>
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default RackSubMap;
