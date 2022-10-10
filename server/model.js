const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    completed: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('to-do-list', dataSchema)