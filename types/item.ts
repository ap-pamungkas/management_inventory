import { Rack } from "./rack";

export interface Item {
  id: number;
  name: string;
  stock: number;
  purchase_price: number;
  rackId: number;
  row?: number | null;
  col?: number | null;
  description?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  rack?: Rack;
}
