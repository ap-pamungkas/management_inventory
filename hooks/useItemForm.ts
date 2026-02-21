"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreateItemSchema } from "@/lib/zod-schemas/item";

interface UseItemFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export const useItemForm = ({
  initialData,
  onSuccess,
}: UseItemFormProps = {}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!initialData?.id;

  const form = useForm<CreateItemSchema>({
    resolver: zodResolver(CreateItemSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      stock: initialData?.stock || 0,
      purchase_price: initialData?.purchase_price || 0,
      rackId: initialData?.rackId || 0,
      description: initialData?.description || "",
    },
  });

  const onSubmit = async (data: CreateItemSchema) => {
    setIsLoading(true);
    const toastId = toast.loading(
      isEditing ? "Memperbarui data barang..." : "Menyimpan data barang...",
    );
    try {
      const response = await fetch("/api/item", {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isEditing ? { ...data, id: initialData.id } : data,
        ),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Terjadi kesalahan");
      }

      toast.success(
        isEditing
          ? "Data barang berhasil diperbarui!"
          : "Data barang berhasil disimpan!",
        { id: toastId },
      );

      if (onSuccess) onSuccess();
      if (!isEditing) form.reset();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Gagal menyimpan data", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    isEditing,
  };
};
