const Router = require('koa-router')
const passport = require('koa-passport')
// 引入时间格式化
const formatDate = require('../../utils/dateFormat').formatDate
const router = new Router()
// 引入volunteer
const Volunteer = require('../../models/Volunteer')
// 引入validator校验规则
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
 * @route GET /api/volunteer/page
 * @description 查找志愿者(支持模糊查找)
 * @access private
 */
// passport.authenticate('jwt', { session: false }),
router.get('/page', async ctx => {
  const query = ctx.request.query
  // 模糊查询正则
  const nameReg = new RegExp(query.name)
  const addReg = new RegExp(query.address)
  const bloodTypeReg = new RegExp(query.bloodType)
  const phoneReg = new RegExp(query.phone)
  const IDNoReg = new RegExp(query.IDNo)
  const findResult = await Volunteer.aggregate([
    {
      $project: {
        name: 1,
        IDNo: 1,
        address: 1,
        phone: 1,
        bloodType: 1,
        remark: 1,
        createdAt: 1
      }
    },
    {
      $match: {
        name: nameReg,
        address: addReg,
        bloodType: bloodTypeReg,
        phone: phoneReg,
        IDNo: IDNoReg,
        isDelete: 0
      }
    }
  ])
  ctx.status = 200
  ctx.body = findResult
  // console.log('findResult', findResult)
})

/**
 * @route POST /api/volunteer/add 
 * @desc 新增一个志愿者
 * @access private
 */
//passport.authenticate('jwt', { session: false }), 
router.post('/add', async ctx => {
  // console.log(validateVolunteerInput(ctx.request.body))
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
    // console.log('newVolunteer', newVolunteer)
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
/**
 * @route POST /api/volunteer/update
 * @description 修改一个志愿者
 * @access private
 */
// passport.authenticate('jwt', { session: false }),
router.post('/update', async ctx => {
  const body = ctx.request.body
  const id = ctx.request.body.id
  delete body.id
  // console.log('body', body)
  // 当查找条件(id)存在的时候才执行修改操作
  try {
    const updateResult = await Volunteer.findByIdAndUpdate(id, body)
    if (updateResult) {
      // updateResult.createdAt = formatDate(updateResult.createdAt, true)
      ctx.status = 200
      ctx.body = updateResult
    } else {
      ctx.status = 400
      ctx.response.status = 400
      ctx.response.message = '数据库中无该条数据'
      ctx.body = {
        msg: '修改失败'
      }
    }
  } catch (err) {
    
  }
  // console.log('updateResult', updateResult)

})

/**
 * @route /api/volunteer/delete
 * @description 删除一个志愿者
 * @access private
 */
// passport.authenticate('jwt', { session: false }),
router.post('/delete', async ctx => {
  const id = ctx.request.body.id
  // 当查找条件(id)存在的时候才执行修改操作
  try {
    const updateResult = await Volunteer.findByIdAndUpdate(id, {isDelete: 1})
    if (updateResult) {
      // updateResult.createdAt = formatDate(updateResult.createdAt, true)
      ctx.status = 200
      ctx.body = updateResult
    } else {
      ctx.status = 400
      ctx.response.status = 400
      ctx.response.message = '数据库中无该条数据'
      ctx.body = {
        msg: '删除失败'
      }
    }
  } catch (err) {
    
  }
})

module.exports = router.routes()