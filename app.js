const koa = require('koa')
const cors = require('koa2-cors')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const passport = require('koa-passport')
const koaSession = require('koa-session')
const koaStatic = require('koa-static')
const error = require('koa-json-error')
const CryptoJS = require('crypto-js')
const path = require('path')

const db = require('./config/keys').mongoURI
const sessionConfig = require('./config/keys').sessionConfig
const sessionKey = require('./config/keys').sessionKey
const uploadConfig = require('./config/keys').uploadConfig
const staticConfig = require('./config/keys').staticConfig
const responseFormatter = require('./middlewares/responseFormatter')
const errorHandler = require('./middlewares/errorHandler')

// 实例化koa

const app = new koa()
const router = new Router()
const session = koaSession(sessionConfig, app)
app.keys = sessionKey
app.use(error(errorHandler))
app.use(koaStatic(path.join(__dirname + '/public')), staticConfig)
app.use(session)
app.use(cors())
app.use(koaBody(uploadConfig))
app.use(bodyParser())

// 统一json数据返回格式
app.use(responseFormatter)
// 引入users.js路由
const users = require('./routes/api/users')
// 引入volunteer.js 路由
const volunteers = require('./routes/api/volunteers')
// 引入blood.js 路由
const bloods = require('./routes/api/bloods')
// 引入CBCTest.js路由
const CBCTests = require('./routes/api/CBCTests')
// 引入验证码路由
const vcode = require('./routes/api/vcode')
// 引入上传文件路由
const fileHandler = require('./routes/api/fileHandler')
// 引入志愿者体检单phyexam.js路由
const phyexam = require('./routes/api/phyExam')

const key = CryptoJS.enc.Utf8.parse("Liutastic2333333");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('Liutastic2333333');   //十六位十六进制数作为密钥偏移量

function Encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}
function Decrypt (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

// 路由
router.get('/', async ctx => {
  const query = ctx.request.query
  let text = query.text || ''
  ctx.body = {
    message: Decrypt(text),
    message2: Encrypt('wgnls')
    // message: aesEncrypt(text, 'secret')
  }
})

// 链接数据库
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongodb is connected...')
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
router.use('/api/blood', bloods)
router.use('/api/cbctest', CBCTests)
router.use('/api/vcode', vcode)
router.use('/api/file', fileHandler)
router.use('/api/phyexam', phyexam)
// router.use('/api/blood', bloods)

// 配置路由
app.use(router.routes()).use(router.allowedMethods())


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server start on ${port}`)
})