const Router = require('koa-router')
const passport = require('koa-passport')
const router = new Router()

const Blood = require('../../models/Blood')
const Volunteer = require('../../models/Volunteer')

// 引入校验规则
const validateBloodInput = require('../../validation/blood')


/**
 * @route GET /api/blood/test
 * @desc 测试接口地址
 * @access public
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: 'blood works'
  }
})

/**
 * @route POST /api/blood/add
 * @description 添加一个血袋
 * @access public
 */
//passport.authenticate('jwt', { session: false }), 
router.post('/add', async ctx => {
  const {errors, isValid} = validateBloodInput(ctx.request.body)
  if(!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }

})

module.exports = router.routes()