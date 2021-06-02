import { Router } from 'express';

import ErrorsMiddleware from '../responses/error.js';
import ProductRouter from './product.js';

const router = Router();

// adding routes

router.use('/products', ProductRouter);

// middleware errors

router.use(ErrorsMiddleware);

export default router;