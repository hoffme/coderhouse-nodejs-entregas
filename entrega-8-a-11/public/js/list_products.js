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

const deleteProduct = async id => {
    const data = await send(`/api/products/delete/${id}`, 'DELETE');
    
    location.reload();
}