import ProductsController from "./product.js";
import ChatController from "./chat.js";
import UserController from "./user.js";

import FileRepository from "../storage/repositories/file.js";

class Controllers {
    static products = undefined;
    static chat = undefined;
    static user = undefined;

    static async setup() { 
        const productsRepository = new FileRepository('./datos/products.json');
        await productsRepository.setup();
        Controllers.products = new ProductsController(productsRepository);

        const chatRepository = new FileRepository('./datos/chat.json');
        await chatRepository.setup();
        Controllers.chat = new ChatController(chatRepository);

        const userRepository = new FileRepository('./datos/user.json');
        await userRepository.setup();
        Controllers.user = new UserController(userRepository);
    }
}

export default Controllers