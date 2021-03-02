const Router = require('koa-router')
const router = new Router()

/**
 * @route GET /api/menu/page
 * @description 获取菜单
 * @access private
 */
router.get('/page', async ctx => {
  let menu = [
    {
      title: '',
      path: '',
      children: [
        {

        }
      ]
    }
  ]
})