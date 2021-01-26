const mongoose = require('mongoose')
const formatDate = require('../utils/dateFormat').formatDate

const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)
const date = formatDate(new Date(), true)

const CBCSchema = new Schema({
  itemId: {
    type: String,
    required: false
  },
  itemName: {
    type: String,
    required: false
  },
  limit: {
    type: String,
    // set(val) {
    //   return Number(val.toFixed(2))
    // }
  },
  ceil: {
    type: String,
    // set(val) {
    //   return Number(val.toFixed(2))
    // }
  },
  unit: {
    type: String
  },
  unitType: {
    type: String
  },
  isDeleted: {
    type: Number,
    select: false,
    default: 0
  },
  createdAt: {
    type: String,
    default: date
  }
})

module.exports = CBCTest = mongoose.model('CBCTests', CBCSchema)