import Router from 'koa-router';

import Controllers from '../controllers/index.js';

import successResponse from './responses/success.js';
import errorResponse from './responses/errors.js';

const router = new Router({
    prefix: '/api/article'
});

router.get('/', (ctx, next) => {
    Controllers.products.getAll()
        .then(products => successResponse(ctx, products))
        .catch(err => errorResponse(ctx, err.message))
        .finally(() => next)
});

router.get('/:id', (ctx, next) => {
    const id = ctx.params.id;

    Controllers.products.getById(id)
        .then(product => successResponse(ctx, product))
        .catch(err => errorResponse(ctx, err.message, 404))
        .finally(() => next)
});

router.post('/', (ctx, next) => {
    const createParams = ctx.request.body;

    Controllers.products.create(createParams)
        .then(product => successResponse(ctx, product))
        .catch(err => errorResponse(ctx, err.message))
        .finally(() => next)
});

router.put('/:id', (ctx, next) => {
    const id = ctx.params.id;
    const update = ctx.request.body;
        
    Controllers.products.update(id, update)
        .then(product => successResponse(ctx, product))
        .catch(err => errorResponse(ctx, err.message))
        .finally(() => next)
});

router.delete('/:id', (ctx, next) => {
    const id = ctx.params.id;

    Controllers.products.delete(id)
        .then(product => successResponse(ctx, product))
        .catch(err => errorResponse(ctx, err.message))
        .finally(() => next)
});

export default router;