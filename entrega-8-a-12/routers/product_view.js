import { Router } from 'express';

import controller from '../controllers/product.js';

const router = Router();

router.get('/', (...p) => controller.viewProducts(...p));

export default router;