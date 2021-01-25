const mongoose = require('mongoose')
const dateFormat = require('../utils/dateFormat').formatDate
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)

const BloodSchema = new Schema({
  // 此处需要关联志愿者获取志愿者id和志愿者的血型
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer"
  },
  bloodVolume: {
    type: Number,
    required: true,
    default: 0
  },
  drawDate: {
    type: String,
    required: true
    // match: /^\d{4,4}-\d{2,2}-\d{2,2}[ ]\d{2,2}:\d{2,2}:\d{2,2}/
  },
  // 采血者
  drawer: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  },
  // 保质期
  shelfLife: {
    type: Number,
    required: true,
    min: 0
  },
  // 是否合格
  isQualified: {
    type: Number,
    required: true,
    default: 1
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
    default: dateFormat(new Date(), true)
  }
})

module.exports = blood = mongoose.model('bloods', BloodSchema)
