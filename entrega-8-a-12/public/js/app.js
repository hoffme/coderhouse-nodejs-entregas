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
    await send('/api/products/save', 'POST', product);
}

const deleteProduct = async id => {
    await send(`/api/products/delete/${id}`, 'DELETE');
}

window.onload = () => {
    const status = document.getElementById('status');
    const form = document.getElementById('form-product-save');
    const list = document.getElementById('products');

    form.onsubmit = e => {
        e.preventDefault();
    
        status.textContent = "guardando ...";
    
        const product = getFormJSON(e.target);
        
        createProduct(product)
            .then(() => { status.textContent = 'guardado' })
            .catch(err => { status.textContent = err.message; })
            .finally(() => {
                e.target.reset();
    
                const t = setTimeout(() => {
                    status.textContent = '';
                    clearTimeout(t);
                }, 5000);
            })
    }

    const socket = io();
    socket.on('products', products => {
        list.innerHTML = '';

        if (products.length === 0) {
            const label = document.createElement('label');
            label.classList.add('no-products');
            label.textContent = 'No hay Productos';

            list.append(label);
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

            list.append(container);
        })
    })
}
