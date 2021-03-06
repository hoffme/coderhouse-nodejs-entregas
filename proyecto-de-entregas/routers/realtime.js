import Controllers from '../controllers/index.js';

const realtime = (io) => {
    io.on('connection', async socket => {
        const intialData = { messages: [], products: [] };

        try { intialData.messages = await Controllers.chat.allMessages() } 
        catch (err) { console.log(err) }

        try { intialData.products = await Controllers.products.getAll() } 
        catch (err) { console.log(err) }

        socket.emit('initial_data', intialData);

        socket.on('message', message => {
            if (message.text.toLowerCase().includes('admin')) {
                Controllers.notifier.adminMessageNotify(message);
            }

            Controllers.chat.addMessage(message);
        })
    })

    Controllers.products.addListeiner('realtime', (typeEvent, product, products) => {
        io.sockets.emit('products', products);
    })

    Controllers.chat.addListeiner('realtime', (typeEvent, message, messages) => {
        io.sockets.emit('chat', messages);
    })
}

export default realtime;