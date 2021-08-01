import { Router } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import Controllers from '../controllers/index.js';

const LocalStrategy = passportLocal.Strategy;

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.hash);
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use('login', new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
        const user = await Controllers.user.find(username);

        if (!user) {
            return done(null, false, { message: 'incorrect username' });
        }

        if (!isValidPassword(user, password)) {
            return done(null, false, { message: 'incorrect password' });
        }
        
        return done(null, user);
    })
);

passport.use('signup', new LocalStrategy(
    { passReqToCallback: true }, 
    async (req, username, password, done) => {
        const user = await Controllers.user.find(username);

        if (user) {
            return done(null, false, { message: 'username already used' });
        }

        const newUser = {
            username: username,
            hash: createHash(password)
        };

        await Controllers.user.register(newUser);

        return done(null, newUser);
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const user = await Controllers.user.find(username);
    return done(null, user);
});

const router = Router();

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login?error=Invalid Username or Password'
}))

router.post('/register', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/register?error=Username already used'
}))

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/logout');
})

export default router;