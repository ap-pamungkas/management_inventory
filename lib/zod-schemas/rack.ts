import { z } from "zod";

export const CreateRackSchema = z.object({
  name: z.string().min(1, "Nama rak wajib diisi"),
  code_rack: z.string().optional(),
  description: z.string().optional().nullable(),
  posX: z.number().default(0),
  posY: z.number().default(0),
  width: z.number().default(10),
  height: z.number().default(10),
});

export type CreateRackType = z.infer<typeof CreateRackSchema>;
