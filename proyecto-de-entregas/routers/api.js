import { Router } from 'express';

import auth from './middlewares/auth.js';

import ProductRouter from './endpoints/product_api.js';
import RandomsRouter from './endpoints/randoms_api.js';
import AuthRouter from './endpoints/auth_api.js';

const router = Router();

// adding routes

router.use('/products', auth(true), ProductRouter);
router.use('/randoms', RandomsRouter);
router.use('/auth', AuthRouter);

export default router;