const Router = require('koa-router')
const router = new Router()

// 引入volunteer
const Volunteer = require('../../models/Volunteer')

/**
 * @route GET /api/volunteer/test
 * @desc 测试接口地址
 * @access public
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: 'user works'
  }
})

module.exports = router.routes()