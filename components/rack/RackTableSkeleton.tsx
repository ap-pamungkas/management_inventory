"use client";

import React from "react";
import Skeleton from "../ui/Skeleton";

export default function RackTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 font-bold text-gray-700 w-16 text-center">
              No
            </th>
            <th className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 font-bold text-gray-700">
              Nama Rak
            </th>
            <th className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 font-bold text-gray-700">
              Kode Rak
            </th>
            <th className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 font-bold text-gray-700">
              Keterangan
            </th>
            <th className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 font-bold text-gray-700 text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="px-6 py-4 border-b border-white bg-white text-center">
                <Skeleton className="h-4 w-4 mx-auto" />
              </td>
              <td className="px-6 py-4 border-b border-white bg-white">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-6 py-4 border-b border-white bg-white">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-6 py-4 border-b border-white bg-white">
                <Skeleton className="h-4 w-48" />
              </td>
              <td className="px-6 py-4 border-b border-white bg-white">
                <div className="flex justify-center gap-2">
                  <Skeleton className="h-8 w-14 rounded-md" />
                  <Skeleton className="h-8 w-14 rounded-md" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
