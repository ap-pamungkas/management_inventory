"use client";

import { useState } from "react";
import { useRacks } from "@/hooks/useRacks";
import type { Rack } from "@/types/rack";
import AdminLayout from "@/components/layout/Admin";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormModal from "@/components/ui/FormModal";
import RackForm from "@/components/rack/rackForm/RackForm";
import RackTable from "@/components/rack/RackTable";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import toast from "react-hot-toast";
import LimitSelector from "@/components/ui/LimitSelector";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import WarehouseMap from "@/components/rack/WarehouseMap";
import { Move } from "lucide-react";

export default function RackPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRack, setSelectedRack] = useState<Rack | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const {
    data,
    total,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    isLoading,
    refresh,
    totalPages,
  } = useRacks();

  const handleEdit = (rack: Rack) => {
    setSelectedRack(rack);
    setIsModalOpen(true);
  };

  const handleDelete = (rack: Rack) => {
    setSelectedRack(rack);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRack) return;

    setIsDeleting(true);
    const toastId = toast.loading("Menghapus rak...");
    try {
      const response = await fetch("/api/rack", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedRack.id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal menghapus rak");
      }

      toast.success("Rak berhasil dihapus!", { id: toastId });
      setIsDeleteModalOpen(false);
      setSelectedRack(undefined);
      refresh();
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRack(undefined);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    if (!isModalOpen) setSelectedRack(undefined);
  };

  return (
    <AdminLayout>
      <Card
        title="Daftar Rak"
        additionalButton={
          <div className="flex gap-2">
            <Button
              type="button"
              label="Visualisasi Peta"
              icon={<Move size={18} />}
              onClick={() => setIsMapOpen(true)}
              className="bg-slate-800 text-white font-medium shadow-md shadow-slate-200 px-5 hover:bg-black transition-all"
            />
            <Button
              type="button"
              label="Tambah Rak"
              onClick={() => {
                setSelectedRack(undefined);
                setIsModalOpen(true);
              }}
              className="bg-indigo-600 text-white font-medium shadow-md shadow-indigo-100 px-5 hover:bg-indigo-700 transition-all"
            />
          </div>
        }
      >
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari nama, kode, atau deskripsi..."
            className="sm:max-w-xs"
          />
          <LimitSelector value={limit} onChange={setLimit} />
        </div>

        <RackTable
          data={data}
          isLoading={isLoading}
          page={page}
          limit={limit}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={total}
          limit={limit}
          onPageChange={setPage}
        />
      </Card>

      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedRack ? "Edit Rak" : "Tambah Rak Baru"}
        size="5xl"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Bagian Kiri: Ilustrasi */}
          <div className="w-full lg:w-4/12 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-start pt-8 relative">
            <h4 className="text-xl font-bold text-slate-800 mb-2">
              Visualisasi 3D Rak
            </h4>
            <p className="text-sm text-slate-500 text-center mb-6">
              Keterangan berikut terhubung ke form di kanan.
            </p>

            <div
              className="relative w-[140px] h-[280px] mx-auto mt-4 mb-4 z-10"
              style={{ perspective: "800px" }}
            >
              {/* 3D RACK CUBE */}
              <div
                className="w-full h-full relative transition-transform duration-1000 shadow-2xl rounded-sm group-hover:rotate-y-12"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(-10deg) rotateY(26deg)",
                }}
              >
                {/* Left Face (Side) */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-[50px] bg-indigo-900 border-2 border-indigo-950 origin-left"
                  style={{ transform: "rotateY(90deg)" }}
                ></div>

                {/* Right Face (Side) */}
                <div
                  className="absolute top-0 bottom-0 right-0 w-[50px] bg-indigo-700 border-2 border-indigo-800 origin-right"
                  style={{ transform: "rotateY(-90deg)" }}
                ></div>

                {/* Top Face */}
                <div
                  className="absolute top-0 left-0 right-0 h-[50px] bg-indigo-600 border-2 border-indigo-700 origin-top"
                  style={{ transform: "rotateX(-90deg)" }}
                ></div>

                {/* Front Face - DRAWERS GRID (Kotak-kotak) */}
                <div
                  className="absolute inset-0 bg-slate-100 border-[3px] border-indigo-800 p-1.5 grid grid-cols-3 grid-rows-6 gap-1.5 rounded-sm"
                  style={{ transform: "translateZ(50px)" }}
                >
                  {[...Array(18)].map((_, i) =>
                    i === 7 ? ( // Highlighted Laci
                      <div
                        key={i}
                        className="bg-amber-100 border-[2px] border-amber-500 rounded-sm shadow-sm flex flex-col items-center justify-center relative overflow-visible"
                      >
                        <span className="text-[7px] text-amber-800 font-bold mb-0.5">
                          LACI
                        </span>
                        <div className="w-4 h-0.5 bg-amber-300 rounded-full"></div>

                        {/* Connection Point for Laci Arrow */}
                        <div className="absolute -right-2 top-1/2 w-2 h-2 rounded-full border border-amber-500 bg-white transform translate-x-1/2 -translate-y-1/2 z-20"></div>
                      </div>
                    ) : (
                      <div
                        key={i}
                        className="bg-white border border-slate-300 rounded-sm shadow-inner flex flex-col items-center justify-center"
                      >
                        <span className="text-[7px] text-slate-300 font-bold mb-0.5">
                          SLOT
                        </span>
                        <div className="w-4 h-0.5 bg-slate-200 rounded-full"></div>
                      </div>
                    ),
                  )}
                </div>

                {/* Connection Point for RAK Arrow at Top Right */}
                <div
                  className="absolute top-0 right-0 w-2 h-2 rounded-full border border-indigo-500 bg-white transform translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ transform: "translateZ(50px) translate(50%, -50%)" }}
                ></div>
              </div>

              {/* SVG Overlay Lines pointing EXACTLY to the correct form sections */}
              <svg
                className="absolute top-[-5px] left-[135px] w-[500px] h-[700px] pointer-events-none hidden lg:block z-50 overflow-visible"
                fill="none"
              >
                {/* Blue Line: From top-right of the 3D Rack -> Down -> Posisi & Ukuran Gudang (Y ≈ 260px) */}
                <path
                  d="M 30 -2 L 40 0 Q 50 0 50 10 L 50 310 Q 50 320 60 320 L 120 320"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <circle
                  cx="120"
                  cy="320"
                  r="5"
                  fill="#f8fafc"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />

                {/* Orange Line: From Laci -> Down -> Konfigurasi Grid Laci/Slot (Y ≈ 630px) */}
                <path
                  d="M -10 126 L 80 125 Q 90 125 90 130 L 90 690 Q 90 800 90 800 L 120 800"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <circle
                  cx="120"
                  cy="800"
                  r="4"
                  fill="#f8fafc"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />

                {/* Text Labels on Lines */}
                <text
                  x="60"
                  y="310"
                  fill="#4f46e5"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Rack
                </text>
                <text
                  x="100"
                  y="780"
                  fill="#d97706"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Laci
                </text>
              </svg>
            </div>

            <div className="mt-8 text-[11px] text-slate-600 bg-white p-4 rounded-lg border border-slate-200 shadow-sm w-full relative z-20">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 relative">
                  {/* Vertical Line from text connecting to the top dashed arrow */}
                  <div
                    className="absolute left-[20px] top-4 w-[120px] h-[340px] border-l-2 border-b-2 border-slate-400 opacity-40 rounded-bl-xl pointer-events-none hidden lg:block"
                    style={{ transform: "translateY(-340px)" }}
                  ></div>

                  <span className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center flex-shrink-0 font-bold mt-0.5 shadow-sm">
                    1
                  </span>
                  <span>
                    <strong>Lemari Rak (Keseluruhan):</strong> Gunakan form di
                    atas untuk mengatur form, dan posisi rak gabungan secara
                    keseluruhan.
                  </span>
                </li>
                <li className="flex items-start gap-3 relative">
                  {/* Horizontal Line from text #2 connecting to the right */}
                  <div className="absolute left-[30px] top-3 w-[120px] border-t-2 border-slate-400 opacity-40 pointer-events-none hidden lg:block"></div>

                  <span className="w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center flex-shrink-0 font-bold mt-0.5 shadow-sm">
                    2
                  </span>
                  <span>
                    <strong>Laci / Slot (Kotak Dalam):</strong> Gunakan
                    konfigurasi di bagian bawah layar untuk membagi rak menjadi
                    kotak-kotak kecil sebagai laci penyimpanan.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bagian Kanan: Form */}
          <div className="w-full lg:w-8/12 flex flex-col justify-center">
            <RackForm
              initialData={selectedRack}
              existingRacks={data}
              onSuccess={() => {
                handleCloseModal();
                refresh();
              }}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      </FormModal>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Hapus Rak"
        message={`Apakah Anda yakin ingin menghapus rak "${selectedRack?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={isDeleting}
      />

      <FormModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        title="Peta Warehouse (Layout Rak)"
        size="2xl"
      >
        <div className="space-y-4">
          <WarehouseMap
            racks={data}
            interactive
            onRackClick={(rack) => {
              handleEdit(rack as any);
              setIsMapOpen(false);
            }}
          />
          <p className="text-xs text-slate-500 text-center italic">
            Klik pada rak untuk mengedit posisi atau detail.
          </p>
        </div>
      </FormModal>
    </AdminLayout>
  );
}
