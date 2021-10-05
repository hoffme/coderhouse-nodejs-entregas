import { Router } from 'express';

import Controllers from '../../controllers/index.js';

import successResponse from '../responses/success.js';
import errorResponse from '../responses/errors.js';

const router = Router();

router.get('/list', (req, res) => {
    Controllers.products.getAll()
        .then(products => successResponse(res, products))
        .catch(err => errorResponse(res, err.message))
});
router.get('/list/:id', (req, res) => {
    const id = req.params.id;

    Controllers.products.getById(id)
        .then(product => successResponse(res, product))
        .catch(err => errorResponse(res, err.message, 404))
});
router.post('/save', (req, res) => {
    const createParams = req.body;

    Controllers.products.create(createParams)
        .then(product => successResponse(res, product))
        .catch(err => errorResponse(res, err.message))
});
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
        const update = req.body;
        
    Controllers.products.update(id, update)
        .then(product => successResponse(res, product))
        .catch(err => errorResponse(res, err.message))
});
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Controllers.products.delete(id)
        .then(product => successResponse(res, product))
        .catch(err => errorResponse(res, err.message))
});

export default router;