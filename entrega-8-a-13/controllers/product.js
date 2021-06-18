import successResponse from '../routers/responses/success.js';

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

    async getAllREST(req, res) {
        const products = await this.getAll();
        successResponse(res, products);
    }

    async getByIdREST(req, res) {
        const id = req.params.id;
        const product = this.getById(id);
        successResponse(res, product);
    }

    async createREST(req, res) {
        const createParams = req.body;
        const product = await this.create(createParams);
        successResponse(res, product);
    }

    async updateREST(req, res) {
        const id = req.params.id;
        const update = req.body;
        const productUpdated = await this.update(id, update);
        successResponse(res, productUpdated);
    }

    async deleteREST(req, res) {
        const id = req.params.id;
        const productDeleted = await this.delete(id);
        successResponse(res, productDeleted);
    }

    // Methods

    async getAll() { return await this.repository.getAll() }

    async getById(id) { return await this.repository.getById(id) }

    async create(createParams) { return await this.repository.create(createParams) }

    async update(id, update) { return await this.repository.update(id, update) }

    async delete(id) { return await this.repository.delete(id) }

    // WEB view

    viewProducts(req, res) {
        res.render('editor');
    }
}

export default ProductsController;