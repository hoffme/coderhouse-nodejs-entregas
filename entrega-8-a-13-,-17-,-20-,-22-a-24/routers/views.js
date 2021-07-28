import { Router } from 'express';

import auth from './middlewares/auth.js';

const router = Router();

// adding routes

router.get('/login', auth(false), (req, res) => {
    res.render('login');
})

router.get('/logout', auth(false), (req, res) => {
    res.render('logout');
})

router.get('/', auth(), (req, res) => {
    const user = { name: req.session.name }

    res.render('editor', { user });
});

router.get('/test', auth(), (req, res) => {
    res.render('test-products');
});

export default router;