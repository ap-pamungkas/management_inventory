"use client";

import React from "react";

interface LimitSelectorProps {
  value: number | "all";
  onChange: (limit: number | "all") => void;
}

const limits: { label: string; value: number | "all" }[] = [
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
  { label: "Semua", value: "all" },
];

export default function LimitSelector({ value, onChange }: LimitSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 whitespace-nowrap">
        Tampilkan:
      </span>
      <select
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "all" ? "all" : parseInt(val));
        }}
        className="block px-2 py-1.5 text-sm text-center font-medium text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer hover:border-gray-400"
      >
        {limits.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
