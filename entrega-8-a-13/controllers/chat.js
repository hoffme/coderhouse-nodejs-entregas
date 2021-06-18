class ChatController {
    constructor(repository) {
        this.listeiners = [];

        this.repository = repository;
        this.repository.onCreate = (...p) => this.notify('create', ...p);
        this.repository.onUpdate = (...p) => this.notify('update', ...p);
        this.repository.onDelete = (...p) => this.notify('delete', ...p);
    }

    // Events

    notify(type, ...p) { this.listeiners.forEach(lis => lis.cb(type, ...p)) }

    addListeiner(id, cb) { this.listeiners.push({ id, cb }) }

    removeListeiner(id) { this.listeiners = this.listeiners.filter(lis => lis.id !== id) }

    // Methods

    async allMessages() { return await this.repository.getAll() }
    
    async addMessage(email, text) {
        const message = await this.repository.create({ 
            email, 
            text, 
            date: new Date()
        });

        return message;
    }
}

export default ChatController;