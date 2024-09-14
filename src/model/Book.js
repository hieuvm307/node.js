const  mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    year: {
        type: Number
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
});

const Book = mongoose.model('books', bookSchema);
module.exports = Book;