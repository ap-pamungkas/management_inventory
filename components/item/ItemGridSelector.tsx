"use client";

import React from "react";

interface ItemGridSelectorProps {
  rows: number;
  cols: number;
  selectedRow: number | null;
  selectedCol: number | null;
  occupiedSlots?: { row: number; col: number; name: string }[];
  onSelect: (row: number, col: number) => void;
}

export default function ItemGridSelector({
  rows,
  cols,
  selectedRow,
  selectedCol,
  occupiedSlots = [],
  onSelect,
}: ItemGridSelectorProps) {
  // Simple check for occupied slots
  const isOccupied = (r: number, c: number) => {
    return occupiedSlots.find((slot) => slot.row === r && slot.col === c);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center">
        <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
          Position Picker
        </h4>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm" />
            <span className="text-[10px] text-slate-400 font-medium">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="w-2 h-2 rounded-[2px] border border-slate-700 bg-slate-800/50" />
             <span className="text-[10px] text-slate-400 font-medium">Empty</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-2 custom-scrollbar">
        <div 
          className="grid gap-1.5 max-h-[300px] p-1 w-fit mx-auto"
          style={{
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
          }}
        >
          {Array.from({ length: rows }).map((_, r) => (
            Array.from({ length: cols }).map((_, c) => {
              const isSelected = selectedRow === r && selectedCol === c;
              const occupied = isOccupied(r, c);

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => !occupied && onSelect(r, c)}
                  title={occupied ? `Occupied: ${occupied.name}` : `Position: ${r},${c}`}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 cursor-pointer group relative
                    ${isSelected 
                      ? "bg-indigo-600 border-white z-10 scale-110 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                      : occupied
                        ? "bg-slate-800/30 border-slate-800 cursor-not-allowed opacity-40"
                        : "bg-slate-800/50 border-slate-700 hover:border-indigo-500 hover:bg-slate-800 hover:scale-105"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                  
                  {/* Tooltip on Hover */}
                  {!isSelected && !occupied && (
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      <div className="bg-slate-800 text-white text-[9px] px-2 py-1 rounded border border-slate-600 whitespace-nowrap">
                        {r},{c}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>
      
      <div className="flex justify-center pt-1">
        <span className="text-[10px] font-mono text-slate-500 italic">
          {selectedRow !== null ? `Selected: Row ${selectedRow}, Col ${selectedCol}` : "Pilih posisi pada grid di atas"}
        </span>
      </div>
    </div>
  );
}
