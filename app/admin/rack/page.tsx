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
              className="bg-slate-700 text-white font-medium shadow-md shadow-slate-100 px-5"
            />
            <Button
              type="button"
              label="Tambah Rak"
              onClick={() => {
                setSelectedRack(undefined);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white font-medium shadow-md shadow-blue-100 px-5"
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
      >
        <RackForm
          initialData={selectedRack}
          onSuccess={() => {
            handleCloseModal();
            refresh();
          }}
          onCancel={handleCloseModal}
        />
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
