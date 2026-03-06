"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema, CreateUserType } from "@/lib/zod-schemas/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UseUserFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export const useUserForm = ({
  initialData,
  onSuccess,
}: UseUserFormProps = {}) => {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema) as any,
    defaultValues: {
      name: initialData?.name ?? "",
      username: initialData?.username ?? "",
      password: "",
      role: initialData?.role ?? "GUEST",
      accessibleFrom: initialData?.accessibleFrom
        ? new Date(initialData.accessibleFrom).toISOString().slice(0, 16)
        : "",
      accessibleUntil: initialData?.accessibleUntil
        ? new Date(initialData.accessibleUntil).toISOString().slice(0, 16)
        : "",
      cctvStamp: initialData?.cctvStamp ?? "",
    },
  });

  const onSubmit: SubmitHandler<CreateUserType> = async (data) => {
    const toastId = toast.loading(
      isEditing ? "Memperbarui data user..." : "Menyimpan data user...",
    );
    try {
      const response = await fetch(
        isEditing ? `/api/user/${initialData.id}` : "/api/user",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            form.setError(key as any, {
              type: "manual",
              message: result.errors[key][0],
            });
          });
          throw new Error("Terdapat kesalahan validasi");
        }
        throw new Error(result.error || "Gagal menyimpan data user");
      }

      toast.success(
        isEditing ? "User berhasil diperbarui!" : "User berhasil ditambahkan!",
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
    onSubmit: form.handleSubmit(onSubmit as any),
    isLoading: form.formState.isSubmitting,
    isEditing,
  };
};
