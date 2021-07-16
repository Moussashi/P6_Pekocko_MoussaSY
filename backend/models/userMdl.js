const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'must provide a valid email...'],


    },
    password: {
        type: String,
        required: true,
        maxLength: 1024,
        minLength: [6, 'password must be more than 6 characters']
    }
})

module.exports = mongoose.model('User', UserSchema);
