"use client";

import { useState } from "react";
import AdminLayout from "@/components/layout/Admin";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormModal from "@/components/ui/FormModal";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import ItemTable from "@/components/item/ItemTable";
import ItemForm from "@/components/item/ItemForm";
import LimitSelector from "@/components/ui/LimitSelector";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import { useItems } from "@/hooks/useItems";
import type { Item } from "@/types/item";
import toast from "react-hot-toast";
import WarehouseMap from "@/components/rack/WarehouseMap";
import { MapPin, Edit, Trash2 } from "lucide-react";
import { useRacks } from "@/hooks/useRacks";

export default function ItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [highlightRackId, setHighlightRackId] = useState<number | undefined>(
    undefined,
  );

  const { data: racks } = useRacks("all");

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
  } = useItems();

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    setIsDeleting(true);
    const toastId = toast.loading("Menghapus barang...");
    try {
      const response = await fetch("/api/item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedItem.id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal menghapus barang");
      }

      toast.success("Barang berhasil dihapus!", { id: toastId });
      setIsDeleteModalOpen(false);
      setSelectedItem(undefined);
      refresh();
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    if (!isModalOpen) setSelectedItem(undefined);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 w-full">
          <Card
            title="Daftar Barang"
            additionalButton={
              <Button
                type="button"
                label="Tambah Barang"
                onClick={() => {
                  setSelectedItem(undefined);
                  setIsModalOpen(true);
                }}
                className="bg-indigo-600 text-white font-medium shadow-md shadow-indigo-100 px-5"
              />
            }
          >
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Cari nama atau deskripsi barang..."
                className="sm:max-w-xs"
              />
              <LimitSelector value={limit} onChange={setLimit} />
            </div>

            <ItemTable
              data={data}
              isLoading={isLoading}
              page={page}
              limit={limit}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onLocate={(item) => {
                if (item.rackId) {
                  setHighlightRackId(item.rackId);
                } else {
                  toast.error("Barang ini belum memiliki lokasi rak.");
                }
              }}
              onHover={(item) => {
                if (item?.rackId) {
                  setHighlightRackId(item.rackId);
                } else {
                  setHighlightRackId(undefined);
                }
              }}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={total}
              limit={limit}
              onPageChange={setPage}
            />
          </Card>
        </div>

        <div className="w-full lg:w-80 xl:w-96 lg:sticky lg:top-24">
          <Card title="Stora Map">
            <div className="space-y-4">
              <div className="h-[400px] rounded-xl overflow-hidden border border-slate-100 shadow-inner">
                <WarehouseMap racks={racks} highlightRackId={highlightRackId} />
              </div>
              <p className="text-xs text-slate-400 text-center italic leading-relaxed">
                Hover baris tabel untuk melihat lokasi rak.
                <br />
                Titik bercahaya menunjukkan posisi rak.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedItem ? "Edit Barang" : "Tambah Barang Baru"}
      >
        <ItemForm
          initialData={selectedItem}
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
        title="Hapus Barang"
        message={`Apakah Anda yakin ingin menghapus barang "${selectedItem?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={isDeleting}
      />
    </AdminLayout>
  );
}
