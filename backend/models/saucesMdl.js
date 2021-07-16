const mongoose = require('mongoose');

const SaucesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide a valid name...'],
        trim: true,
        maxLength: [20, 'name cannot be more than 20 characters'],
        minLength: [3, 'name cannot be less than 3 characters']
    },
    required: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('Sauce', SaucesSchema);