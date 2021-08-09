import { Router } from 'express';

import auth from './middlewares/auth.js';

const router = Router();

// adding routes

router.get('/login', auth(false), (req, res) => {
    const error = req.query.error;
    res.render('login', { error });
})

router.get('/logout', auth(false), (req, res) => {
    res.render('logout');
})

router.get('/', auth(), (req, res) => {
    const facebookUser = req.session.passport.user;

    res.render('editor', {user: {
        name: facebookUser.displayName,
        email: facebookUser.emails[0]?.value,
        photo: facebookUser.photos[0]?.value
    }});
});

router.get('/info', auth(false), (req, res) => {
    res.render('info', {info: {
        argv: process.argv,
        platform: process.platform,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        pathExect: process.title,
        processID: process.pid,
        folder: process.cwd()
    }});
})

router.get('/test', auth(), (req, res) => {
    res.render('test-products');
});

export default router;