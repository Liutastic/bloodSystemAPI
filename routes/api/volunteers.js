const Router = require('koa-router')
const passport = require('koa-passport')
const router = new Router()
// 引入volunteer
const Volunteer = require('../../models/Volunteer')
// 引入校验规则
const validateVolunteerInput = require('../../validation/volunteer')

/**
 * @route GET /api/volunteer/test
 * @desc 测试接口地址
 * @access public
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: 'volunteer works'
  }
})
/**
 * @route POST /api/volunteer/add
 * @desc 新增一个志愿者
 * @access private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
  console.log(validateVolunteerInput(ctx.request.body))
  const { errors, isValid } = validateVolunteerInput(ctx.request.body)
  // console.log('ctx.request.body', ctx.request.body)
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }
  // 存储到数据库
  // console.log('IDNo', IDNo)
  const findResult = await Volunteer.find({ IDNo: ctx.request.body.IDNo })
  // console.log('findResult', findResult)
  if (findResult.length > 0) {
    ctx.status = 400
    ctx.body = { msg: '志愿者已存在' }
  } else {
    const newVolunteer = new Volunteer({
      name: ctx.request.body.name,
      IDNo: ctx.request.body.IDNo,
      address: ctx.request.body.address || null,
      phone: ctx.request.body.phone,
      remark: ctx.request.body.remark || null,
      bloodType: ctx.request.body.bloodType
      // 时间 数据库默认生成
      // createdAt: ctx.request.body.createdAt,
    })
    console.log('newVolunteer', newVolunteer)
    await newVolunteer
      .save()
      .then(volunteer => {
        ctx.body = volunteer
      })
      .catch(err => {
        console.log(err)
      })
  }
})

module.exports = router.routes()