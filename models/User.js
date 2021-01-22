/**
 * 医务人员
 */

const mongoose = require('mongoose')
const dateFormat = require('../utils/dateFormat').formatDate

const Schema = mongoose.Schema

const UserSchema = new Schema({
  // 真实姓名
  username: {
    type: String,
    required: true,
    minlength: 1, 
    maxlength: 10
  },
  password: {
    type: String,
    required: true
  },
  // 手机号码
  phone: {
    type: String,
    required: false, 
    match: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/
  }
})

module.exports = User = mongoose.model('users', UserSchema)