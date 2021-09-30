import NotifierController from "./notifier.js";
import ProductsController from "./product.js";
import ChatController from "./chat.js";
import UserController from "./user.js";

import ProductRepositoryBuilder from "../storage/repositories/products.js";
import ChatRepositoryBuilder from "../storage/repositories/chat.js";
import UserRepositoryBuilder from "../storage/repositories/user.js";

class Controllers {
    static notifier = undefined;
    static products = undefined;
    static chat = undefined;
    static user = undefined;

    static async setup() {
        Controllers.notifier = new NotifierController();

        const productsRepository = await ProductRepositoryBuilder.build();
        Controllers.products = new ProductsController(productsRepository);

        const chatRepository =  await ChatRepositoryBuilder.build();
        Controllers.chat = new ChatController(chatRepository);

        const userRepository =  await UserRepositoryBuilder.build();
        Controllers.user = new UserController(userRepository);
    }
}

export default Controllers