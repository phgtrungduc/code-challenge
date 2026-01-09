import prisma from '../prisma';
import { BaseService } from './base.service';
import { Resource } from '../models/resource.model';

class ResourceService extends BaseService<Resource> {
  constructor() {
    super(prisma, prisma.resource);
  }

  // Add custom validation
  async create(data: any) {
    // Validate name
    if (!data.name || data.name.trim() === '') {
      throw new Error('Name is required');
    }

    if (data.name.length < 3) {
      throw new Error('Name must be at least 3 characters long');
    }

    if (data.name.length > 100) {
      throw new Error('Name must not exceed 100 characters');
    }

    return super.create(data);
  }

  async update(id: number, data: any) {
    // Validate name if provided
    if (data.name !== undefined) {
      if (data.name.trim() === '') {
        throw new Error('Name cannot be empty');
      }

      if (data.name.length < 3) {
        throw new Error('Name must be at least 3 characters long');
      }

      if (data.name.length > 100) {
        throw new Error('Name must not exceed 100 characters');
      }
    }

    return super.update(id, data);
  }
}

export default new ResourceService();
