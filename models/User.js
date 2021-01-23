/**
 * 医务人员
 */

const mongoose = require('mongoose')
const formatDate = require('../utils/dateFormat').formatDate

const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)

const date = formatDate(new Date())
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
  },
  isDelete: {
    type: Number,
    required: false, 
    select: false,
    default: 0
  },
  avatar: {
    type: String,
    require: false,
    default: 'https://fakeimg.pl/200x200/?text=iamavatar'
  },
  createdAt: {
    type: String,
    require: false,
    // default: new Date()
    default: date
  } 
})

module.exports = User = mongoose.model('users', UserSchema)