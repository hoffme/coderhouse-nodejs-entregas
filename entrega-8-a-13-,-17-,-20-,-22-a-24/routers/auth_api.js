import { Router } from 'express';

import auth from './middlewares/auth.js';

const router = Router();

router.get('/login', auth(false), (req, res) => {
    const name = req.query.name || 'el inombrable';
    
    req.session.name = name;
    req.session.time = new Date();

    res.redirect('/');
})

router.get('/logout', auth(), (req, res) => {
    req.session.destroy(() => res.redirect('/logout'));
})

export default router;