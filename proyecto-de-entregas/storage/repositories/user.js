import mongoose from "mongoose";

import FileRepository from "../managers/file.js";
import MemoryRepository from "../managers/memory.js";
import MongooseRepository from "../managers/mongoose.js";
import KnexRepository from "../managers/knex.js";

import mysqlConnection from '../connections/mysql.js';
import mongoConnection from '../connections/mongo.js';

import { STORAGE_METHOD } from '../../settings.js';

class UserRepositoryBuilder {

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
        const repository = new FileRepository('./datos/users.json');
        await repository.setup();
    
        return repository;
    }

    static async _buildMongo() {
        const repository = new MongooseRepository(
            mongoConnection,
            'users',
            new mongoose.Schema({
                id: {type: ObjectIdSchema, default: new ObjectId()},
                name: {type: String, required: true, max: 100},
                first_name: {type: String, max: 200},
                last_name: {type: String, max: 200},
                profile_pic: {type: String, max: 200}
            })
        )
        await repository.setup();
    
        return repository;
    }

    static async _buildMYSQL() {
        const repository = new KnexRepository(mysqlConnection, {
            name: 'users',
            builder: async (table) => {
                table.increments('id', { primaryKey: true })
                table.string('name')
                table.string('first_name')
                table.string('last_name')
                table.string('profile_pic')
            }
        });
        await repository.setup();
    
        return repository;
    }

}

export default UserRepositoryBuilder;