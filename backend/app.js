var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors') // Import cors middleware
require('dotenv').config()
const verifyUser = require('./middlewares/vertifyUser')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

// Kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully!')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    process.exit(1)
  }
}
connectDB()

// Cấu hình CORS để cho phép tất cả các nguồn
app.use(cors({
  origin: '*', // Cho phép tất cả origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Các phương thức HTTP được phép
  allowedHeaders: ['Content-Type', 'Authorization'] // Các header được phép
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(verifyUser)

// Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)

const authRouter = require('./routes/authRoutes')
const memberRouter = require('./routes/memberRoutes')
const perfumeRouter = require('./routes/perfumeRoutes')
const brandRouter = require('./routes/brandRoutes')
const adminRouter = require('./routes/adminRoutes')

app.use('/auth', authRouter)
app.use('/members', memberRouter)
app.use('/perfumes', perfumeRouter)
app.use('/brands', brandRouter)
app.use('/admin', adminRouter)

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.json({ error: err.message }) // Trả về JSON thay vì render
})

module.exports = app
