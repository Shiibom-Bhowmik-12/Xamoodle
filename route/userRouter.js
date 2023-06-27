const path = require('path');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
const router = express.Router();
const userController = require(path.join(__dirname, '..', 'controller', 'userController'));
const { sessionObj } = require(path.join(__dirname, '..', 'config', 'main.js'));


router.use(session(sessionObj));
router.use(passport.initialize());
router.use(passport.session());


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: info});
        }

        if (!user) {
            return res.status(401).json({ message: info });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.json({ message: 'Login successful', user: user });
        });
    })(req, res, next);
});



router.post('/signup', userController.signup);

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.json({ message: 'Logout failed' });
        }

        req.session.destroy();

        res.clearCookie('connect.sid');

        return res.json({ message: 'Logout successful' });
    });
});

module.exports = router;