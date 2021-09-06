import { normalize, schema } from 'normalizr';

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMessage = new schema.Entity('message', {
    author: schemaAuthor
})

const schemaMessages = new schema.Array(schemaMessage);

const normalizeMessage = (message) => {
    const result = normalize(message, schemaMessage);
    return result;
}

const normalizeMessages = (messages) => {
    const result = normalize(messages, schemaMessages);
    return result;
}

export {
    normalizeMessage,
    normalizeMessages
}