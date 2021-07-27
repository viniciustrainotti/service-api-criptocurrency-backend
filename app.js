const express = require('express');
const app = express();

const PATH_START = process.env.PATH_START || '/services';

const Routes = require('./api/routes/gateway');

// conexao MongoDB Atlas
// mongoose.connect(
//     "mongodb+srv://node-shop:" + process.env.MONGO_ATLAS_PW + "@cluster0-vfvxp.mongodb.net/test?retryWrites=true&w=majority",
//     { 
//         //useMongoClient: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true 
//     }, function(error){console.log(error)}
// );

// Routes which should handle requests
app.use(PATH_START, Routes);

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