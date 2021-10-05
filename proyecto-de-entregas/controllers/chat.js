import { normalizeMessage, normalizeMessages } from '../normalizr/chat/chat.js';

class ChatController {
    constructor(repository) {
        this.listeiners = [];

        this.repository = repository;
        this.repository.onCreate = (message, messages) => this.notify('create', normalizeMessage(message), normalizeMessages(messages));
        this.repository.onUpdate = (message, messages) => this.notify('update', normalizeMessage(message), normalizeMessages(messages));
        this.repository.onDelete = (message, messages) => this.notify('delete', normalizeMessage(message), normalizeMessages(messages));
    }

    notify(type, ...p) { this.listeiners.forEach(lis => lis.cb(type, ...p)) }

    addListeiner(id, cb) { this.listeiners.push({ id, cb }) }

    removeListeiner(id) { this.listeiners = this.listeiners.filter(lis => lis.id !== id) }

    async allMessages() { return normalizeMessages(await this.repository.getAll()) }
    
    async addMessage(message) {
        const result = await this.repository.create({ 
            ...message,
            date: new Date()
        });

        return normalizeMessage(result);
    }
}

export default ChatController;