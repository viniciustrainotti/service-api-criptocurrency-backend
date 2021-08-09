const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PATH_START = process.env.PATH_START || '/services';

const MONGO_HOST_PORT = process.env.MONGO_HOST_PORT || '172.17.0.3:27017';
const MONGO_USER = process.env.MONGO_USER || 'username';
const MONGO_PASS = process.env.MONGO_PASS || 'password';
const MONGO_DB = process.env.MONGO_DB || 'database';

const Routes = require('./api/routes/gateway');

const URI = "mongodb://" 
            + MONGO_USER 
            + ':'
            + MONGO_PASS
            + '@'
            + MONGO_HOST_PORT 
            + '/'
            + MONGO_DB;

console.log('URI', URI);

// connection MongoDB 
mongoose.connect(
    URI,
    {
        //useMongoClient: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true 
    }, function(error){console.log(error)}
);

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Routes which should handle requests
app.use(PATH_START, Routes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});

module.exports = app;