const jwt = require('jsonwebtoken');
const User = require('../model/User');
const checkPermission = async (req, res, next) => {
    try {
        // kiểm tra user đăng nhập chưa
        const token = req.headers.authorization.split(' ')[1];
        // kiểm tra token
        if(!token) return res.status(403).json({message: "Bạn chưa đăng nhập!"})
        // Kiểm tra quyền người dùng 
        const decoded = jwt.verify(token, 'hieu');
        const user = await User.findById(decoded._id);
        if(!user) return res.status(403).json({message: "Tài khoản không tồn tại!"});
        if(user.role !== 'admin') return res.status(403).json({message:"bạn phải có quyền admin!"});
        // nếu ok thì next
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Đã có lỗi từ máy chủ !'
        })
    }
}

module.exports = checkPermission;