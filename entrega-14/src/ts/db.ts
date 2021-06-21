class DB {

    private readonly data: { [key:string]: any }

    constructor() {
        this.data = {}
    }

    getAll() {
        return Array.from(Object.values(this.data));
    }

    get(id: string) {
        return this.data[id];
    }

    set(id: string, value: any) {
        this.data[id] = value
    }

    remove(id: string) {
        delete this.data[id];
    }
}

export default DB;