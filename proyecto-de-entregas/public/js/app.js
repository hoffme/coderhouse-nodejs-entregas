const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMessage = new normalizr.schema.Entity('message', {
    author: schemaAuthor
})

const schemaMessages = new normalizr.schema.Array(schemaMessage);

const getFormJSON = (form) => {
    const data = new FormData(form);
    return Array.from(data.keys()).reduce((result, key) => {
        result[key] = data.get(key);
        return result;
    }, {});
};

const send = async (to, method = 'GET', obj) => {
    const body = obj ? JSON.stringify(obj) : undefined;

    const response = await fetch(to, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method,
        body
    })

    return await response.json();
}

const createProduct = async product => {
    await send('/graphql', 'POST', {
        query: `
            mutation {
                createProduct(fields: {
                    name:"${product.name || ''}", 
                    price:"${product.price || ''}", 
                    thumbnail:"${product.thumbnail || ''}"
                }) {
                    id
                }
            }
        `,
    });
}

const updateProduct = async product => {
    await send('/graphql', 'POST', {
        query: `
            mutation {
                updateProduct(input: ${JSON.parse(product)}) {
                    id
                }
            }
        `,
    });
}

const deleteProduct = async id => {
    await send('/graphql', 'POST', {
        query: `
            mutation {
                deleteProduct(id: "${id}") {
                    id
                }
            }
        `,
    });
}

const refreshProducts = (productsView, products) => {
    productsView.innerHTML = '';

    if (products.length === 0) {
        const label = document.createElement('label');
        label.classList.add('no-products');
        label.textContent = 'No hay Productos';

        productsView.append(label);
        return;
    }

    products.forEach(product => {
        const img = document.createElement('img');
        img.classList.add('thumbnail');
        img.src = product.thumbnail;

        const name = document.createElement('label');
        name.classList.add('name');
        name.textContent = product.name;

        const price = document.createElement('label');
        price.classList.add('price');
        price.textContent = product.price;

        const remove = document.createElement('button');
        remove.textContent = 'Borrar';
        remove.onclick = () => deleteProduct(product.id);

        const container = document.createElement('li');
        container.classList.add('product');
        container.append(img, name, price, remove);

        productsView.append(container);
    })
}

const refreshChat = (chatView, messagesNormalized) => {
    const messages = normalizr.denormalize(messagesNormalized.result, schemaMessages, messagesNormalized.entities);

    chatView.innerHTML = '';
    
    if (!messages || messages.length === 0) {
        const label = document.createElement('label');
        label.classList.add('no-messages');
        label.textContent = 'No hay Mensajes';

        chatView.append(label);
        return;
    }

    messages.forEach(message => {
        const email = document.createElement('label');
        email.classList.add('email');
        email.textContent = message.author.nick;

        const date = document.createElement('label');
        date.classList.add('date');
        const dt = new Date(message.date);
        date.textContent = `${
        (dt.getMonth()+1).toString().padStart(2, '0')}/${
        dt.getDate().toString().padStart(2, '0')}/${
        dt.getFullYear().toString().padStart(4, '0')} ${
        dt.getHours().toString().padStart(2, '0')}:${
        dt.getMinutes().toString().padStart(2, '0')}:${
        dt.getSeconds().toString().padStart(2, '0')}`

        const text = document.createElement('label');
        text.classList.add('text');
        text.textContent = message.text;

        const container = document.createElement('li');
        container.id = 'message-' + message.id;
        container.classList.add('message');
        container.append(email, date, text);

        chatView.append(container);
    })

    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
        location.href = '#message-'+lastMessage.id;
    }
}

window.onload = () => {
    const socket = io();

    const formCreateProduct = document.getElementById('form-product-save');
    const statusCreateProduct = document.getElementById('status');
    const productsView = document.getElementById('products');

    const formCreateMessage = document.getElementById('form-message-save');
    const chatView = document.getElementById('chat');

    formCreateProduct.onsubmit = e => {
        e.preventDefault();
    
        statusCreateProduct.textContent = "guardando ...";
    
        const product = getFormJSON(e.target);
        
        createProduct(product)
            .then(() => { statusCreateProduct.textContent = 'guardado' })
            .catch(err => { statusCreateProduct.textContent = err.message; })
            .finally(() => {
                e.target.reset();
    
                const t = setTimeout(() => {
                    statusCreateProduct.textContent = '';
                    clearTimeout(t);
                }, 5000);
            })
    }

    formCreateMessage.onsubmit = e => {
        e.preventDefault();

        const data = getFormJSON(e.target);

        let author = {...data};
        delete author['text']
        
        const message = {
            text: data.text,
            author
        }

        socket.emit('message', message, (data) => {
            console.log(data);
            const inputText = formCreateMessage.elements.find(input => input.type === 'text');
            if (inputText) inputText.value = "";
        });
    }
    
    socket.on('initial_data', data => {
        if (data.products) refreshProducts(productsView, data.products);
        if (data.messages) refreshChat(chatView, data.messages);        
    });

    socket.on('products', products => {
        refreshProducts(productsView, products);
    });

    socket.on('chat', messages => {
        refreshChat(chatView, messages);
    });
}
