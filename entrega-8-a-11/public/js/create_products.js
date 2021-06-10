const satus = document.getElementById('status');

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
    const data = await send('/api/products/save', 'POST', product)
    return data.result;
}

document.getElementById('form-product-save').onsubmit = e => {
    e.preventDefault();

    satus.textContent = "guardando ...";

    const product = getFormJSON(e.target);
    
    createProduct(product).then(() => {
        satus.textContent = 'guardado';

        e.target.reset();

        const t = setTimeout(() => {
            satus.textContent = '';
            clearTimeout(t);
        }, 5000);
    });
}