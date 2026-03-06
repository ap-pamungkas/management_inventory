"use client";

import React from "react";
import { Clock, ShieldCheck, Trash2, Edit } from "lucide-react";
import Table from "@/components/ui/Table";

interface UserItem {
  id: number;
  name: string;
  username: string;
  role: string;
  accessibleFrom?: string | null;
  accessibleUntil?: string | null;
  cctvStamp?: string | null;
  createdAt: string;
}

interface UserTableProps {
  data: UserItem[];
  isLoading: boolean;
  page: number;
  limit: number | "all";
  onEdit: (user: UserItem) => void;
  onDelete: (user: UserItem) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  data,
  isLoading,
  page,
  limit,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 w-full bg-slate-50 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
        Tidak ada data user ditemukan.
      </div>
    );
  }

  return (
    <Table>
      <thead className="bg-gray-50 text-gray-700">
        <tr className="text-left py-3 border-b border-gray-100">
          <th className="w-16 px-4 py-3 font-semibold text-center">No</th>
          <th className="px-4 py-3 font-semibold">User</th>
          <th className="px-4 py-3 font-semibold">Role</th>
          <th className="px-4 py-3 font-semibold">Access Info</th>
          <th className="px-4 py-3 font-semibold text-center">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((user, index) => (
          <tr
            key={user.id}
            className="hover:bg-blue-50/50 transition-all group"
          >
            <td className="px-4 py-4 text-sm text-center text-slate-500 font-medium">
              {limit === "all"
                ? index + 1
                : (page - 1) * Number(limit) + index + 1}
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold group-hover:scale-110 transition-transform">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 leading-tight">
                    {user.name}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    @{user.username}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase
                ${
                  user.role === "ADMIN"
                    ? "bg-red-100 text-red-600"
                    : user.role === "AUTHORIZED"
                      ? "bg-blue-100 text-blue-600"
                      : user.role === "COOPERATED"
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-slate-100 text-slate-600"
                }
              `}
              >
                {user.role}
              </span>
            </td>
            <td className="px-4 py-4">
              {user.role === "GUEST" &&
              (user.accessibleFrom || user.accessibleUntil) ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-bold font-mono">
                    <Clock className="w-3 h-3 text-blue-500" />
                    {user.accessibleFrom
                      ? new Date(user.accessibleFrom).toLocaleTimeString(
                          "id-ID",
                          { hour: "2-digit", minute: "2-digit" },
                        )
                      : "-"}{" "}
                    -
                    {user.accessibleUntil
                      ? new Date(user.accessibleUntil).toLocaleTimeString(
                          "id-ID",
                          { hour: "2-digit", minute: "2-digit" },
                        )
                      : "-"}
                  </div>
                  {user.cctvStamp && (
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      {user.cctvStamp}
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Full Access
                </span>
              )}
            </td>
            <td className="px-4 py-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() => onEdit(user)}
                  className="p-2 text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm rounded-lg transition-all"
                  title="Edit User"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="p-2 text-slate-600 hover:bg-white hover:text-red-600 hover:shadow-sm rounded-lg transition-all"
                  title="Hapus User"
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
};

export default UserTable;
