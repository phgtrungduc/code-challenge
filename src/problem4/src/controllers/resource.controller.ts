import { BaseController } from './base.controller';
import ResourceService from '../services/resource.service';
import { Resource } from '../models/resource.model';

class ResourceController extends BaseController<Resource> {
  constructor() {
    super(ResourceService);
  }
}

export default new ResourceController();
