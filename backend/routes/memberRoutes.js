const express = require('express')
const memberRouter = express.Router()
const memberController = require('../controller/memberController')

memberRouter.route('/editProfile')
  .put(memberController.editProfile)

memberRouter.route('/changePassword')
  .put(memberController.editPassword)
module.exports = memberRouter