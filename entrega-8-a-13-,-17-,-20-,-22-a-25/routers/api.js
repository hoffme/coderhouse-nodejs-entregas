import { Router } from 'express';

import ErrorsMiddleware from './responses/error.js';
import auth from './middlewares/auth.js';

import ProductRouter from './product_api.js';
import AuthRouter from './auth_api.js';

const router = Router();

// adding routes

router.use('/products', auth(true), ProductRouter);
router.use('/auth', AuthRouter)

// middleware errors

router.use(ErrorsMiddleware);

export default router;