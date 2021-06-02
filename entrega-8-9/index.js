import express from 'express';

import apiRouter from './routers/api.js';
const PORT = 8080;

// create app

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// settubg public folder

app.use(express.static('public'));

// setting api routes

app.use('/api', apiRouter);

// create server 

const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})

server.on('error', err => {
    console.error(`server error: ${err}`);
});