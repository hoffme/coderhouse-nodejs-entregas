import Log from '../../logger/main.js';

const auth = (authorized = true) => {
    if (authorized) {
        return (req, res, next) => {
            if (req.isAuthenticated()) return next();

            Log.warn('intento de peticion en ruta restringida sin autorizacion');

            return res.redirect('/login');
        }
    }

    return (req, res, next) => {
        if (!req.isAuthenticated()) return next();

        Log.warn('intento de peticion en ruta no restringida con autorizacion');

        res.redirect('/');
    }
}

export default auth;