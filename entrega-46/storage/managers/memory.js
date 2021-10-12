class MemoryRepository {
    constructor() {
        this.objs = [];

        this.onCreate = undefined;
        this.onUpdate = undefined;
        this.onDelete = undefined;
    }

    _newId() {
        return this.objs.length.toString();
    }

    create(obj) {
        const newobj = { ...obj, id: this._newId() };

        this.objs.push(newobj);

        if (this.onCreate) {
            try { this.onCreate(newobj, this.objs) }
            catch (err) { console.error(err); }
        }

        return newobj;
    }

    getById(id) {
        const obj = this.objs.find(obj => obj.id === id);

        if (!obj) {
            throw new Error("obj not found");
        }
        
        return obj;
    }

    getAll() {
        return this.objs.map(obj => ({ ...obj }));
    }

    exist(id) {
        try { return !!this.getById(id) } 
        catch { return false }
    }

    update(id, update) {
        const obj = this.getById(id);
        const objUpdated = { ...obj, ...update, id }

        this.objs = this.objs.map(obj => obj.id !== id ? obj : objUpdated);

        if (this.onUpdate) {
            try { this.onUpdate(obj, this.objs) }
            catch (err) { console.error(err); }
        }

        return objUpdated;
    }

    delete(id) {
        const obj = this.getById(id);

        this.objs = this.objs.filter(obj => obj.id !== id);

        if (this.onDelete) {
            try { this.onDelete(obj, this.objs) }
            catch (err) { console.error(err); }
        }

        return obj;
    }
}

export default MemoryRepository;