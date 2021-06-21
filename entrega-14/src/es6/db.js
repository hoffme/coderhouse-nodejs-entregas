class DB {
    constructor() {
        this.data = {}
    }

    getAll() {
        return Array.from(Object.values(this.data));
    }

    get(id) {
        return this.data[id];
    }

    set(id, value) {
        this.data[id] = value
    }

    remove(id) {
        delete this.data[id];
    }
}

export default DB;