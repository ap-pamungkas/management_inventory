"use client";

import { useRackForm } from "@/hooks/useRackForm";
import type { Rack } from "@/types/rack";
import Button from "@/components/ui/Button";
import GridSelector from "@/components/ui/GridSelector";
import WarehouseGridDesigner from "../WarehouseGridDesigner";

interface RackFormProps {
  initialData?: Rack;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function RackForm({
  initialData,
  onSuccess,
  onCancel,
}: RackFormProps) {
  const { form, onSubmit, isLoading, isEditing } = useRackForm({
    initialData,
    onSuccess,
  });
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nama Rak
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          placeholder="Contoh: Rak Elektronik A"
          className={`block w-full rounded-lg border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } px-4 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500 font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="code_rack"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Kode Rak
        </label>
        <input
          type="text"
          id="code_rack"
          disabled
          placeholder="Otomatis (Contoh: R-1)"
          className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 sm:text-sm cursor-not-allowed transition-all"
        />
        {errors.code_rack && (
          <p className="mt-1 text-xs text-red-500 font-medium">
            {errors.code_rack.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Deskripsi (Opsional)
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={3}
          placeholder="Keterangan tambahan..."
          className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all"
        />
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span>Posisi & Ukuran di Gudang</span>
          <div className="h-px flex-grow bg-slate-200" />
        </h3>

        <WarehouseGridDesigner
          initialPosX={form.watch("posX")}
          initialPosY={form.watch("posY")}
          initialWidth={form.watch("width")}
          initialHeight={form.watch("height")}
          onChange={(pos) => {
            form.setValue("posX", pos.posX);
            form.setValue("posY", pos.posY);
            form.setValue("width", pos.width);
            form.setValue("height", pos.height);
          }}
        />

        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">
              X (%)
            </label>
            <input
              {...register("posX", { valueAsNumber: true })}
              type="number"
              step="0.1"
              className="block w-full rounded-lg border border-slate-300 px-3 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs transition-all text-center"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">
              Y (%)
            </label>
            <input
              {...register("posY", { valueAsNumber: true })}
              type="number"
              step="0.1"
              className="block w-full rounded-lg border border-slate-300 px-3 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs transition-all text-center"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">
              W (%)
            </label>
            <input
              {...register("width", { valueAsNumber: true })}
              type="number"
              step="0.1"
              className="block w-full rounded-lg border border-slate-300 px-3 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs transition-all text-center"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">
              H (%)
            </label>
            <input
              {...register("height", { valueAsNumber: true })}
              type="number"
              step="0.1"
              className="block w-full rounded-lg border border-slate-300 px-3 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs transition-all text-center"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">
          <span>Konfigurasi Grid Laci/Slot</span>
          <div className="h-px flex-grow bg-blue-200" />
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <GridSelector 
              maxRows={15} 
              maxCols={15}
              initialRows={form.watch("layoutRows")}
              initialCols={form.watch("layoutCols")}
              onChange={(rows: number, cols: number) => {
                form.setValue("layoutRows", rows);
                form.setValue("layoutCols", cols);
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 flex-grow w-full">
            <div>
              <label className="block text-[11px] font-bold text-blue-700 mb-1 uppercase">
                Jumlah Baris
              </label>
              <input
                {...register("layoutRows", { valueAsNumber: true })}
                type="number"
                min="1"
                max="20"
                className="block w-full rounded-lg border border-blue-200 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-blue-700 mb-1 uppercase">
                Jumlah Kolom
              </label>
              <input
                {...register("layoutCols", { valueAsNumber: true })}
                type="number"
                min="1"
                max="20"
                className="block w-full rounded-lg border border-blue-200 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all"
              />
            </div>
            <p className="col-span-2 text-[10px] text-blue-600 italic">
              * Gunakan grid di samping untuk memilih ukuran secara visual, atau isi manual di sini.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            label="Batal"
            onClick={onCancel}
            disabled={isLoading}
            className="bg-slate-400 text-white hover:bg-slate-500 border-none px-6"
          />
        )}
        <Button
          type="submit"
          label={
            isLoading
              ? "Menyimpan..."
              : isEditing
                ? "Perbarui Rak"
                : "Simpan Rak"
          }
          disabled={isLoading}
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 shadow-md shadow-blue-100"
        />
      </div>
    </form>
  );
}
