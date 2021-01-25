const Router = require('koa-router')
const passport = require('koa-passport')
const router = new Router()

const Blood = require('../../models/Blood')
const Volunteer = require('../../models/Volunteer')

// 引入校验规则
const validateBloodInput = require('../../validation/blood')
const { findById } = require('../../models/Blood')

// passport 验证, 放在路由参数内
// passport.authenticate('jwt', { session: false }), 

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
router.post('/add', async ctx => {
  const { errors, isValid } = validateBloodInput(ctx.request.body)
  const { userId, bloodVolume, drawDate, drawer, shelfLife, isQualified, remark } = ctx.request.body
  if (!isValid) {
    ctx.status = 400
    ctx.body = errors
    return
  }
  // console.log(body.userId)
  // 先通过志愿者id找到志愿者 然后再把志愿者id存到血袋内实现关联
  if (!userId) {
    ctx.status = 400
    ctx.body = {
      msg: '该志愿者不存在, 请添加志愿者'
    }
    return
  }
  const volunteer = await Volunteer.findById(userId)
  // 如何判断血袋重复性?
  const newBlood = new Blood({
    bloodVolume,
    // 日期默认当天
    drawDate,
    drawer,
    shelfLife,
    isQualified,
    remark,
    volunteer: userId
  })
  await newBlood
    .save()
    .then(blood => {
      ctx.body = blood
    })
    .catch(err => {
      console.log(err)
    })
  // console.log(volunteer)
})

/**
 * @description 查询血袋
 * @route /api/blood/page
 * @access private
 */
router.get('/page', async ctx => {
  const query = ctx.request.query
  // 模糊查询正则
  console.log('query', query)
  const findResult = await Blood.aggregate([
    {
      $lookup: {
        from: 'volunteers',
        localField: 'volunteerId',
        foreignField: '_id',
        as: 'volunteer'
      }
    }
  ])
  findResult.forEach(ele => {
    ele.volunteer = ele.volunteer[0]
    ele.bloodType = ele.volunteer.bloodType
  })
  ctx.status = 200
  ctx.body = findResult
  // console.log('findResult', findResult);
})

module.exports = router.routes()