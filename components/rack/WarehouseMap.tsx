"use client";

import React from "react";
import { Rack } from "@/types/rack";

interface WarehouseMapProps {
  racks: Rack[];
  highlightRackId?: number;
  onRackClick?: (rack: Rack) => void;
  interactive?: boolean;
}

const WarehouseMap: React.FC<WarehouseMapProps> = ({
  racks,
  highlightRackId,
  onRackClick,
  interactive = false,
}) => {
  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl group">
      {/* Floor Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Map Labels */}
      <div className="absolute top-4 left-4 flex gap-4 text-[10px] font-bold tracking-tighter uppercase text-slate-500 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
          <span>Storage Zone A</span>
        </div>
      </div>

      {/* Racks Container */}
      <div className="absolute inset-8">
        {racks.map((rack) => {
          const isHighlighted = highlightRackId === rack.id;

          return (
            <div
              key={rack.id}
              onClick={() => onRackClick?.(rack)}
              className={`absolute transition-all duration-500 cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 group/rack
                ${
                  isHighlighted
                    ? "bg-indigo-600 border-white z-10 scale-105 shadow-[0_20px_50px_rgba(79,70,229,0.5)]"
                    : "bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20"
                }
              `}
              style={{
                left: `${rack.posX}%`,
                top: `${rack.posY}%`,
                width: `${rack.width}%`,
                height: `${rack.height}%`,
              }}
            >
              <div
                className={`text-[10px] font-black tracking-widest text-white drop-shadow-md select-none
                ${isHighlighted ? "animate-pulse" : ""}
              `}
              >
                {rack.code_rack}
              </div>

              {/* Box Top Detail (simulated depth) */}
              <div className="absolute -top-1 left-2 right-2 h-[2px] bg-white opacity-20 rounded-full" />

              {/* Highlight Pulse */}
              {isHighlighted && (
                <div className="absolute inset-0 rounded-lg animate-ping bg-white/20 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {!interactive && highlightRackId && (
        <div className="absolute bottom-4 right-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="px-3 py-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold shadow-lg shadow-indigo-500/40">
            RACK LOCATED
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseMap;
