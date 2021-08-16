import express from 'express';
import { Server } from 'http';
import { Server as SocketIO } from 'socket.io';
import passport from 'passport';

import seccion from 'express-session';
import MongoStore from 'connect-mongo';

import Controllers from './controllers/index.js';

import EngineSetup from './engines/engine.js';

import apiRouter from './routers/api.js';
import viewRouter from './routers/views.js';
import realTime from './routers/realtime.js';

import { PORT } from './settings.js';

const app = async () => {
    // Setups controllers
    await Controllers.setup();

    // create app
    const app = express();
    const http = Server(app);
    const io = new SocketIO(http);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(seccion({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://coderhouse:coderhouse@cluster0.mwsl6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        }),
        secret: "clave super secreta",
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize());
    app.use(passport.session());

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

    process.on('exit', code => {
        console.log(`programa cerrado con codigo: ${code}`)
    })

    // initialize server 
    http.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    })
};

export default app;