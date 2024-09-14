const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        default: "Uncategory"
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        default: "Uncategory"
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'books'
        }
    ]
}, {timeseries: true, versionKey: false});


const Category = mongoose.model('category', CategorySchema);
module.exports = Category;