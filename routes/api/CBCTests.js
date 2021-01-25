const Router = require('koa-router')
const passport = require('koa-passport')

const formatDate = require('../../utils/dateFormat').formatDate
const router = new Router()

const CBCTest = require('../../models/CBCTest')

// 校验

// passport.authenticate('jwt', { session: false }),

/**
 * @route GET /api/cbctest/test
 * @desc 测试接口地址
 * @access public
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: 'cbctest works'
  }
})

/**
 * @route POST /api.cbctest/add
 * @description 新增一项血常规检验项
 * @access private
 */
router.post('/add', async ctx => {
  const requestBody = ctx.request.body 
  const findResult = await CBCTest.find({itemId: requestBody.itemName})

  if(findResult.length > 0) {
    ctx.status = 400
    ctx.body = {msg: '该项检验项已存在'}
  } else {
    const newCBCTest = new CBCTest({
      itemId: requestBody.itemId,
      itemName: requestBody.itemName,
      limit: requestBody.limit,
      ceil: requestBody.ceil,
      
    })
  }
})
module.exports = router.routes()

