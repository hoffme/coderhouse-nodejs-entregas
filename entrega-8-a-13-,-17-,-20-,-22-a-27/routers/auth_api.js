import { Router } from 'express';

import passport from 'passport';
import passportFacebok from 'passport-facebook';

import Controllers from '../controllers/index.js';

const FacebookStrategy = passportFacebok.Strategy;

passport.use(new FacebookStrategy(
    {
        clientID: '570983080569000',
        clientSecret: '50e6fcbbf0795d89f2b7019ec7b5fe71',
        callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
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
    successRedirect: '/',
    failureRedirect: '/login?error=No se pudo ingresar con facebook',
    scope: 'email'
}));

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/logout');
})

export default router;