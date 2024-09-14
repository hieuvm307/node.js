const express = require('express');
const port = 8000;
const mongoose = require('mongoose');
const books = require('./routes/book');
const authRouter = require('./routes/user');
const app = express();
const morgan = require('morgan');
const categoryRouter = require('./routes/category');

mongoose.connect('mongodb://127.0.0.1:27017/book_shop');

app.use(express.json());
app.use(morgan('dev'))

app.use('/', books);
app.use('/', authRouter);
app.use('/category', categoryRouter);

app.listen(port, ()=> {
    console.log(`your server is listening on port: ${port}`);
});