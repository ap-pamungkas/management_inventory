"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";

interface RecentActivityProps {
  items: any[];
}

export default function RecentActivity({ items }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-black text-slate-900 tracking-tight">
          Recent Activity
        </h3>
        <Link
          href="/admin/items"
          className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          View All <ChevronRight size={14} />
        </Link>
      </div>
      <div className="divide-y divide-slate-50">
        {items.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium text-sm">
            No recent activity detected.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-5 flex items-center gap-5 hover:bg-slate-50/50 transition-colors group"
            >
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Package size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  Barang Baru: {item.name}
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  Rak: {item.rack?.name || "-"} •{" "}
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
