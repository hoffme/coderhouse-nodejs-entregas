import { Router } from 'express';

import auth from './middlewares/auth.js';

import ProductRouter from './product_api.js';
import RandomsRouter from './randoms_api.js';
import AuthRouter from './auth_api.js';

const router = Router();

// adding routes

router.use('/products', auth(true), ProductRouter);
router.use('/randoms', RandomsRouter);
router.use('/auth', AuthRouter);

export default router;