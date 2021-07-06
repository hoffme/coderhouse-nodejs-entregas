import { Router } from 'express';

import Controllers from '../controllers/index.js';

const router = Router();

router.get('/', (...p) => Controllers.products.viewProducts(...p));

export default router;