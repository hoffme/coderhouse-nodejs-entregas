import Koa from 'koa';
import koaBody from 'koa-body';
import koaServe from 'koa-static';

import Controllers from './controllers/index.js';

import apiRouter from './routers/api.js';

import { PORT } from './settings.js';

const app = async () => {
    // Setups controllers
    await Controllers.setup();

    const app = new Koa();

    app.use(koaBody());

    app.use(apiRouter.routes());
    app.use(koaServe('./public'));

    app.listen(PORT, 'localhost', () => {
        console.log(`listening on: http://localhost:${PORT}`)
    })
};

export default app;