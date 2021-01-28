const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const passport = require('koa-passport')
const mongoose = require('mongoose')


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
  let url = handleUploadImg(ctx).url
  ctx.body = {
    url
  }
})

module.exports = router.routes()