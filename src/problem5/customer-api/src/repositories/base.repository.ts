export interface IBaseRepository<T> {
  findAll(filters?: any): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: any): Promise<T>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<T>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  async findAll(filters?: any): Promise<T[]> {
    return await this.model.findMany({ where: filters });
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async create(data: any): Promise<T> {
    return await this.model.create({ data });
  }

  async update(id: string, data: any): Promise<T> {
    return await this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<T> {
    return await this.model.delete({ where: { id } });
  }
}
