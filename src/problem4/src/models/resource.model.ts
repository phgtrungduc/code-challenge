export interface Resource {
  id?: number;
  name: string;
  description?: string | null;
  category?: string | null;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
