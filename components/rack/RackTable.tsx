"use client";

import React from "react";
import Table from "@/components/ui/Table";
import type { Rack } from "@/types/rack";
import RackTableSkeleton from "./RackTableSkeleton";
import { Edit, Trash2 } from "lucide-react";

interface RackTableProps {
  data: Rack[];
  isLoading: boolean;
  page: number;
  limit: number | "all";
  onEdit: (rack: Rack) => void;
  onDelete: (rack: Rack) => void;
}

export default function RackTable({
  data,
  isLoading,
  page,
  limit,
  onEdit,
  onDelete,
}: RackTableProps) {
  if (isLoading) {
    return <RackTableSkeleton />;
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
        Tidak ada data rak ditemukan.
      </div>
    );
  }

  return (
    <Table>
      <thead className="bg-gray-50 text-gray-700">
        <tr>
          <th className="w-16 px-4 py-3 text-center font-semibold border-b border-gray-100">
            No
          </th>
          <th className="px-4 py-3 text-left font-semibold border-b border-gray-100">
            Nama Rak
          </th>
          <th className="px-4 py-3 text-left font-semibold border-b border-gray-100">
            Kode Rak
          </th>
          <th className="px-4 py-3 text-left font-semibold border-b border-gray-100">
            Deskripsi
          </th>
          <th className="px-4 py-3 text-center font-semibold border-b border-gray-100">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((rack, index) => (
          <tr
            key={rack.id}
            className="hover:bg-blue-50/50 transition-all group"
          >
            <td className="px-4 py-3 text-sm text-center text-slate-500">
              {limit === "all"
                ? index + 1
                : (page - 1) * Number(limit) + index + 1}
            </td>
            <td className="px-4 py-3 text-sm font-medium text-slate-900">
              {rack.name}
            </td>
            <td className="px-4 py-3 text-sm">
              <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded text-[11px] font-bold font-mono tracking-wider">
                {rack.code_rack}
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-slate-500 truncate max-w-[200px]">
              {(rack.description as string) || "-"}
            </td>
            <td className="px-4 py-3 text-sm text-center">
              <div className="flex justify-center gap-1">
                <button
                  onClick={() => onEdit(rack)}
                  className="p-2 text-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-sm rounded-lg transition-all"
                  title="Edit Rak"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(rack)}
                  className="p-2 text-slate-400 hover:bg-white hover:text-red-600 hover:shadow-sm rounded-lg transition-all"
                  title="Hapus Rak"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
