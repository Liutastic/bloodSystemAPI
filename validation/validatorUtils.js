/**
 * @description 验证身份证号码
 */
function isIDNo(data) {
  return /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(data)
}

/**
 * @description 验证手机号码
 */
function isPhoneNum(data) {
  return /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/.test(data)
}

/**
 * @description 判断血型
 */
function isBloodType(data) {
  if (data !== 'A' || data !== 'B' || data !== 'AB' || data !== 'O') {
    return false
  }
  return true
}
 
module.exports = {
  isIDNo,
  isPhoneNum,
  isBloodType 
}