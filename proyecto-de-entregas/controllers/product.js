import Faker from 'faker';

import successResponse from '../routers/responses/success.js';
import errorResponse from '../routers/responses/errors.js';

class ProductsController {
    constructor(repository) {
        this.listeiners = [];

        this.repository = repository;
        
        this.repository.onCreate = (...p) => this.notify('create', ...p);
        this.repository.onUpdate = (...p) => this.notify('update', ...p);
        this.repository.onDelete = (...p) => this.notify('delete', ...p);
    }

    // Events

    notify(type, ...p) { this.listeiners.forEach(lis => lis.cb(type, ...p)) }

    addListeiner(id, cb) { this.listeiners.push({ id, cb }) }

    removeListeiner(id) { this.listeiners = this.listeiners.filter(lis => lis.id !== id) }

    // REST API

    async getAllTestREST(req, res) {
        const count = req.params.count || 10;

        const uuid = (a) => (
            a
              /* eslint-disable no-bitwise */
              ? ((Number(a) ^ Math.random() * 16) >> Number(a) / 4).toString(16)
              : (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, uuid)
        );        

        const products = [];
        for (let i = 0; i < count; i++) {
            products.push({
                id: uuid(),
                name: Faker.commerce.productName(),
                thumbnail: Faker.image.business(),
                price: Faker.commerce.price()
            })            
        }

        successResponse(res, products);
    }

    getAllREST(req, res) {
        this.getAll()
            .then(products => successResponse(res, products))
            .catch(err => errorResponse(res, err.message))
    }

    getByIdREST(req, res) {
        const id = req.params.id;

        this.getById(id)
            .then(product => successResponse(res, product))
            .catch(err => errorResponse(res, err.message, 404))
    }

    createREST(req, res) {
        const createParams = req.body;

        this.create(createParams)
            .then(product => successResponse(res, product))
            .catch(err => errorResponse(res, err.message))
    }

    updateREST(req, res) {
        const id = req.params.id;
        const update = req.body;
        
        this.update(id, update)
            .then(product => successResponse(res, product))
            .catch(err => errorResponse(res, err.message))
    }

    deleteREST(req, res) {
        const id = req.params.id;

        this.delete(id)
            .then(product => successResponse(res, product))
            .catch(err => errorResponse(res, err.message))
    }

    // Methods

    async getAll() { return await this.repository.getAll() }

    async getById(id) { return await this.repository.getById(id) }

    async create(createParams) { return await this.repository.create(createParams) }

    async update(id, update) { return await this.repository.update(id, update) }

    async delete(id) { return await this.repository.delete(id) }
}

export default ProductsController;