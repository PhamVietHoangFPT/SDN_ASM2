const Member = require('../models/member.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Xử lý đăng ký (Lưu mật khẩu không băm)
const register = async (req, res) => {
  const { email, password, name, YOB, gender } = req.body
  try {
    let member = await Member.findOne({ email })
    if (member) {
      return res.status(400).json({ message: "Account already exists" })
    }

    // Tạo user mới mà không băm mật khẩu
    const hashPassword = bcrypt.hashSync(password, 10)
    const newMember = new Member({ email, password: hashPassword, name, YOB, gender })
    await newMember.save()

    res.status(201).json({ message: "Register successfully" }) // Chuyển hướng sau khi đăng ký thành công
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// Xử lý đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const member = await Member.findOne({ email })

    // Kiểm tra user tồn tại
    if (!member) {
      return res.status(400).json({ message: "Account doesn't exist" })
    }

    // Kiểm tra email và mật khẩu
    const isPasswordMatch = await bcrypt.compare(password, member.password)
    if (!member || !isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" })
    }
    // Tạo token
    const user = { id: member._id, email: member.email, isAdmin: member.isAdmin, name: member.name, YOB: member.YOB, gender: member.gender }
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })

    if (member.isAdmin) {
      return res.status(200).json({ token: token })
    }
    // Nếu không phải admin, chuyển hướng về trang chủ
    res.status(200).json({ token: token })
  } catch (err) {
    res.status(err).json({ message: err.message })
  }
}


module.exports = { register, login }