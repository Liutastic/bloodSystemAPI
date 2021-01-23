const mongoose = require('mongoose')
const formatDate = require('../utils/dateFormat').formatDate

const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)
const date = formatDate(new Date(), true)
// 实例化数据模板
const VolunteerSchema = new Schema({
  // 志愿者姓名
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  },
  // 志愿者身份证号码
  IDNo: {
    type: String,
    required: true,
    match: /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/
  },
  address: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    match: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A', 'AB', 'O', 'B']
  },
  remark: {
    type: String,
    required: false,
    maxlength: 100
  },
  isDelete: {
    type: Number,
    required: false, 
    select: false,
    default: 0
  },
  createdAt: {
    type: String,
    required: false, 
    default: date
  }
})

module.exports = Volunteer = mongoose.model('volunteers', VolunteerSchema)