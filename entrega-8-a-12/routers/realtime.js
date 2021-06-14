import controller from '../controllers/product.js';

const realtime = (io) => {
    io.on('connection', socket => {
        try {
            const products = controller.repository.getAll();
            socket.emit('products', products);
        } catch (err) {
            socket.emit('products', []);
        }
    })

    controller.addListeiner('realtime', () => {
        try {
            const products = controller.repository.getAll();
            io.sockets.emit('products', products);
        } catch (err) {
            io.sockets.emit('products', []);
        }
    })
}

export default realtime;