const Book = require("../model/Book");
const Category = require("../model/Category");

const   getAllBook = async (req, res) => {
    try {
        const books = await Book.find().populate("categoryId");
        if(!books) return res.status(400).json({
            message: "Không có dữ liệu !"
        })
        return res.status(200).json({
            data: books
        })
    } catch (error) {
        return error.message
    }
}

const getDetail = async (req, res) => {
    try {
        const bookId = await Book.findById(req.params.id).populate("categoryId");;
        if(!bookId) return res.status(404).json({
            message: "không tìm thấy sách !"
        });
        return res.status(200).json({
            data: bookId
        })
    } catch (error) {
        return res.status(500).json({
            message: 'đã xảy ra lỗi',
            error: error.message
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const bookId = await Book.findByIdAndDelete(req.params.id).populate("categoryId");
        if(!bookId) return res.status(404).json({
            message: "không thấy sách !"
        });
        return res.status(200).json({
            message: "xóa thành công."
        })
    } catch (error) {
        return res.status(500).json({
            message: 'đã có lỗi !',
            error: error.message
        })
    }
}

const addNewBook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        if(!newBook) return res.status(201).json({
            message: "thêm thất bại !"
        })

        //add book to category
        const updateCategory = await Category.findByIdAndUpdate(newBook.categoryId, {
            $addToSet: {
                books: newBook._id
            }
        }, {new: true})

        if(!updateCategory) return res.status(201).json({
            message: "thêm sách vào thể loại thất bại!",
            error: error.message
        })

        return res.status(200).json({
            message: 'thêm thành công',
            data: newBook
        })
    } catch (error) {
        return error.message        
    }
}


const updateBook = async (req, res) => {
    try {
        const bookId = await Book.findById(req.params.id);
        if(!bookId) return res.status(404).json({
            message: "Không tìm thấy sách !"
        })

        const bookUpdate = await Book.findByIdAndUpdate(bookId, req.body, {new: true});

        return res.status(200).json({
            message: "cập nhật thành công !",
            data: bookUpdate
        })
    } catch (error) {
        return error.message;
    }
}


module.exports = {getAllBook, getDetail, deleteBook, addNewBook, updateBook};