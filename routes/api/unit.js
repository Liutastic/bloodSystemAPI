const Router = require('koa-router')
const passport = require('koa-passport')

const formatDate = require('../../utils/dateFormat').formatDate
const router = new Router()

const Unit = require('../../models/Unit')

/**
 * @route GET /api/unit/test
 * @access public
 * @description 测试
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: 'unit works'
  }
})

/**
 * @route POST /api/unit/add
 * @access private
 * @description 新增一个单位
 */
router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
  const findResult = await Unit.find({ unitName: ctx.request.body.unitName })
  if (findResult.length > 0) {
    ctx.status = 400
    ctx.body = { msg: '该单位已存在' }
  } else {
    const newUnit = new Unit({
      unitName: ctx.request.body.unitName
    })
    await newUnit
      .save()
      .then(unit => {
        ctx.body = unit
      })
      .catch(err => { console.log(err) })
  }
})

/**
 * @route POST /api/unit/edit
 * @access private
 * @description 修改一个单位
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), async ctx => {
  let body = ctx.request.body
  let id = ctx.request.body._id
  try {
    const updateResult = await Unit.findByIdAndUpdate(id, body)
    if (updateResult) {
      ctx.status = 200
      ctx.body = updateResult
    } else {
      ctx.status = 400
      ctx.response.status = 400
      ctx.response.message = '数据库中无'
      ctx.body = {
        msg: '修改失败'
      }
    }
  } catch { }
})
/**
 * @route GET /api/unit/page
 * @access private
 * @description 展示所有单位
 */
router.post('/page', async ctx => {

})
module.exports = router.routes()