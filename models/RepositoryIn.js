const mongoose = require('mongoose')
const generateRandom = require('../utils/generateRandom')
const dateFormat = require('../utils/dateFormat').formatDate
const Schema = mongoose.Schema

const RepositoryInSchema = new Schema({
  ReInNum: {
    type: String,
    required: false, 
    defalut: generateRandom()
  },
  inDate: {
    type: Date,
    required: false,
    default: dateFormat(new Date())
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
  // 入库明细应该是血袋ID数组
})

module.exports = RepositoryIn = mongoose.model('RepositoryIns', RepositoryInSchema)
