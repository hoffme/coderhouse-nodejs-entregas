import mongoose from "mongoose";

import FileRepository from "../managers/file.js";
import MemoryRepository from "../managers/memory.js";
import MongooseRepository from "../managers/mongoose.js";
import KnexRepository from "../managers/knex.js";

import mysqlConnection from '../connections/mysql.js';
import mongoConnection from '../connections/mongo.js';

import { STORAGE_METHOD } from '../../settings.js';

class ProductRepositoryBuilder {

    static build() {
        switch (STORAGE_METHOD) {
            case 'file': return this._buildFile();
            case 'mongo': return this._buildMongo();
            case 'mysql': return this._buildMYSQL(); 
            default: return this._buildMemory();
        }
    }

    static async _buildMemory() {
        const repository = new MemoryRepository();    
        return repository;
    }

    static async _buildFile() {
        const repository = new FileRepository('./datos/products.json');
        await repository.setup();
    
        return repository;
    }

    static async _buildMongo() {
        const repository = new MongooseRepository(
            mongoConnection,
            'productos',
            new mongoose.Schema({
                id: {type: ObjectIdSchema, default: new ObjectId()},
                name: {type: String, required: true, max: 100},
                thumbnail: {type: String, max: 200},
                price: {type: Number, required: true},
            })
        )
        await repository.setup();
    
        return repository;
    }

    static async _buildMYSQL() {
        const repository = new KnexRepository(mysqlConnection, {
            name: 'productos',
            builder: async (table) => {
                table.increments('id', { primaryKey: true })
                table.string('name')
                table.string('thumbnail')
                table.float('price')
            }
        });
        await repository.setup();
    
        return repository;
    }

}

export default ProductRepositoryBuilder;