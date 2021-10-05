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

    async getAll() { return await this.repository.getAll() }

    async getById(id) { return await this.repository.getById(id) }

    async create(createParams) { return await this.repository.create(createParams) }

    async update(id, update) { return await this.repository.update(id, update) }

    async delete(id) { return await this.repository.delete(id) }
}

export default ProductsController;