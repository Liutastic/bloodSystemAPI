const Router = require('koa-router')
const passport = require('koa-passport')

const formatDate = require('../../utils/dateFormat').formatDate
const handleReg = require('../../utils/handleReg')
const router = new Router()

const CBCTest = require('../../models/CBCTest')

// 校验

// passport.authenticate('jwt', { session: false }),

/**
 * @route GET /api/cbctest/test
 * @desc 测试接口地址
 * @access public
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: 'cbctest works'
  }
})

/**
 * @route POST /api/cbctest/add
 * @description 新增一项血常规检验项
 * @access private
 */
router.post('/add', async ctx => {
  const requestBody = ctx.request.body
  console.log('requestBody', requestBody)
  const findResult = await CBCTest.find({ itemId: requestBody.itemId })
  console.log('findResult', findResult);
  if (findResult.length > 0) {
    ctx.status = 400
    ctx.body = { msg: '该项检验项已存在, 请勿重复添加' }
  } else {
    const newCBCTest = new CBCTest({
      itemId: requestBody.itemId,
      itemName: requestBody.itemName,
      limit: requestBody.limit,
      ceil: requestBody.ceil,
      unit: requestBody.unit,
      unitType: requestBody.unitType
    })
    await newCBCTest
      .save()
      .then(cbc => {
        // delete cbc.isDeleted
        ctx.body = cbc
      })
      .catch(err => { console.log(err) })
  }
  // ctx.body = cbc
})

/**
 * @description 查找血常规检验项
 * @access private 
 * @route /api/cbctest/page
 */
router.get('/page', async ctx => {
  const query = ctx.request.query

  console.log('query', query)
  // const filter = {
  //   $or: [
  //     {
  //       itemId: {
  //         $regex: `/${query.itemId? query.itemId: '[\s\S]*'}/`
  //       }
  //     },
  //     {
  //       itemName: {
  //         $regex: `/${query.itemName? query.itemName: '[\s\S]*'}/`
  //       }
  //     }
  //   ],
  //   isDeleted: 0
  // }
  // console.log('filter', filter.$or.limit)
  // const findResult = await CBCTest.find(filter)
  const findResult = await CBCTest.find()

  // console.log(findResult)
  // console.log(filter.$or);
  ctx.status = 200
  ctx.body = findResult
})

/**
 * @route /api/cbctest/update
 * @description 查找一个检验项并且修改
 * @access private
 */
router.post('/update', async ctx => {
  const body = ctx.request.body
  const id = ctx.request.body.id
  // const date = formatDate(new Date(), true)
  delete body.id
  try {
    const updateResult = await CBCTest.findByIdAndUpdate(id, body)
    if (updateResult) {
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
})

/**
 * @route /api/cbctest/delete
 * @description 删除一个校验项
 * @access private
 */
// passport.authenticate('jwt', { session: false }),
router.post('/delete', async ctx => {
  const id = ctx.request.body.id
  // 当查找条件(id)存在的时候才执行修改操作
  try {
    const updateResult = await CBCTest.findByIdAndUpdate(id, { isDelete: 1 })
    // updateResult.createdAt = formatDate(updateResult.createdAt, true)
    ctx.status = 200
    ctx.body = updateResult
  } catch (err) {
    ctx.status = 400
    ctx.response.status = 400
    ctx.response.message = '数据库中无该条数据'
    ctx.body = {
      msg: '删除失败'
    }
  }
})

module.exports = router.routes()
