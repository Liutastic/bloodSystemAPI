const Router = require('koa-router')
const router = new Router()
const bcrypt = require('bcryptjs')
const encrypt = require('../../utils/encryption').encrypt
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
// const passsport = require('koa-passport')
const passport = require('koa-passport')

// 引入user 
const User = require('../../models/User')

// 引入input验证
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

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
  const { errors, isValid } = validateRegisterInput(ctx.request.body)

  // 判断是否通过验证
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }

  // 存储到数据库
  const findResult = await User.find({ username: ctx.request.body.username })
  // console.log(result)
  if (findResult.length > 0) {
    ctx.status = 400
    ctx.body = { msg: '用户名已被占用' }
  } else {
    const newUser = new User({
      avatar: ctx.request.body.avatar,
      username: ctx.request.body.username,
      password: ctx.request.body.password,
      phone: ctx.request.body.phone,
    })
    // 对密码进行加密操作
    const psw = await encrypt(newUser.password)
    newUser.password = psw
    await newUser
      .save()
      .then(user => {
        ctx.body = {
          id: user._id,
          username: user.username,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt
        }
      })
      .catch(err => {
        console.log(err)
        // ctx.body = err
      })
    // 返回json数据

  }
})
/**
 * @route POST /api/user/login
 * @description 登录接口, 返回token
 * @access public
 */
router.post('/login', async ctx => {

  const { errors, isValid } = validateLoginInput(ctx.request.body)
  console.log(ctx.request)
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }

  let result = false
  // console.log(ctx)
  const findResult = await User.find({ username: ctx.request.body.username })
  const user = findResult[0]
  const password = ctx.request.body.password

  if (findResult.length === 0) {
    ctx.status = 404
    ctx.body = {
      msg: '用户不存在'
    }
  } else {
    result = bcrypt.compareSync(password, user.password)

    if (result) {
      // 返回token
      const payload = { id: user.id, name: user.username }
      const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 })

      ctx.status = 200
      ctx.body = {
        success: true,
        token: `Bearer ${token}`
      }
    } else {
      ctx.status = 400
      ctx.body = {
        msg: '密码错误'
      }
    }
  }

})

/**
 * @route GET /api/users/current
 * @description 用户信息接口地址
 * @access private
 */
router.get('/current', passport.authenticate('jwt', { session: false }), async ctx => {
  // console.log('ctx.state',ctx.state)
  ctx.body = {
    id: ctx.state.user.id,
    username: ctx.state.user.username,
    phone: ctx.state.user.phone || null
  }
})

module.exports = router.routes()