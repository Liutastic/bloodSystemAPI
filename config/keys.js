module.exports = {
  // mongodb路径
  mongoURI: 'mongodb://127.0.0.1:27017/bloodApi',
  // passportKey
  secretOrKey: 'secret',
  // 服务器地址
  baseUrl: 'http://localhost:3000',
  // 验证码配置项
  capOption: {
    size: 4,
    ignoreChars: '0o1i',
    noise: 4,
    color: true,
    background: '#ffffff'
  },
  // session缓存配置
  sessionConfig: {
    key: 'appletsystem:sess',
    maxAge: 108000000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false
  },
  // session 缓存配置
  sessionKey: ['appletSystem'],

  // koa-body 配置对象
  uploadConfig: {
    // 支持文件上传
    multipart: true,
    // 文件上传相关配置
    formidable: {
      // 保留文件后缀
      keepExtensions: true,
      // 限制文件上传大小为 100M
      maxFieldsSize: 100 * 1024 * 1024
    }
  },
  // koa-static 配置项
  staticConfig: {
    index: false,       // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
    hidden: false,      // 是否同意传输隐藏文件
    defer: true,
  }
}