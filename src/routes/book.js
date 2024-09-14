const express = require('express');
const { getAllBook, getDetail, deleteBook, addNewBook, updateBook } = require('../controller/book');
const checkPermission = require('../middleware/checkPermission');

const books = express.Router();

books.get('/books', getAllBook);
books.get('/books/:id', getDetail);
books.delete('/books/:id', checkPermission, deleteBook);
books.post('/books', addNewBook);
books.put('/books/:id', checkPermission, updateBook);

module.exports = books;