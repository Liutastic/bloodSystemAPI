const Validator = require('validator')
const isEmpty = require('./isEmpty')
const vUtils = require('./validatorUtils')
const formatDate = require('../utils/dateFormat').formatDate
module.exports = function validateBloodInput(data) {
  let errors = {}

  data.bloodVolume = !data.bloodVolume ? 0 : data.bloodVolume
  data.drawDate = !data.drawDate ? formatDate(new Date(), true) : data.drawDate
  data.drawer = !data.drawer ? '' : data.drawer
  data.shelfLife = !data.shelfLife ? 7 : data.shelfLife
  // data.isQualified = !data.isQualified ? true : data.isQualified
  data.remark = !data.remark ? '' : data.remark

  if(data.bloodVolume === 0) {
    errors.msg = '请输入血袋的血量'
  }

  if(!data.drawDate) {
    errors.msg = '请输入献血日期'
  }

  if(!data.drawer) {
    errors.msg = '请输入采血人姓名'
  }

  if(data.shelfLife === 0) {
    errors.msg = '请输入该血袋保质期'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
  
}
