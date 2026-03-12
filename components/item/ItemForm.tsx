"use client";

import React, { useEffect, useState } from "react";
import { useItemForm } from "@/hooks/useItemForm";
import type { Item } from "@/types/item";
import type { Rack } from "@/types/rack";
import Button from "@/components/ui/Button";
import ItemGridSelector from "./ItemGridSelector";

interface ItemFormProps {
  initialData?: Item;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ItemForm({
  initialData,
  onSuccess,
  onCancel,
}: ItemFormProps) {
  const { form, onSubmit, isLoading, isEditing } = useItemForm({
    initialData,
    onSuccess,
  });

  const [racks, setRacks] = useState<Rack[]>([]);
  const [isLoadingRacks, setIsLoadingRacks] = useState(true);

  const {
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    const fetchRacks = async () => {
      try {
        const response = await fetch("/api/rack?limit=all");
        if (!response.ok) throw new Error("Gagal mengambil data rak");
        const result = await response.json();
        setRacks(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingRacks(false);
      }
    };
    fetchRacks();
  }, []);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-4">
        {/* Nama Barang */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Nama Barang
          </label>
          <input
            {...register("name")}
            type="text"
            className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
            placeholder="Contoh: Laptop ASUS ROG"
          />
          {errors.name && (
            <p className="text-xs text-red-500 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Stok */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Stok</label>
            <input
              {...register("stock")}
              type="number"
              className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
              placeholder="0"
            />
            {errors.stock && (
              <p className="text-xs text-red-500 font-medium">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Harga Beli */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Harga Beli
            </label>
            <input
              {...register("purchase_price")}
              type="number"
              className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
              placeholder="0"
            />
            {errors.purchase_price && (
              <p className="text-xs text-red-500 font-medium">
                {errors.purchase_price.message}
              </p>
            )}
          </div>
        </div>

        {/* Rak */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Pilih Rak
          </label>
          <select
            {...register("rackId")}
            className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat"
            disabled={isLoadingRacks}
          >
            <option value="">Pilih Rak...</option>
            {racks.map((rack) => (
              <option key={rack.id} value={rack.id}>
                {rack.name} ({rack.code_rack})
              </option>
            ))}
          </select>
          {errors.rackId && (
            <p className="text-xs text-red-500 font-medium">
              {errors.rackId.message}
            </p>
          )}
        </div>

        {/* Row & Column (Positioning) with Visual Selector */}
        {form.watch("rackId") && racks.find(r => r.id === Number(form.watch("rackId"))) && (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">
              Posisi di Dalam Rak
            </label>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                {(() => {
                  const selectedRack = racks.find(r => r.id === Number(form.watch("rackId")));
                  if (!selectedRack) return null;
                  return (
                    <ItemGridSelector
                      rows={selectedRack.layoutRows}
                      cols={selectedRack.layoutCols}
                      selectedRow={form.watch("row") ?? null}
                      selectedCol={form.watch("col") ?? null}
                      onSelect={(r, c) => {
                        form.setValue("row", r);
                        form.setValue("col", c);
                      }}
                      occupiedSlots={selectedRack.items?.map(item => ({
                        row: item.row!,
                        col: item.col!,
                        name: item.name
                      })).filter(item => item.row !== null && item.col !== null) || []}
                    />
                  );
                })()}
              </div>
              
              <div className="grid grid-cols-2 gap-4 flex-grow">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Row (Baris)
                  </label>
                  <input
                    {...register("row", { valueAsNumber: true })}
                    type="number"
                    className="block w-full px-4 py-2 bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-center"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Column (Kolom)
                  </label>
                  <input
                    {...register("col", { valueAsNumber: true })}
                    type="number"
                    className="block w-full px-4 py-2 bg-indigo-50/50 border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-center"
                    placeholder="0"
                  />
                </div>
                <p className="col-span-2 text-[10px] text-slate-500 italic">
                  * Klik pada grid untuk memilih posisi secara visual.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Manual inputs if no rack selected or as fallback */}
        {!form.watch("rackId") && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Row (Baris)</label>
              <input
                {...register("row", { valueAsNumber: true })}
                type="number"
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                placeholder="0"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Column (Kolom)</label>
              <input
                {...register("col", { valueAsNumber: true })}
                type="number"
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>
        )}

        {/* Deskripsi */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">
            Deskripsi (Opsional)
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
            placeholder="Tambahkan catatan tambahan..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            label="Batal"
            onClick={onCancel}
            className="bg-slate-400 text-white hover:bg-slate-500 px-6 border-none"
          />
        )}
        <Button
          type="submit"
          label={
            isLoading
              ? "Menyimpan..."
              : isEditing
                ? "Perbarui Barang"
                : "Simpan Barang"
          }
          disabled={isLoading || isLoadingRacks}
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 shadow-md shadow-blue-100 font-semibold"
        />
      </div>
    </form>
  );
}
