const mongoose = require('mongoose');

// function for us to sync db and the server 
const connectDB = (url) => {

    return mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    // returns a promess
}

module.exports = connectDB;

