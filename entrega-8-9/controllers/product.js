import successResponse from '../responses/success.js';

import ProductRepository from '../repositories/product.js';

export default class Controller {
    constructor() {
        this.respository = new ProductRepository();
    }

    getAll(req, res) {
        const products = this.respository.getAll();

        successResponse(res, products);
    }

    getById(req, res) {
        const id = req.params.id;

        const product = this.respository.getById(id);

        successResponse(res, product);
    }

    create(req, res) {
        const createParams = req.body;

        console.log(req.body);
    
        const product = this.respository.create(createParams);

        successResponse(res, product);
    }

    update(req, res) {
        const id = req.params.id;
        const update = req.body;
        
        const productUpdated = this.respository.update(id, update);

        successResponse(res, productUpdated);
    }

    delete(req, res) {
        const id = req.params.id;

        const productDeleted = this.respository.delete(id);

        successResponse(res, productDeleted);
    }
}