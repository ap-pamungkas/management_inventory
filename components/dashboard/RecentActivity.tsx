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
        <h3 className="font-bold text-gray-900">Aktivitas Terbaru</h3>
        <Link
          href="/admin/items"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
        >
          Lihat Semua <ChevronRight size={14} />
        </Link>
      </div>
      <div className="divide-y divide-gray-50">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            Belum ada aktivitas terbaru.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
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
