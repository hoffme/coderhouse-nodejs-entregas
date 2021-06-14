import { Router } from 'express';

import controller from '../controllers/product.js';

const router = Router();

router.get('/list', (...p) => controller.getAll(...p));
router.get('/list/:id', (...p) => controller.getById(...p));
router.post('/save', (...p) => controller.create(...p));
router.put('/update/:id', (...p) => controller.update(...p));
router.delete('/delete/:id', (...p) => controller.delete(...p));

export default router;