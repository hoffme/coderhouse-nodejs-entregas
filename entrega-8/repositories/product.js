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
}