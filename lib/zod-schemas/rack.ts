import { z } from "zod";

export const CreateRackSchema = z.object({
  name: z.string().min(1, "Nama rak wajib diisi"),
  code_rack: z.string().optional(),
  description: z.string().optional().nullable(),
});

export type CreateRackSchema = z.infer<typeof CreateRackSchema>;
