import { z } from "zod";

export const CreateRackSchema = z.object({
  name: z.string().min(1, "Nama rak wajib diisi"),
  code_rack: z.string().optional(),
  description: z.string().optional().nullable(),
  posX: z.number().default(0),
  posY: z.number().default(0),
  width: z.number().default(10),
  height: z.number().default(10),
  layoutRows: z.number().min(1).default(1),
  layoutCols: z.number().min(1).default(1),
});

export type CreateRackType = z.infer<typeof CreateRackSchema>;
