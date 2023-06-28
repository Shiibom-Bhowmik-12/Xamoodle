const path = require('path');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const userController = require(path.join(__dirname, '..', 'controller', 'userController'));



router.post('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(401).json({ statusCode: 401, message: 'You are already logged in' });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ statusCode: 500, message: err.message });
        }

        if (!user) {
            return res.status(401).json({ statusCode: 401, message: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.json({ statusCode: 200, message: info.message, user: user, session: req.session });
        });
    })(req, res, next);
});



router.post('/signup', userController.signup);

router.post('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout((err) => {
            if (err) {
                return res.json({ statusCode: 500, message: err.message });
            }

            req.session.destroy();

            res.clearCookie('connect.sid');

            return res.json({ statusCode: 200, message: 'Logged out successfully' });
        });
    } else {
        return res.json({ statusCode: 401, message: 'No session found' });
    }
});

module.exports = router;