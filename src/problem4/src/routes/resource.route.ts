import { Router } from 'express';
import ResourceController from '../controllers/resource.controller';

const router = Router();

// Create a new resource
router.post('/', ResourceController.create);

// Get resources count
router.get('/count', ResourceController.count);

// Get all resources (with optional filters)
router.get('/', ResourceController.findAll);

// Get a resource by ID
router.get('/:id', ResourceController.findOne);

// Update a resource
router.put('/:id', ResourceController.update);

// Delete a resource
router.delete('/:id', ResourceController.delete);

export default router;
