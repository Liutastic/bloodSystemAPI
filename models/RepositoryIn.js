const mongoose = require('mongoose')
const generateRandom = require('../utils/generateRandom')
const dateFormat = require('../utils/dateFormat').formatDate
const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)

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
    type: String,
    required: false,
    default: dateFormat(new Date())
  },
  // 入库明细应该是血袋ID数组
  blood: {
    type: [mongoose.Schema.Types.ObjectId],
    refs: 'Blood'
  },
  isDelete: {
    type: Number,
    required: false, 
    select: false,
    default: 0
  },
})

module.exports = RepositoryIn = mongoose.model('RepositoryIns', RepositoryInSchema)
