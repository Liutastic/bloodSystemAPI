const Router = require('koa-router')
const passport = require('koa-passport')

const router = new Router()

const PhyExam = require('../../models/PhyExam')


// passport.authenticate('jwt', { session: false }),

/**
 * @route GET /api/phyexam/test
 * @desc 测试接口地址
 * @access public
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: 'phyexam works'
  }
})

/**
 * @route POST /api/phyexam/add
 * @description 添加一名用户的一个体检项结果
 * @access private 
 */
router.post('/add', async ctx => {
  // 接收到的数组是一个json字符串，需要用JSON的方法进行解析
  // 解析之后再使用insertMany插入到体检结果表中
  // ctx.body = ctx.request.body
  const body = ctx.request.body
  console.log(body.resultString);

  let insertArr = JSON.parse(body.resultString)
  console.log(body.resultString);
  console.log(insertArr)
  ctx.body = {msg: 3}
})
module.exports = router.routes()