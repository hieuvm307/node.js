const User = require("../model/User");
const {registerSchema, loginSchema} = require("../validator/auth");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
      //Lấy dữ liệu user gửi lên
      const { name, email, password, confirmPassword, age, role } = req.body;
    // kiểm tra dữ liệu hợp lệ ko
      const {error} = registerSchema.validate(req.body, {abortEarly: false});
     if(error) {
        console.log(error.details.map((message) => message.message));
        const message = error.details.map((message) => message.message);
        return res.status(400).json({
            message: message
        })
        
     }
      /**
       * return 
       *    {
       *      error: {
       *        details: [
       *            {message: 'Username không được để trống !'},
       *            {message: 'Email không hợp kệ !'},
       *        ]
       *      }   
       *    }
       */
    // kiểm tra user có tồn tại ko
    const userExits = await User.findOne({email});
    if(userExits) return res.status(400).json({message: 'email này đã tồn tại !'});
     
    // mã hóa mật khẩu: bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hased: ', hashedPassword);    

    // lưu user vào database        
    const user = await User.create({
        name, email, password: hashedPassword, age, role
    })  

    user.password = undefined;
    return res.status(200).json({
        message: `Đăng ký thành công`,
        user: user
    })
    // trả về user, không trả về mật khẩu
  } catch (error) {
    return res.status(500).json({
        message: 'đã có lỗi từ máy chủ!'
    })
  }
};

const login = async (req, res) => {
    try {
        //validator
        const {error} = loginSchema.validate(req.body, {abortEarly: false});
        if(error) { 
            const message = error.details.map((error) => error.message);
            return res.status(400).json({
                message: message
            })
        }

        // lấy dữ liệu từ form
        const {email, password} = req.body;

        // kiểm tra email có trong db không
        const userEmail = await User.findOne({email});
        if(!userEmail) return res.status(400).json({
            message: "email của bạn chưa được đăng ký."
        })

        // compare password
        const isMathPassword = await bcrypt.compare(password, userEmail.password);
        if(!isMathPassword) return res.status(400).json({
            message: "mật khẩu của bạn không đúng."
        })

        // tạo jwt
        const accsessToken = jwt.sign({_id: User._id}, 'hieu');
        console.log(accsessToken);
        
        // trả về client
        userEmail.password = undefined;
        return res.status(200).json({
            message: "đăng nhập thành công",
            email,
            accsessToken
        })

    } catch (error) {
        return res.status(500).json({
            message: 'đã có lỗi từ máy chủ!'
        })
    }
}

module.exports = { register, login };
