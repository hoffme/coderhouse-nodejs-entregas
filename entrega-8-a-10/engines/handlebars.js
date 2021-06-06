import Handlebars from 'express-handlebars';

export default app => {
    app.engine(
        'hbs',
        Handlebars({
            extname: ".hbs",
            defaultLayout: 'index.hbs',
            layoutsDir: './views/layouts',
            partialsDir: './views/partials'
        })
    );

    app.set('view engine', 'hbs');

    app.set('views', './views');
}