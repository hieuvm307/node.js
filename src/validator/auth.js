const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().required().trim().messages({
        'any.required': 'username là bắt buộc',
        'string.empty': 'username không được để trống!'
    }),
    email: Joi.string().email().required().trim().messages({
        'string.email': 'email không hợp lệ!',
        'any.required': 'email là bắt buộc',
        'string.empty': 'email không được để trống!'
    }),
    password: Joi.string().min(8).required().messages({
        'any.required': 'password là bắt buộc !',
        'string.required': 'password không được để trống !',
        'string.min': 'password tối thiểu {$limit} ký tự'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        "any.required": "Confirm password bắt buộc",
        "any.only": "Mật khẩu nhập lại không trùng khớp",       
        "string.empty": "Confirm password không được để trống !"
    }),
    age: Joi.number().max(100).messages({
        "number.max": "tuổi không hợp lệ !"
    }),
    role: Joi.string()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().trim().messages({
        "string.email": "email không hợp lệ!",
        "string.empty": "email không để trống!"
    }),
    password: Joi.string().min(8).required().messages({
        'any.required': 'password là bắt buộc !',
        'string.required': 'password không được để trống !',
        'string.min': 'password tối thiểu {$limit} ký tự'
    })
});



module.exports = {registerSchema, loginSchema};