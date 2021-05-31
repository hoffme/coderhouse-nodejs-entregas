import { Router } from 'express';

import ProductController from '../controllers/product.js';

const controller = new ProductController();

const router = Router();

router.get('/list', (...p) => controller.getAll(...p));
router.get('/list/:id', (...p) => controller.getById(...p));
router.post('/save', (...p) => controller.create(...p));

export default router;