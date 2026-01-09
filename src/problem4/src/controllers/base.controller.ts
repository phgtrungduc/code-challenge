import { Request, Response, NextFunction } from 'express';

export class BaseController<T> {
  protected service: any;

  constructor(service: any) {
    this.service = service;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.create(req.body);
      res.status(201).json({
        success: true,
        data: result,
        message: 'Resource created successfully'
      });
    } catch (err) {
      next(err);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.findAll(req.query);
      res.json({
        success: true,
        data: result,
        count: result.length
      });
    } catch (err) {
      next(err);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.findOne(Number(req.params.id));
      res.json({
        success: true,
        data: result
      });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.update(Number(req.params.id), req.body);
      res.json({
        success: true,
        data: result,
        message: 'Resource updated successfully'
      });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(Number(req.params.id));
      res.status(200).json({
        success: true,
        message: 'Resource deleted successfully'
      });
    } catch (err) {
      next(err);
    }
  };

  count = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await this.service.count(req.query);
      res.json({
        success: true,
        count
      });
    } catch (err) {
      next(err);
    }
  };
}
