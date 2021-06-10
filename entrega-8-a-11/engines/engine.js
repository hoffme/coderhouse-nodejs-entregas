import path from 'path';

const __dirname = path.resolve();

export default app => {
    app.locals.basedir = path.join(__dirname, 'views');
    app.set('view engine', 'pug');
    app.set('views', './views');
}