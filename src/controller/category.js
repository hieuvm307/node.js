const Category = require("../model/Category");
const CategoryValidator = require("../validator/category");
const { message, messages } = require("../validator/category")

const getAll = async (req, res) => {
    try {
        const category = await Category.find({}).populate('books');
        if(!category) return res.status(404).json({
            message: "Không có dữ liệu!"
        })

        return res.status(200).json({
            data: category
        })
    } catch (error) {
      return res.status(500).json({
        name: message.name,
        message: error.message
      })
    }
}

const getDetail = async (res, req) => {
    try {
        const categoryId = await Category.findById(req.params.id).populate('books');
        if(!categoryId) return res.status(404).json({
            message: "Danh mục không tồn tại!"
        })

        return res.status(200).json({
            data: categoryId
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Đã có lỗi từ máy chủ!'
        })
    }
}

const create = async (req, res) => {
    try {
        const {error} = CategoryValidator.validate(req.body, {abortEarly: false});
        if(error) {
            const errors = error.details.map(error => error.message);
            return res.status(400).json({
                message: errors
            })
        }
        const category = await Category.create(req.body);
        if(!category) return res.status(400).json({
            message: "Tạo danh mục thất bại!"
        })

        return res.status(200).json({
            data: category,
            message: "Tạo danh mục thành công!"
        })
    } catch (error) {
        return res.status(500).json({
            message:'đã có lỗi từ máy chủ !'
        })
    }
}

const update = async (req, res) => {
    try {
        const categoryId = await Category.findById(req.params.id);
        if(!categoryId) return res.status(404).json({
            message: "Danh mục không tồn tại!"
        })

        const data = await Category.findByIdAndUpdate(categoryId, req.body, {new: true});
        return res.status(200).json({
            message: "Cập nhật danh mục thành công!",
            data: data,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Đã có lỗi từ máy chủ!'
        })
    }
}

const remove = async (req, res) => {
    try {
        const categoryId = await Category.findByIdAndDelete(req.params.id);
        if(!categoryId) return res.status(404).json({
            message: "Danh mục không tồn tại!"
        })

        return res.status(200).json({
            message: "Xóa danh mục thành công!"
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Đã có lỗi từ máy chủ!'
        })
    }
}

module.exports = {getAll, getDetail, create, update, remove}