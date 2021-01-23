const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')

const db = require('./config/keys').mongoURI
const responseFormatter = require('./middlewares/responseFormatter')

// 实例化koa

const app = new koa()
const router = new Router()

app.use(bodyParser())
app.use(responseFormatter)
// 引入users.js路由
const users = require('./routes/api/users')
// 引入volunteer.js 路由
const volunteers = require('./routes/api/volunteers')
// 路由
router.get('/', async ctx => {
  ctx.body = {
    msg: 'hello'
  }
})

// 链接数据库
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongodb connected')
  })
  .catch(err => {
    console.log(err)
  })
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)
// require('./config/passport')

// 配置路由地址
router.use('/api/user', users)
router.use('/api/volunteer', volunteers)

// 配置路由
app.use(router.routes()).use(router.allowedMethods())


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server start on ${port}`)
})