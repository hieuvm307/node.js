const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // chữ thường
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        // select: false, // giữ password bảo mật
    },
    age: {
        type: Number
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, {timestamps: true, versionKey: false},)

User.index({name: 1, email: 1});

module.exports = mongoose.model('user', User);