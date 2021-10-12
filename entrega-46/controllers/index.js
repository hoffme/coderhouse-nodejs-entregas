import ProductsController from "./product.js";

import ProductRepositoryBuilder from "../storage/repositories/products.js";

class Controllers {
    static products = undefined;

    static async setup() {
        const productsRepository = await ProductRepositoryBuilder.build();
        Controllers.products = new ProductsController(productsRepository);
    }
}

export default Controllers