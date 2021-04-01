const mongoose = require('mongoose')
const formatDate = require('../utils/dateFormat').formatDate

const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)
const date = formatDate(new Date(), true)

const UnitSchema = new Schema({
  // 单位名称
  unitName: {
    type: String,
    required: true
  },
  isDeleted: {
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

module.exports = Unit = mongoose.model('units', UnitSchema)