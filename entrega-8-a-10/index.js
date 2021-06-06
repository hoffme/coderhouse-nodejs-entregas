import express from 'express';

import handlebarsSetup from './engines/handlebars.js';

import apiRouter from './routers/api.js';
import viewRouter from './routers/views.js';

const PORT = 8080;

// create app

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public folder

app.use(express.static('public'));

// setting engine

handlebarsSetup(app);

// views routes

app.use('', viewRouter);

// api routes

app.use('/api', apiRouter);

// create server 

const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})

server.on('error', err => {
    console.error(`server error: ${err}`);
});