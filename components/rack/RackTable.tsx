"use client";

import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import type { Rack } from "@/types/rack";
import RackTableSkeleton from "./RackTableSkeleton";

interface RackTableProps {
  data: Rack[];
  isLoading: boolean;
  page: number;
  limit: number;
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
          <th className="w-16 px-4 py-3 text-left font-semibold">No</th>
          <th className="px-4 py-3 text-left font-semibold">Nama Rak</th>
          <th className="px-4 py-3 text-left font-semibold">Kode Rak</th>
          <th className="px-4 py-3 text-left font-semibold">Deskripsi</th>
          <th className="px-4 py-3 text-center font-semibold">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((rack, index) => (
          <tr key={rack.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm">
              {(page - 1) * limit + index + 1}
            </td>
            <td className="px-4 py-3 text-sm font-medium">{rack.name}</td>
            <td className="px-4 py-3 text-sm">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-mono">
                {rack.code_rack}
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-[200px]">
              {(rack.description as string) || "-"}
            </td>
            <td className="px-4 py-3 text-sm">
              <div className="flex justify-center gap-2">
                <Button
                  label="Edit"
                  onClick={() => onEdit(rack)}
                  className="bg-slate-400 text-white hover:bg-slate-500 border-none px-3 py-1.5 text-xs"
                />
                <Button
                  label="Hapus"
                  onClick={() => onDelete(rack)}
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
