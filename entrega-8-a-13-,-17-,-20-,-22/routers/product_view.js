import { Router } from 'express';

import Controllers from '../controllers/index.js';

const router = Router();

router.get('/', (...p) => Controllers.products.viewProducts(...p));
router.get('/test', (...p) => Controllers.products.viewProductsTest(...p));

export default router;