import ProductsController from "./product.js";
import ChatController from "./chat.js";

import MemoryRepository from "../storage/repositories/memory.js";
import FileRepository from "../storage/repositories/file.js";

class Controllers {
    static products = undefined;
    static chat = undefined;

    static async setup() {
        const productsRepository = new MemoryRepository();
        Controllers.products = new ProductsController(productsRepository);

        const chatRepository = new FileRepository('datos/chat.db');
        await chatRepository.setup();
        Controllers.chat = new ChatController(chatRepository);
    }
}

export default Controllers