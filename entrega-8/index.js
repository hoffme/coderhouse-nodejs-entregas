import express from 'express';

import ErrorsMiddleware from './responses/error.js';

import ProductRouter from './routers/product.js';

// env vars

const PORT = 8080;

// create app

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// adding routes

app.use('/api/products', ProductRouter);

// middleware errors

app.use(ErrorsMiddleware);

// create server 

const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})

server.on('error', err => {
    console.error(`server error: ${err}`);
});