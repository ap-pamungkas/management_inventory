import { z } from "zod";

export const CreateItemSchema = z.object({
  name: z.string().min(1, "Nama barang wajib diisi"),
  stock: z.coerce.number().min(0, "Stok tidak boleh negatif"),
  purchase_price: z.coerce.number().min(0, "Harga beli tidak boleh negatif"),
  rackId: z.coerce.number().min(1, "Rak wajib dipilih"),
  row: z.coerce
    .number()
    .min(0, "Baris tidak boleh negatif")
    .optional()
    .nullable(),
  col: z.coerce
    .number()
    .min(0, "Kolom tidak boleh negatif")
    .optional()
    .nullable(),
  description: z.string().optional(),
});

export type CreateItemSchema = z.infer<typeof CreateItemSchema>;
