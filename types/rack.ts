export interface Rack {
  id: number;
  name: string;
  code_rack: string;
  description?: string | unknown;
  posX: number;
  posY: number;
  width: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
}
