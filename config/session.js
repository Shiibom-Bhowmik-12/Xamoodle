const MongoStore = require('connect-mongo');

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URL,
        dbName: process.env.DB_NAME,
        collectionName: process.env.SESSION_COLLECTION,
        autoRemove: 'interval',
        autoRemoveInterval: 10, // In minutes. Default
        ttl: 1000 * 60 * 60 * 24, // 1 day
        touchAfter: 24 * 3600, // time period in seconds
        crypto: {
            secret: process.env.CRYPTO_SECRET,
        }
    }),
    saveUninitialized: false,
    cookie: {
        secure: 'auto',
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        sameSite: 'lax',
    }
}

module.exports = sessionOptions;