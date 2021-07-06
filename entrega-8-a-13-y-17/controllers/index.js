import ProductsController from "./product.js";
import ChatController from "./chat.js";

import KnexRepository from "../storage/repositories/knex.js";

import mysqlConnection from "../storage/connections/mysql.js";

class Controllers {
    static products = undefined;
    static chat = undefined;

    static async setup() {
        const productsRepository = new KnexRepository(mysqlConnection, {
            name: 'productos',
            builder: async (table) => {
                table.increments('id', { primaryKey: true })
                table.string('name')
                table.string('thumbnail')
                table.float('price')
            }
        });
        await productsRepository.setup();

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