import { Router } from 'express';

import ProductRouter from './product_view.js';

const router = Router();

// adding routes

router.use('/products', ProductRouter);


export default router;