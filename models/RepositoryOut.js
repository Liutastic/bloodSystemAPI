const mongoose = require('mongoose')
const generateRandom = require('../utils/generateRandom')
const dateFormat = require('../utils/dateFormat').formatDate
const Schema = mongoose.Schema

const RepositoryOutSchema = new Schema({
  ReOutNum: {
    type: String,
    required: false, 
    defalut: generateRandom(false)
  },
  outDate: {
    type: String,
    required: false,
    default: dateFormat(new Date())
  },
  // 认领人
  claimer: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  },
  // 认领部门
  claimeDept: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },
  // 经办人
  principal: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  },
  createdAt: {
    type: Date,
    required: false,
    default: dateFormat(new Date())
  }
  // 出库明细应该是血袋ID数组
})

module.exports = RepositoryOut = mongoose.model('RepositoryOuts', RepositoryOutSchema)
