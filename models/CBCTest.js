const mongoose = require('mongoose')
const formatDate = require('../utils/dateFormat').formatDate

const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)
const data = format(formatDate(new Date(), true))

const CBCSchema = new Schema({
  
})