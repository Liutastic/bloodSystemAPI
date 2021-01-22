const Validator = require('validator')
const isEmpty = require('./isEmpty')
module.exports = function validateRegisterInput(data) {
  let errors = {}

  data.username = !isEmpty(data.username) ? data.username : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  if (!Validator.isLength(data.username, { min: 1, max: 10 })) {
    errors.msg = '名字的长度不能小于1位且不能超过10位'
  }

  if (Validator.isEmpty(data.username)) {
    errors.msg = '用户名不能为空'
  }


  if (Validator.isEmpty(data.password)) {
    errors.msg = '密码不能为空'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.msg = '密码长度要介于6到30之间'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}