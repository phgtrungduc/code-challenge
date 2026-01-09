import { BaseService } from '../base/BaseService';
import { Resource } from '../entities/Resource';
import { ResourceRepository } from '../repositories/ResourceRepository';

export class ResourceService extends BaseService<Resource> {
  private resourceRepository: ResourceRepository;

  constructor(repository: ResourceRepository) {
    super(repository);
    this.resourceRepository = repository;
  }

  /**
   * Validate data before creating a resource
   */
  protected validateCreate(data: Partial<Resource>): void {
    if (!data.name || data.name.trim() === '') {
      throw new Error('Name is required');
    }

    if (data.name.length < 3) {
      throw new Error('Name must be at least 3 characters long');
    }

    if (data.name.length > 100) {
      throw new Error('Name must not exceed 100 characters');
    }
  }

  /**
   * Validate data before updating a resource
   */
  protected validateUpdate(data: Partial<Resource>): void {
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
  }

  /**
   * Get resources by category
   */
  async getByCategory(category: string): Promise<Resource[]> {
    return this.resourceRepository.findByCategory(category);
  }

  /**
   * Get resources by status
   */
  async getByStatus(status: string): Promise<Resource[]> {
    return this.resourceRepository.findByStatus(status);
  }

  /**
   * Search resources by name
   */
  async searchByName(searchTerm: string): Promise<Resource[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      throw new Error('Search term is required');
    }
    return this.resourceRepository.searchByName(searchTerm);
  }
}
