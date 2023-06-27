const { corsOptions, db, initPassport } = require('./config/main.js');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
initPassport(passport);
app.use(cookieParser());


const userRouter = require(path.join(__dirname, 'route', 'userRouter'));
app.use('/api/user', userRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


