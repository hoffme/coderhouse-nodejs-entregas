import express from 'express';
import { Server } from 'http';
import { Server as SocketIO } from 'socket.io';

import Controllers from './controllers/index.js';

import EngineSetup from './engines/engine.js';

import apiRouter from './routers/api.js';
import viewRouter from './routers/views.js';
import realTime from './routers/realtime.js';

(async () => {
    // constants
    const PORT = 8080;

    // Setups controllers
    await Controllers.setup();

    // create app
    const app = express();
    const http = Server(app);
    const io = new SocketIO(http);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // public folder
    app.use(express.static('public'));

    // setting engine
    EngineSetup(app);

    // views routes
    app.use('', viewRouter);

    // api routes
    app.use('/api', apiRouter);

    // socket connections
    realTime(io);

    // initialize server 
    http.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    })
})()