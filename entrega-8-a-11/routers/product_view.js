import { Router } from 'express';

import controller from '../controllers/product.js';

const router = Router();

router.get('/list', (...p) => controller.viewProducts(...p));
router.get('/create', (...p) => controller.viewCreateProduct(...p));

export default router;