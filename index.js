const { corsOptions, db, initPassport, sessionObj, isAuthenticated } = require('./config/main.js');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;
initPassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session(sessionObj));
app.use(passport.initialize());
app.use(passport.session());


const userRouter = require(path.join(__dirname, 'route', 'userRouter'));
const profileRouter = require(path.join(__dirname, 'route', 'profileRouter'));

app.use('/api/user', userRouter);
app.use(isAuthenticated);
app.use('/api/profile', profileRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


