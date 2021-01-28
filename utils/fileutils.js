const dateFormatRandom = require('./dateFormat').formatDateRandom
const fs = require('fs')
const path = require('path')
const baseUrl = require('../config/keys').baseUrl

/**
 * @description 使用时间戳生成时间名字
 * @param {文件后缀名} extname 
 */
function createFileName (extname) {
  const date = new Date()
  return `avatar-${dateFormatRandom(date)}.${extname}`
}

/**
 * @description 使用fs和path来处理上传的文件
 * @param {上下文} ctx 
 */
function handleUploadImg (ctx) {
  let file = ctx.request.files.file
  let suffix = file.name.split('.')[1]
  
  
  let reader = fs.createReadStream(file.path)
  let newFileName = createFileName(suffix)
  let uploadPath = path.join(__dirname, '../public/avatar/') + newFileName
  // 
  let upStream = fs.createWriteStream(uploadPath)
  reader.pipe(upStream)
  return {
    url: `${baseUrl}/avatar/${newFileName}`,
    name: newFileName,
    size: Number((file.size / 1024).toFixed(0)),
    type: suffix
  }
}

module.exports = {
  createFileName,
  handleUploadImg
}