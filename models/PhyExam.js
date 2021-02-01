const mongoose = require('mongoose')
const formatDate = require('../utils/dateFormat').formatDate

const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)
const date = formatDate(new Date(), false)

const PhyExamSchema = new Schema({
  volunteerId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  CBCTestId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  examResult: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Number,
    required: false,
    default: 0
  },
  createdAt: {
    type: String,
    required: false,
    default: date
  }
})

module.exports = PhyExam = mongoose.model('phyexams', PhyExamSchema)