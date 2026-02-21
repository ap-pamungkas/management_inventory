"use client";

import React from "react";
import type { Item } from "@/types/item";
import Table from "@/components/ui/Table";
import Button from "../ui/Button";
import ItemTableSkeleton from "./ItemTableSkeleton";

interface ItemTableProps {
  data: Item[];
  isLoading: boolean;
  page: number;
  limit: number;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function ItemTable({
  data,
  isLoading,
  page,
  limit,
  onEdit,
  onDelete,
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
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm text-center">
              {(page - 1) * limit + index + 1}
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
              <div className="flex justify-center gap-2">
                <Button
                  label="Edit"
                  onClick={() => onEdit(item)}
                  className="bg-slate-400 text-white hover:bg-slate-500 border-none px-3 py-1.5 text-xs"
                />
                <Button
                  label="Hapus"
                  onClick={() => onDelete(item)}
                  className="bg-red-500 text-white hover:bg-red-600 border-none px-3 py-1.5 text-xs"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
