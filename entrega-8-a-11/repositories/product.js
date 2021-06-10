export default class ProductRepository {
    constructor() {
        this.products = [];
    }

    _newId() {
        return this.products.length.toString();
    }

    create(product) {
        const newProduct = { ...product, id: this._newId() };

        this.products.push(newProduct);

        return newProduct;
    }

    getById(id) {
        if (this.products.length === 0) {
            throw new Error("no products loaded");
        }

        const product = this.products.find(product => product.id === id);

        if (!product) {
            throw new Error("product not found");
        }
        
        return product;
    }

    getAll() {
        if (this.products.length === 0) {
            throw new Error("no products loaded");
        }

        return this.products.map(product => ({ ...product }));
    }

    exist(id) {
        try {
            return !!this.getById(id);
        } catch {
            return false;
        }
    }

    update(id, update) {
        const product = this.getById(id);
        const productUpdated = {
            ...product,
            ...update,
            id
        }

        this.products = this.products.map(product => {
            if (product.id !== id) return product;
            return productUpdated;
        })

        return productUpdated;
    }

    delete(id) {
        const product = this.getById(id);

        this.products = this.products.filter(product => product.id !== id);

        return product;
    }
}