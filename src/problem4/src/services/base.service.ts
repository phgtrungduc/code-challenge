import { PrismaClient } from '@prisma/client';

export class BaseService<T> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async create(data: any) {
    return this.model.create({ data });
  }

  async findAll(filter?: any) {
    const where: any = {};
    
    // Convert query params to Prisma where clause
    if (filter) {
      Object.keys(filter).forEach((key) => {
        if (filter[key] !== undefined && filter[key] !== '') {
          // Handle search term for name field
          if (key === 'search') {
            where.name = { contains: filter[key] };
          } else {
            where[key] = filter[key];
          }
        }
      });
    }

    return this.model.findMany({ 
      where: Object.keys(where).length > 0 ? where : undefined 
    });
  }

  async findOne(id: number) {
    const result = await this.model.findUnique({ where: { id } });
    if (!result) {
      throw new Error(`Resource with id ${id} not found`);
    }
    return result;
  }

  async update(id: number, data: Partial<T>) {
    // Check if resource exists
    await this.findOne(id);
    return this.model.update({ where: { id }, data });
  }

  async delete(id: number) {
    // Check if resource exists
    await this.findOne(id);
    return this.model.delete({ where: { id } });
  }

  async count(filter?: any) {
    const where: any = {};
    
    if (filter) {
      Object.keys(filter).forEach((key) => {
        if (filter[key] !== undefined && filter[key] !== '') {
          where[key] = filter[key];
        }
      });
    }

    return this.model.count({ 
      where: Object.keys(where).length > 0 ? where : undefined 
    });
  }
}
