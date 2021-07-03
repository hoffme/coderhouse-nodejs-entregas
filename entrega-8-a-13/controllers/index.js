import ProductsController from "./product.js";
import ChatController from "./chat.js";

import MemoryRepository from "../storage/repositories/memory.js";
import KnexRepository from "../storage/repositories/knex.js";

import mysqlConnection from "../storage/connections/mysql.js";

class Controllers {
    static products = undefined;
    static chat = undefined;

    static async setup() {
        const productsRepository = new MemoryRepository();
        Controllers.products = new ProductsController(productsRepository);

        const chatRepository = new KnexRepository(mysqlConnection, {
            name: 'chat',
            builder: async (table) => {
                table.increments('id', { primaryKey: true })
                table.string('email')
                table.string('text')
                table.date('date')
            }
        });
        await chatRepository.setup();

        Controllers.chat = new ChatController(chatRepository);
    }
}

export default Controllers