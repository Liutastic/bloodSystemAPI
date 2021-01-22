const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput (data) {
  let errors = {}

  data.username = isEmpty(data.username)? '': data.username
  data.password = isEmpty(data.password)? '': data.password

  if(Validator.isEmpty(data.username)) {
    errors.msg = '请输入用户名'
  }

  if(Validator.isEmpty(data.password)) {
    errors.msg = '请输入密码'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}