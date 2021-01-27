const Router = require('koa-router')
const svgCaptcha = require('svg-captcha')
const capOption = require('../../config/keys').capOption
const router = new Router()


// console.log(cap)
/**
 * @description 获取验证码
 * @route /api/vcode/get
 * @access public
 */
router.get('/get', async ctx => {
  // 算术验证码
  let cap = svgCaptcha.createMathExpr(capOption)
  // cap.data.replace(/^\\$/g, '')
  ctx.body = cap.data.replace(/^\\$/g, '')
  ctx.session.cap = cap.text.toLowerCase()
  console.log('cap.data', cap.data)

})

module.exports = router.routes()