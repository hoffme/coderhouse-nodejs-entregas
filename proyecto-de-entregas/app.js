import express from 'express';
import compression from 'compression';
import { Server } from 'http';
import { Server as SocketIO } from 'socket.io';
import { graphqlHTTP } from 'express-graphql';

import passport from 'passport';
import seccion from 'express-session';
import MongoStore from 'connect-mongo';

import Controllers from './controllers/index.js';

import EngineSetup from './engines/engine.js';

import apiRouter from './routers/api.js';
import viewRouter from './routers/views.js';
import realTime from './routers/realtime.js';

import schema from './graphql/schema.js';
import root from './graphql/root.js';

import Log from './logger/main.js';

import ErrorsMiddleware from './routers/middlewares/error.js';
import LoggerMiddleware from './routers/middlewares/logger.js';

import { PORT } from './settings.js';

const app = async () => {
    Log.info('Iniciando servidor');

    // Setups controllers
    await Controllers.setup();

    Log.info('controladores cargados');

    // create app
    const app = express();
    const http = Server(app);
    const io = new SocketIO(http);

    app.use(LoggerMiddleware);

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
    app.use(compression());

    // public folder
    app.use(express.static('public'));

    // setting engine
    EngineSetup(app);

    // views routes
    app.use('', viewRouter);

    // api
    app.use('/api', apiRouter);

    // graphql
    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    }));

    app.use(ErrorsMiddleware);

    // socket connections
    realTime(io);

    process.on('exit', code => {
        Log.warn(`programa cerrado con codigo: ${code}`);
    })

    // initialize server 
    http.listen(PORT, () => {
        Log.info(`Listening on http://localhost:${PORT}`);
    })
};

export default app;