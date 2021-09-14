import Controllers from '../controllers/index.js';

const root = {
    products: async () => {
        return await Controllers.products.getAll();
    },
    product: async ({ id }) => {
        return await Controllers.products.getById(id);
    },
    createProduct: async ({ fields }) => {
        return await Controllers.products.create(fields);
    }
}

export default root;