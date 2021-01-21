const Router = require('koa-router')
const router = new Router()

/**
 * @route GET /api/users/test
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