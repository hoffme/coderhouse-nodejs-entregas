class UserController {

    constructor(repository) {
        this.listeiners = [];

        this.repository = repository;

        this.repository.onCreate = user => this.notify('create', user);
        this.repository.onUpdate = user => this.notify('update', user);
        this.repository.onDelete = user => this.notify('delete', user);
    }

    // Events

    notify(type, ...p) { this.listeiners.forEach(lis => lis.cb(type, ...p)) }

    addListeiner(id, cb) { this.listeiners.push({ id, cb }) }

    removeListeiner(id) { this.listeiners = this.listeiners.filter(lis => lis.id !== id) }

    // Methods

    async find(id) {
        const users = await this.repository.getAll();
        return users.find(user => user.id === id);
    }

    async register(user) {
        return await this.repository.create(user);
    }
}

export default UserController;