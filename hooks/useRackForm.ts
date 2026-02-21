"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRackSchema } from "@/lib/zod-schemas/rack";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UseRackFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export const useRackForm = ({
  initialData,
  onSuccess,
}: UseRackFormProps = {}) => {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const form = useForm<CreateRackSchema>({
    resolver: zodResolver(CreateRackSchema),
    defaultValues: {
      name: initialData?.name || "",
      code_rack: initialData?.code_rack || "",
      description: initialData?.description || "",
    },
  });

  const onSubmit = async (data: CreateRackSchema) => {
    const toastId = toast.loading(
      isEditing ? "Memperbarui data rak..." : "Menyimpan data rak...",
    );
    try {
      const response = await fetch("/api/rack", {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isEditing ? { ...data, id: initialData.id } : data,
        ),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          // Handle validation errors from Zod
          Object.keys(result.errors).forEach((key) => {
            form.setError(key as any, {
              type: "manual",
              message: result.errors[key][0],
            });
          });
          throw new Error("Terdapat kesalahan validasi");
        }
        throw new Error(result.error || "Gagal menyimpan data rak");
      }

      toast.success(
        isEditing ? "Rak berhasil diperbarui!" : "Rak berhasil ditambahkan!",
        { id: toastId },
      );
      if (!isEditing) form.reset();
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan sistem", { id: toastId });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: form.formState.isSubmitting,
    isEditing,
  };
};
