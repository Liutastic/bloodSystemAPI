const formatDate = require('../utils/dateFormat').formatDate

let responseFormatter = async (ctx, next) => {
  //先去执行路由
  await next();

  //如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    // console.log('ctx', ctx)
    ctx.status = ctx.response.status
    ctx.body = {
      stamp: formatDate(new Date(), true),
      code: ctx.response.status,
      message: ctx.response.message,
      data: ctx.body
    }
  } else {
    ctx.status = ctx.response.status
    ctx.body = {
      stamp: formatDate(new Date(), true),
      code: ctx.response.status,
      message: ctx.response.message
    }
  }
}

module.exports = responseFormatter;