import express, { Application } from 'express';
import cors from 'cors';
import resourceRoutes from './routes/resource.route';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'CRUD API Server with Prisma',
    version: '1.0.0',
    endpoints: {
      resources: '/api/resources'
    }
  });
});

app.use('/api/resources', resourceRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
