import { Router } from 'express';

import passport from 'passport';
import passportFacebok from 'passport-facebook';

import Controllers from '../controllers/index.js';

import auth from './middlewares/auth.js';

import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRECT, PORT } from '../settings.js';

const FacebookStrategy = passportFacebok.Strategy;

passport.use(new FacebookStrategy(
    {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRECT,
        callbackURL: `http://localhost:${PORT}/api/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'emails', 'picture.type(large)']
    },
    async (accessToken, refreshToken, profile, done) => {
        let user = await Controllers.user.find(profile.id);

        if (!user) {
            user = await Controllers.user.register(profile);
        }
        
        return done(null, user);
    })
);

passport.serializeUser((user, done) => { done(null, user) });
  
passport.deserializeUser((user, done) => { done(null, user) });

const router = Router();

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/api/auth/success',
    failureRedirect: '/login?error=No se pudo ingresar con facebook',
    scope: 'email'
}));

router.get('/success', auth(), (req, res) => {
    console.log('entrando')
    if (req.user) Controllers.notifier.loginNotify(req.user);
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    if (req.user) Controllers.notifier.logoutNotify(req.user);

    req.logOut();
    res.redirect('/logout');
})

export default router;