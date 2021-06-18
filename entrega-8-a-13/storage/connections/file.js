import fs from 'fs';

class FileStorage {
    constructor(path) {
        this.path = path;
    }

    async get() {
        const text = await fs.promises.readFile(this.path)
        return JSON.parse(text.toString());
    }

    async set(obj) {
        const text = JSON.stringify(obj);
        return await fs.promises.writeFile(this.path, text);
    }
}

export default FileStorage;