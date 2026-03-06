"use client";

import React from "react";
import { useUserForm } from "@/hooks/useUserForm";
import Button from "@/components/ui/Button";
import { Clock, ShieldCheck } from "lucide-react";

interface UserFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const { form, onSubmit, isLoading, isEditing } = useUserForm({
    initialData,
    onSuccess,
  });

  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = form;

  const currentRole = watch("role");

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Nama Lengkap
          </label>
          <input
            {...register("name")}
            type="text"
            className={`block w-full px-4 py-2.5 bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
            placeholder="Contoh: John Doe"
          />
          {errors.name && (
            <p className="text-xs text-red-500 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className={`block w-full px-4 py-2.5 bg-gray-50 border ${errors.username ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
              placeholder="username"
            />
            {errors.username && (
              <p className="text-xs text-red-500 font-medium">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Password {!isEditing && "*"}
            </label>
            <input
              {...register("password")}
              type="password"
              className={`block w-full px-4 py-2.5 bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all`}
              placeholder={
                isEditing ? "(Kosongkan jika tidak ingin ganti)" : "••••••••"
              }
            />
            {errors.password && (
              <p className="text-xs text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Role / Hak Akses
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["ADMIN", "AUTHORIZED", "COOPERATED", "GUEST"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setValue("role", role as any)}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold tracking-widest transition-all border
                  ${
                    currentRole === role
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                      : "bg-white border-gray-200 text-gray-500 hover:border-blue-200 hover:bg-blue-50/30"
                  }
                `}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {currentRole === "GUEST" && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100/50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              <span>Akses Terbatas Waktu</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-amber-700 uppercase">
                  Mulai Dari
                </label>
                <input
                  {...register("accessibleFrom")}
                  type="datetime-local"
                  className="block w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-amber-700 uppercase">
                  Sampai Dengan
                </label>
                <input
                  {...register("accessibleUntil")}
                  type="datetime-local"
                  className="block w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-amber-700 uppercase">
                CCTV Stamp / Lokasi
              </label>
              <div className="relative">
                <input
                  {...register("cctvStamp")}
                  type="text"
                  className="block w-full pl-10 pr-4 py-2.5 bg-white border border-amber-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20"
                  placeholder="Contoh: ENTRY-NORTH-GATE-01"
                />
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        {onCancel && (
          <Button
            type="button"
            label="Batal"
            onClick={onCancel}
            className="bg-slate-400 text-white hover:bg-slate-500 border-none px-6"
          />
        )}
        <Button
          type="submit"
          label={
            isLoading
              ? "Menyimpan..."
              : isEditing
                ? "Update User"
                : "Tambah User"
          }
          disabled={isLoading}
          className="bg-blue-600 text-white hover:bg-blue-700 px-8 shadow-lg shadow-blue-100 font-bold"
        />
      </div>
    </form>
  );
};

export default UserForm;
