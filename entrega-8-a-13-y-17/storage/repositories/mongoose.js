import mongoose from 'mongoose';

class MongooseRepository {
    constructor(info, collectionName, schema) {
        this.info = info;
        this.collectionName = collectionName;
        this.schema = schema;

        this.collection = mongoose.model(this.collectionName, this.schema);
        
        this.onCreate = undefined;
        this.onUpdate = undefined;
        this.onDelete = undefined;
    }

    async setup() {
        return new Promise((resolve, reject) => {
            mongoose.connect(
                this.info.uri, 
                this.info.options,
                err => {
                    if (err) reject(err);
                    resolve();
                })
        })
    }

    async create(model) {
        const inserted = await this.collection.create(model);

        if (this.onCreate) {
            const all = await this.getAll();

            try { this.onCreate(inserted, all) }
            catch (err) { console.error(err); }
        }

        return inserted;
    }

    async getById(id) {
        return await this.collection.findById(id);
    }

    async getAll() {
        return await this.collection.find({});
    }

    async exist(id) {
        return !!await this.findById(id);
    }

    async update(id, update) {
        const updated = await this.collection.updateOne({id}, {
            $set: update,
        })

        if (this.onUpdate) {
            const all = await this.getAll();

            try { this.onUpdate(updated, all) }
            catch (err) { console.error(err); }
        }

        return updated;
    }

    async delete(id) {
        const deleted = await this.collection.deleteOne({id});

        if (this.onDelete) {
            const all = await this.getAll();

            try { this.onDelete(deleted, all) }
            catch (err) { console.error(err); }
        }

        return deleted;
    }
}

export default MongooseRepository;