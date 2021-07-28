const auth = (authorized = true) => {
    const ms = (date) => date ? new Date(date).getTime() : new Date().getTime();

    const logged = (session) => {
        if (!session.name || !session.time) return false;
        if (ms() - ms(session.time) > 1000 * 60) return false;

        console.log(ms(), ms(session.time), ms() - ms(session.time) > 1000);

        return true;
    }

    if (authorized) {
        return (req, res, next) => {
            if (logged(req.session)) return next();

            req.session.time = new Date();
        
            res.redirect('/login');
        }
    }

    return (req, res, next) => {
        if (!logged(req.session)) return next();
    
        res.redirect('/');
    }
}

export default auth;