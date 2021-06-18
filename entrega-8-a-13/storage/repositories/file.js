import FileStorage from '../connections/file.js';

class FileRepository {
    constructor(path) {
        this.last_id = 0;

        this.file = new FileStorage(path);

        this.onCreate = undefined;
        this.onUpdate = undefined;
        this.onDelete = undefined;
    }

    async setup() {
        let data = undefined;
        try {
            data = await this.file.get();
        } catch (e) {}

        if (data) {
            this.last_id = data.last_id;
        } else {
            await this.file.set({ last_id: 0, items: {} })
        }
    }

    _newId() {
        this.last_id += 1;
        return this.last_id.toString();
    }

    async create(model) {
        const newModel = { ...model, id: this._newId() };

        const items = (await this.file.get()).items;

        items[newModel.id] = newModel;

        await this.file.set({ last_id: this.last_id, items });

        if (this.onCreate) {
            try { this.onCreate(newModel, Array.from(Object.values(items))) }
            catch (err) { console.error(err); }
        }

        return newModel;
    }

    async getById(id) {
        const items = (await this.file.get()).items;
        
        const model = items[id];
        if (!model) throw new Error(`model with id={${id}} not found`);
        
        return model;
    }

    async getAll() {
        const items = (await this.file.get()).items;
        return Array.from(Object.values(items));
    }

    async exist(id) {
        try {
            return !!await this.getById(id);
        } catch {
            return false;
        }
    }

    async update(id, update) {
        const items = (await this.file.get()).items;
        items[id] = { ...(items[id]), ...update };

        await this.file.set({ last_id: this.last_id, items });

        if (this.onUpdate) {
            try { this.onUpdate(items[id], Array.from(Object.values(items))) }
            catch (err) { console.error(err); }
        }

        return items[id];
    }

    async delete(id) {
        const items = (await this.file.get()).items;

        const model = items[id];

        delete items[id];

        await this.file.set({ last_id: this.last_id, items });

        if (this.onDelete) {
            try { this.onDelete(model, Array.from(Object.values(items))) }
            catch (err) { console.error(err); }
        }

        return model;
    }
}

export default FileRepository;