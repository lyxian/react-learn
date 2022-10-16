const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    published_date: {
        type: Date,
        required: true
    },
    publisher: {
        type: String
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'book-store' });

module.exports = mongoose.model('book-store', BookSchema);
// module.exports = mongoose.model('book-store', BookSchema, 'book-store');