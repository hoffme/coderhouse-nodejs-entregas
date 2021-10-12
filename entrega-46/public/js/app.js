var PRODUCTS_VIEW;

const getFormJSON = (form) => {
    const data = new FormData(form);
    return Array.from(data.keys()).reduce((result, key) => {
        result[key] = data.get(key);
        return result;
    }, {});
};

const send = async (to, method = 'GET', obj = undefined) => {
    const body = obj ? JSON.stringify(obj) : undefined;

    const response = await fetch(to, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method,
        body
    })

    return (await response.json())?.result;
}

const allProducts = async () => {
    return await send('/api/article', 'GET');
}

const createProduct = async product => {
    send('/api/article', 'POST', product)
        .finally(() => refreshProducts())
}

const updateProduct = async product => {
    send(`/api/article/${product.id}`, 'PUT', product)
        .finally(() => refreshProducts())
}

const deleteProduct = async id => {
    send(`/api/article/${id}`, 'DELETE')
        .finally(() => refreshProducts())
}

const refreshProducts = async () => {
    if (!PRODUCTS_VIEW) return;

    const products = await allProducts();

    PRODUCTS_VIEW.innerHTML = '';

    if (products.length === 0) {
        const label = document.createElement('label');
        label.classList.add('no-products');
        label.textContent = 'No hay Productos';

        PRODUCTS_VIEW.append(label);
        return;
    }

    products.forEach(product => {
        const img = document.createElement('img');
        img.classList.add('thumbnail');
        img.src = product.thumbinal;

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

        PRODUCTS_VIEW.append(container);
    })
}

window.onload = () => {
    const formCreateProduct = document.getElementById('form-product-save');
    const statusCreateProduct = document.getElementById('status');
    PRODUCTS_VIEW = document.getElementById('products');

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
                }, 1000);
            })
    }

    refreshProducts()
}
