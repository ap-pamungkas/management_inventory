import { Rack } from "./rack";

export interface Item {
  id: number;
  name: string;
  stock: number;
  purchase_price: number;
  rackId: number;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  rack?: Rack;
}
