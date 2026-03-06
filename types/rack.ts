export interface Rack {
  id: number;
  name: string;
  code_rack: string;
  description?: string | null;
  posX: number;
  posY: number;
  width: number;
  height: number;
  layoutRows: number;
  layoutCols: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  items?: Item[];
}

export interface Item {
  id: number;
  name: string;
  stock: number;
  purchase_price: number;
  rackId: number;
  row?: number | null;
  col?: number | null;
  description?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
