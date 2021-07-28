const auth = (authorized = true) => {
    const ms = (date) => date ? new Date(date).getTime() : new Date().getTime();

    const logged = (session) => {
        if (!session.name || !session.time) return false;
        if (ms() - ms(session.time) > 1000 * 60 * 10) {
            session.destroy();
            return false;
        }

        return true;
    }

    if (authorized) {
        return (req, res, next) => {
            if (!logged(req.session)) return res.redirect('/login');

            req.session.time = new Date();
            return next();
        }
    }

    return (req, res, next) => {
        if (!logged(req.session)) return next();
    
        res.redirect('/');
    }
}

export default auth;