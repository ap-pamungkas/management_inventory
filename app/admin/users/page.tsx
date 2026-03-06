"use client";

import React, { useState } from "react";
import AdminLayout from "@/components/layout/Admin";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormModal from "@/components/ui/FormModal";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import UserTable from "@/components/user/UserTable";
import UserForm from "@/components/user/UserForm";
import SearchInput from "@/components/ui/SearchInput";
import LimitSelector from "@/components/ui/LimitSelector";
import Pagination from "@/components/ui/Pagination";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { useUsers } from "@/hooks/useUsers";

export default function UserManagementPage() {
  const {
    data: users,
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
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    setIsDeleting(true);
    const toastId = toast.loading("Menghapus user...");
    try {
      const response = await fetch(`/api/user/${selectedUser.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      toast.success("User berhasil dihapus", { id: toastId });
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      refresh();
    } catch (error) {
      toast.error("Gagal menghapus user", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Manajemen User
            </h1>
            <p className="text-sm text-slate-500">
              Kelola akses admin, mitra, dan guest organizer.
            </p>
          </div>
          <Button
            type="button"
            label="Tambah User"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => {
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white shadow-lg shadow-indigo-100 px-6 font-bold"
          />
        </div>

        <Card title="Daftar User">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Cari nama atau username..."
              className="sm:max-w-xs"
            />
            <LimitSelector value={limit} onChange={setLimit} />
          </div>

          <UserTable
            data={users}
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
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedUser ? "Edit User" : "Tambah User Baru"}
      >
        <UserForm
          initialData={selectedUser}
          onSuccess={() => {
            handleCloseModal();
            refresh();
          }}
          onCancel={handleCloseModal}
        />
      </FormModal>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus User"
        message={`Apakah Anda yakin ingin menghapus user "${selectedUser?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={isDeleting}
      />
    </AdminLayout>
  );
}
