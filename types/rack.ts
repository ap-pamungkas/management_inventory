export interface Rack {
  id: number;
  name: string;
  code_rack: string;
  description?: string | unknown;
  createdAt: Date;
  updatedAt: Date;
}
