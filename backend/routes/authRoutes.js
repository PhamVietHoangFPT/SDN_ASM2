const authController = require("../controller/authController");
const express = require('express')
const authRouter = express.Router()

authRouter.route('/register')
  .post(authController.register)

authRouter.route('/login')
  .post(authController.login)


module.exports = authRouter;
