const auth = (authorized = true) => {
    if (authorized) {
        return (req, res, next) => {
            if (req.isAuthenticated()) return next();
            return res.redirect('/login');
        }
    }

    return (req, res, next) => {
        if (!req.isAuthenticated()) return next();
        res.redirect('/');
    }
}

export default auth;