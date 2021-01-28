const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const passport = require('koa-passport')
const mongoose = require('mongoose')

const File = require('../../models/File')

const handleUploadImg = require('../../utils/fileutils').handleUploadImg

const baseUrl = require('../../config/keys').baseUrl
const router = new Router()

// passport.authenticate('jwt', { session: false }),

/**
 * @route GET /api/file/test
 * @descriptrion 测试api
 * @access public
 */
router.get('/test', async ctx => {
  ctx.status = 200
  ctx.body = {
    msg: 'file api works.'
  }
})

/**
 * @route POST /api/file/upload
 * @description 上传文件
 * @access private
 */
router.post('/upload', async ctx => {
  let file = handleUploadImg(ctx)
  const newFile = new File({
    fileName: file.name,
    filePath: file.url,
    fileType: file.type,
    fileSize: file.size
  })
  await newFile
    .save()
    .then(file => {
      ctx.body = {
        url: file.filePath
      }
    })
    .catch(err => {
      console.log(err)
    })

})

/**
 * @description 删除一个文件(逻辑删除)
 * @access private
 * @route /api/file/delete
 */
router.post('/delete', async ctx => {
  const id = ctx.request.body.id
  // 当查找条件(id)存在的时候才执行修改操作
  try {
    const updateResult = await File.findByIdAndUpdate(id, { isDelete: 1 })
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

/**
 * @description 删除一个文件(永久删除)
 * @access private
 * @route /api/file/deleteperm
 */
router.post('/deleteperm', async ctx => {
  const id = ctx.request.body.id
  // 当查找条件(id)存在的时候才执行修改操作
  try {
    const updateResult = await File.findByIdAndDelete(id)
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

/**
 * @route /api/file/page
 * @description 查找所有的图片文件(分页)
 * @access private
 */
router.get('/page', async ctx => {
  try {
    const query = ctx.request.query
    let page = Number(query.page) ? Number(query.page) : 1
    let size = Number(query.size) ? Number(query.size) : 9999
    let skip = (page - 1) * size
    const findResult = await File.find().skip(skip).limit(size)
    const totalElement = await File.find().countDocuments()
    ctx.status = 200
    ctx.body = {
      page: page,
      content: findResult,
      totalElement
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      msg: '服务器出错'
    }
  }
})


module.exports = router.routes()