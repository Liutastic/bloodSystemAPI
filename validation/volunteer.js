const Validator = require('validator')
const isEmpty = require('./isEmpty')
const vUtils = require('./validatorUtils')

module.exports = function validateVolunteerInput(data) {
  let errors = {
    msg: ''
  }

  data.name = !data.name ? '' : data.name
  data.IDNo = !data.IDNo ? '' : data.IDNo
  data.address = !data.address ? '未知' : data.address
  data.phone = !data.phone ? '' : data.phone
  data.bloodType = !data.bloodType ? '未知' : data.bloodType
  data.remark = !data.remark ? '无' : data.remark

  if (Validator.isEmpty(data.name)) {
    // console.log('data.name', data.name)
    errors.msg = '名字不能为空'
  }

  if (!Validator.isLength(data.name.trim()), { min: 1, max: 10 }) {
    console.log('volunteerValidator', data.name)
    errors.msg = '名字的长度介于1到10位之间'
  }

  if (Validator.isEmpty(data.IDNo)) {
    errors.msg = '身份证不能为空'
  }

  if(!vUtils.isIDNo(data.IDNo)) {
    // console.log('输入了错误的身份证号码')
    errors.msg = '身份证号不正确'
  }
  
  if(Validator.isEmpty(data.phone)) {
    errors.msg = '手机号不能为空'
  }

  if(!vUtils.isPhoneNum(data.phone)) {
    // console.log('输入了错误的手机号码')

    errors.msg = '手机号码不正确'
  }

  if(Validator.isEmpty(data.bloodType)) {
    errors.msg = '血型不能为空'
  }

  if(!vUtils.isBloodType) {
    errors.msg = '血型只能为A, B, AB, O其中一种'
  }

  if(!Validator.isLength(data.remark, {max: 100})) {
    errors.msg = '备注的长度不能超过100个字符'
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  }
}
