"use client";

import React from "react";
import type { Item } from "@/types/item";
import Table from "@/components/ui/Table";
import Button from "../ui/Button";
import ItemTableSkeleton from "./ItemTableSkeleton";
import { Edit, Trash2, MapPin } from "lucide-react";

interface ItemTableProps {
  data: Item[];
  isLoading: boolean;
  page: number;
  limit: number | "all";
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
  onLocate: (item: Item) => void;
  onHover?: (item: Item | null) => void;
}

export default function ItemTable({
  data,
  isLoading,
  page,
  limit,
  onEdit,
  onDelete,
  onLocate,
  onHover,
}: ItemTableProps) {
  if (isLoading) {
    return <ItemTableSkeleton />;
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
        Tidak ada data barang ditemukan.
      </div>
    );
  }

  return (
    <Table>
      <thead className="bg-gray-50 text-gray-700">
        <tr>
          <th className="w-16 px-4 py-3 text-left font-semibold">No</th>
          <th className="px-4 py-3 text-left font-semibold">Nama Barang</th>
          <th className="px-4 py-3 text-left font-semibold">Stok</th>
          <th className="px-4 py-3 text-left font-semibold">Harga Beli</th>
          <th className="px-4 py-3 text-left font-semibold">Rak</th>
          <th className="px-4 py-3 text-center font-semibold">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr
            key={item.id}
            className="hover:bg-blue-50/50 transition-colors group cursor-default"
            onMouseEnter={() => onHover?.(item)}
            onMouseLeave={() => onHover?.(null)}
          >
            <td className="px-4 py-3 text-sm text-center">
              {limit === "all" ? index + 1 : (page - 1) * limit + index + 1}
            </td>
            <td className="px-4 py-3 text-sm font-medium text-gray-900">
              <div className="flex flex-col">
                <span>{item.name}</span>
                {item.description && (
                  <span className="text-xs text-gray-400 font-normal truncate max-w-[200px]">
                    {item.description}
                  </span>
                )}
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-center">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  item.stock > 0
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {item.stock}
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-600">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(item.purchase_price)}
            </td>
            <td className="px-4 py-3 text-sm">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                {item.rack?.name || "-"}
              </span>
            </td>
            <td className="px-4 py-3 text-sm">
              <div className="flex justify-center gap-1">
                <button
                  onClick={() => onLocate(item)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Lihat Lokasi"
                >
                  <MapPin size={18} />
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
