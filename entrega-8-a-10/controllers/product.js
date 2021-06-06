import successResponse from '../responses/success.js';

import ProductRepository from '../repositories/product.js';

class Controller {
    constructor() {
        this.repository = new ProductRepository();
    }

    getAll(req, res) {
        const products = this.repository.getAll();

        successResponse(res, products);
    }

    getById(req, res) {
        const id = req.params.id;

        const product = this.repository.getById(id);

        successResponse(res, product);
    }

    create(req, res) {
        const createParams = req.body;
    
        const product = this.repository.create(createParams);

        successResponse(res, product);
    }

    update(req, res) {
        const id = req.params.id;
        const update = req.body;
        
        const productUpdated = this.repository.update(id, update);

        successResponse(res, productUpdated);
    }

    delete(req, res) {
        const id = req.params.id;

        const productDeleted = this.repository.delete(id);

        successResponse(res, productDeleted);
    }

    viewProducts(req, res) {
        let products = undefined;
        let empty = true;
        
        try { 
            products = this.repository.getAll() 
            empty = false;
        } catch {}

        res.render('list_products', { products, empty })
    }

    viewCreateProduct(req, res) {
        res.render('create_product', {})
    }
}

const controller = new Controller();

export default controller;