import axios from "axios";

const URL = 'http://localhost:8081';

const test = async (name, promise) => {
    console.log(`------ testing: '${name}' ------`);

    await new Promise(r => setTimeout(r, 500));

    try {
        await promise();
        console.log(`result: ok`)    
    } catch (err) {
        console.log(`error: ${err}`)
    }

    console.log(`------ tested: '${name}' ------`);
}

(async () => {
    await test('listar productos vacios', async () => {
        const response = await axios.get(URL + '/api/products/list');
        
        if (response.status != 200) {
            throw new Error(`invalid status code, expected: 200, obtains: ${response.status}`);
        }
    
        const data = response.data;
    
        if (data.error) {
            throw new Error(`invalid response, expected: { result: [] }, obtains error: ${data.error}`);
        }
    
        if (!data.result) {
            throw new Error(`invalid response, expected: { result: [] }, no obtains result`);
        }
    
        if (data.result.length > 0) {
            throw new Error(`invalid response, expected: { result: [] }, obtains: ${data}`);
        }
    })

    let product;
    
    await test('agregar producto', async () => {
        const productData = {
            name: 'Mermelada',
            price: 300,
            thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_651539-MLA43897080453_102020-O.webp'
        }

        const response = await axios.post(URL + '/api/products/save', productData);
        
        if (response.status != 200) {
            throw new Error(`invalid status code, expected: 200, obtains: ${response.status}`);
        }
    
        const data = response.data;
    
        if (data.error) {
            throw new Error(`invalid response, expected: { result: [] }, obtains error: ${data.error}`);
        }
    
        if (!data.result) {
            throw new Error(`invalid response, expected: { result: [] }, no obtains result`);
        }
    
        if (!data.result.id || data.result.id.length === 0) {
            throw new Error(`invalid response id, obtains: ${data.result}`);
        }

        if (!data.result.name || data.result.name !== productData.name) {
            throw new Error(`invalid response name, expected: ${productData.name}, obtains: ${data.result}`);
        }

        if (!data.result.price || data.result.price !== productData.price) {
            throw new Error(`invalid response price, expected: ${productData.price}, obtains: ${data.result}`);
        }

        if (!data.result.thumbnail || data.result.thumbnail !== productData.thumbnail) {
            throw new Error(`invalid response thumbnail, expected: ${productData.thumbnail}, obtains: ${data.result}`);
        }

        product = data.result;
    })

    await test('obtener producto creado', async () => {
        const response = await axios.get(URL + `/api/products/list/${product.id}`);
        if (response.status != 200) {
            throw new Error(`invalid status code, expected: 200, obtains: ${response.status}`);
        }
    
        const data = response.data;
    
        if (data.error) {
            throw new Error(`invalid response, expected: { result: [] }, obtains error: ${data.error}`);
        }
    
        if (!data.result) {
            throw new Error(`invalid response, expected: { result: [] }, no obtains result`);
        }
    
        if (!data.result.id || data.result.id !== product.id) {
            throw new Error(`invalid response id, expect: ${product.id}, obtains: ${data.result.id}`);
        }

        if (!data.result.name || data.result.name !== product.name) {
            throw new Error(`invalid response name, expect: ${product.name}, obtains: ${data.result.name}`);
        }

        if (!data.result.price || data.result.price !== product.price) {
            throw new Error(`invalid response price, expect: ${product.price}, obtains: ${data.result.price}`);
        }

        if (!data.result.thumbnail || data.result.thumbnail !== product.thumbnail) {
            throw new Error(`invalid response thumbnail, expect: ${product.thumbnail}, obtains: ${data.result.thumbnail}`);
        }
    })

    await test('listar productos esta el creado', async () => {
        const response = await axios.get(URL + '/api/products/list');
        
        if (response.status != 200) {
            throw new Error(`invalid status code, expected: 200, obtains: ${response.status}`);
        }
    
        const data = response.data;
    
        if (data.error) {
            throw new Error(`invalid response, expected: { result: [] }, obtains error: ${data.error}`);
        }
    
        if (!data.result) {
            throw new Error(`invalid response, expected: { result: [] }, no obtains result`);
        }
    
        if (data.result.length == 0) {
            throw new Error(`empty response, obtains: ${data}`);
        }
    })

    await test('modificar producto', async () => {
        const productModify = {
            name: 'Mermelada de Durazno',
            price: 550,
            thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_878060-MLA43981662488_112020-O.webp'
        }

        const response = await axios.put(URL + `/api/products/update/${product.id}`, productModify);
        if (response.status != 200) {
            throw new Error(`invalid status code, expected: 200, obtains: ${response.status}`);
        }
    
        const data = response.data;
    
        if (data.error) {
            throw new Error(`invalid response, expected: { result: [] }, obtains error: ${data.error}`);
        }
    
        if (!data.result) {
            throw new Error(`invalid response, expected: { result: [] }, no obtains result`);
        }
    
        if (!data.result.id || data.result.id !== product.id) {
            throw new Error(`invalid response id, expect: ${product.id}, obtains: ${data.result.id}`);
        }

        if (!data.result.name || data.result.name !== productModify.name) {
            throw new Error(`invalid response name, expect: ${productModify.name}, obtains: ${data.result.name}`);
        }

        if (!data.result.price || data.result.price !== productModify.price) {
            throw new Error(`invalid response price, expect: ${productModify.price}, obtains: ${data.result.price}`);
        }

        if (!data.result.thumbnail || data.result.thumbnail !== productModify.thumbnail) {
            throw new Error(`invalid response thumbnail, expect: ${productModify.thumbnail}, obtains: ${data.result.thumbnail}`);
        }

        product = data.result;
    })

    await test('eliminar producto', async () => {
        const response = await axios.delete(URL + `/api/products/delete/${product.id}`);
        if (response.status != 200) {
            throw new Error(`invalid status code, expected: 200, obtains: ${response.status}`);
        }
    
        const data = response.data;
    
        if (data.error) {
            throw new Error(`invalid response, expected: { result: [] }, obtains error: ${data.error}`);
        }
    
        if (!data.result) {
            throw new Error(`invalid response, expected: { result: [] }, no obtains result`);
        }
    
        if (!data.result.id || data.result.id !== product.id) {
            throw new Error(`invalid response id, expect: ${product.id}, obtains: ${data.result.id}`);
        }

        if (!data.result.name || data.result.name !== product.name) {
            throw new Error(`invalid response name, expect: ${product.name}, obtains: ${data.result.name}`);
        }

        if (!data.result.price || data.result.price !== product.price) {
            throw new Error(`invalid response price, expect: ${product.price}, obtains: ${data.result.price}`);
        }

        if (!data.result.thumbnail || data.result.thumbnail !== product.thumbnail) {
            throw new Error(`invalid response thumbnail, expect: ${product.thumbnail}, obtains: ${data.result.thumbnail}`);
        }
    })

    await test('obtener producto eliminado', async () => {
        let response;

        try {
            response = await axios.get(URL + `/api/products/list/${product.id}`);
        } catch (error) {
            response = error.response;
        }

        if (response.status != 404) {
            throw new Error(`invalid status code, expected: 404, obtains: ${response.status}`);
        }
    
        const data = response.data;
    
        if (data.result) {
            throw new Error(`invalid response, expected: { error: 'product not found' }, no obtains result`);
        }

        if (!data.error) {
            throw new Error(`invalid response, expected: { error: 'product not found' }, obtains error: ${response.data}`);
        }
    })
})()