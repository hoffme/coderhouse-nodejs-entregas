import ProductsController from "./product.js";
import ChatController from "./chat.js";

import MongooseRepository from "../storage/repositories/mongoose.js";
import mongoConnection from "../storage/connections/mongo.js";

import mongoose from 'mongoose';

class Controllers {
    static products = undefined;
    static chat = undefined;

    static async setup() {
        const ObjectIdSchema = mongoose.Schema.ObjectId;
        const ObjectId = mongoose.Types.ObjectId;

        const productsRepository = new MongooseRepository(
            mongoConnection,
            'productos',
            new mongoose.Schema({
                id: {type: ObjectIdSchema, default: new ObjectId()},
                name: {type: String, required: true, max: 100},
                thumbnail: {type: String, max: 200},
                price: {type: Number, required: true},
            })
        )
        await productsRepository.setup();
        Controllers.products = new ProductsController(productsRepository);

        const chatRepository = new MongooseRepository(
            mongoConnection,
            'chat',
            new mongoose.Schema({
                id: {type: ObjectIdSchema, default: new ObjectId()},
                email: {type: String, required: true, max: 100},
                text: {type: String, max: 200, required: true},
                date: {type: Date, required: true},
            })
        )
        await chatRepository.setup();
        Controllers.chat = new ChatController(chatRepository);
    }
}

export default Controllers