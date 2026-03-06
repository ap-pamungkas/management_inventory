import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Nama lengkap wajib diisi"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .or(z.literal("")),
  role: z.enum(["ADMIN", "AUTHORIZED", "COOPERATED", "GUEST"]),
  accessibleFrom: z.string().optional().nullable(),
  accessibleUntil: z.string().optional().nullable(),
  cctvStamp: z.string().optional().nullable(),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
