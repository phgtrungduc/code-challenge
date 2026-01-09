import { Request, Response, NextFunction } from 'express';
import { ResourceService } from '../services/ResourceService';

export class ResourceController {
  private resourceService: ResourceService;

  constructor(resourceService: ResourceService) {
    this.resourceService = resourceService;
  }

  /**
   * Create a new resource
   * POST /api/resources
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const resource = await this.resourceService.create(req.body);
      res.status(201).json({
        success: true,
        data: resource,
        message: 'Resource created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all resources with optional filters
   * GET /api/resources?category=xxx&status=xxx&search=xxx
   */
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { category, status, search } = req.query;
      let resources;

      if (search) {
        resources = await this.resourceService.searchByName(search as string);
      } else {
        const filters: any = {};
        if (category) filters.category = category;
        if (status) filters.status = status;
        
        resources = await this.resourceService.getAll(filters);
      }

      res.status(200).json({
        success: true,
        data: resources,
        count: resources.length
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get a resource by ID
   * GET /api/resources/:id
   */
  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid resource ID'
        });
        return;
      }

      const resource = await this.resourceService.getById(id);
      res.status(200).json({
        success: true,
        data: resource
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update a resource
   * PUT /api/resources/:id
   */
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid resource ID'
        });
        return;
      }

      const resource = await this.resourceService.update(id, req.body);
      res.status(200).json({
        success: true,
        data: resource,
        message: 'Resource updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a resource
   * DELETE /api/resources/:id
   */
  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid resource ID'
        });
        return;
      }

      await this.resourceService.delete(id);
      res.status(200).json({
        success: true,
        message: 'Resource deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get resources count with optional filters
   * GET /api/resources/count?category=xxx&status=xxx
   */
  count = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { category, status } = req.query;
      const filters: any = {};
      if (category) filters.category = category;
      if (status) filters.status = status;

      const count = await this.resourceService.count(filters);
      res.status(200).json({
        success: true,
        count
      });
    } catch (error) {
      next(error);
    }
  };
}
