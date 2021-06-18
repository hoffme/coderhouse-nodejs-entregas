import { Router } from 'express';

import Controllers from '../controllers/index.js';

const router = Router();

router.get('/list', (...p) => Controllers.products.getAllREST(...p));
router.get('/list/:id', (...p) => Controllers.products.getByIdREST(...p));
router.post('/save', (...p) => Controllers.products.createREST(...p));
router.put('/update/:id', (...p) => Controllers.products.updateREST(...p));
router.delete('/delete/:id', (...p) => Controllers.products.deleteREST(...p));

export default router;