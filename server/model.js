const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    user: {
        required: true,
        type: String
    },
    todo: {
        required: true,
        type: String
    },
    comments: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('to-do-list-2', dataSchema)