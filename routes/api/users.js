const Router = require('koa-router')
const router = new Router()

// 引入volunteer
const User = require('../../models/User')

/**
 * @route GET /api/user/test
 * @desc 测试接口地址
 * @access public
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: 'user works'
  }
})

/**
 * @router POST /api/user/register
 * @description 注册接口
 * @access public 
 */
router.post('/register', async ctx => {
  // console.log(ctx.request.body)
  // 存储到数据库
  const findResult = await User.find({username: ctx.request.body.username})
  // console.log(result)
  if(findResult.length > 0) {
    ctx.status = 400
    ctx.body = {username: '邮箱被占用'}
  } else {
    const newUser = new User({
      username: ctx.request.body.username,
      password: ctx.request.body.password,
      phone: ctx.request.body.phone,
    })

    console.log(newUser)
  }
})

module.exports = router.routes()