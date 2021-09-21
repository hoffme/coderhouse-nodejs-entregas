import supertest from 'supertest';
import chai from 'chai';

const request = supertest('http://localhost:8081')
const expect = chai.expect;

let productData = {
    name: 'Mermelada',
    price: 300,
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_651539-MLA43897080453_102020-O.webp'
}
const productModify = {
    name: 'Mermelada de Durazno',
    price: 550,
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_878060-MLA43981662488_112020-O.webp'
}

describe('test api rest products full', () => {
    describe('GET', () => {
        it('listar productos, devuelve 200 y result arreglo vacio', async () => {
            let response = await request.get('/api/products/list')
            
            expect(response.status).to.eql(200)
            expect(response.body.result).to.eql([])
        })
    })

    describe('POST', () => {
        it('crea un producto y lo deveulve', async () => {
            let response = await request.post('/api/products/save').send(productData)
            expect(response.status).to.eql(200)

            const product = response.body.result;

            expect(product).to.include.keys('id','name','price','thumbnail');

            expect(product.name).to.eql(productData.name)
            expect(product.price).to.eql(productData.price)
            expect(product.thumbnail).to.eql(productData.thumbnail)

            productData = product;
        })
    })

    describe('GET', () => {
        it('obtenego el producto creado', async () => {
            let response = await request.get(`/api/products/list/${productData.id}`)
            expect(response.status).to.eql(200)

            const product = response.body.result;

            expect(product).to.include.keys('id','name','price','thumbnail');

            expect(product.id).to.eql(productData.id)
            expect(product.name).to.eql(productData.name)
            expect(product.price).to.eql(productData.price)
            expect(product.thumbnail).to.eql(productData.thumbnail)
        })
    })

    describe('PUT', () => {
        it('modifico el producto', async () => {
            let response = await request.put(`/api/products/update/${productData.id}`).send(productModify)
            expect(response.status).to.eql(200)

            const product = response.body.result;

            expect(product).to.include.keys('id','name','price','thumbnail');

            expect(product.id).to.eql(productData.id)
            expect(product.name).to.eql(productModify.name)
            expect(product.price).to.eql(productModify.price)
            expect(product.thumbnail).to.eql(productModify.thumbnail)
        
            productData = product;
        })
    })
    
    describe('DELETE', () => {
        it('elimino el producto', async () => {
            let response = await request.delete(`/api/products/delete/${productData.id}`)
            expect(response.status).to.eql(200)

            const product = response.body.result;

            expect(product).to.include.keys('id','name','price','thumbnail');

            expect(product.id).to.eql(productData.id)
            expect(product.name).to.eql(productData.name)
            expect(product.price).to.eql(productData.price)
            expect(product.thumbnail).to.eql(productData.thumbnail)
        })
    })

    describe('GET', () => {
        it('obtenego el producto da 404', async () => {
            let response = await request.get(`/api/products/list/${productData.id}`)
            expect(response.status).to.eql(404)
        })
    })
})