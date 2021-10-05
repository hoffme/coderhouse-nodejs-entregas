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
    },
    updateProduct: async ({ input }) => {
        const fields = { ...input };
        delete fields.id;

        return await Controllers.products.update(input.id, fields);
    },
    deleteProduct: async ({ id }) => {
        return await Controllers.products.delete(id);
    }
}

export default root;