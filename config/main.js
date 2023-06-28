const os = require('os');
const dotenv = require('dotenv');
const path = require('path');

if (os.platform() === 'win32') {
    dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`.trim()) });
  }


const corsOptions = require('./cors');
const db = require('./mongoose');
const { initPassport, isAuthenticated } = require('./passport-local');
const sessionObj = require('./session');



module.exports = {
    corsOptions,
    db,
    initPassport,
    sessionObj,
    isAuthenticated
};

