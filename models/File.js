const mongoose = require('mongoose')
const formatDate = require('../utils/dateFormat').formatDate

const Schema = mongoose.Schema
mongoose.set('useFindAndModify', false)
const date = format(new Date(), true)

const FileSchema = new Schema({
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: false,
    default: date
  },
  isDeleted: {
    type: Number,
    required: false,
    select: false,
    default: 0
  }
})

module.exports = File = mongoose.model('files', FileSchema)