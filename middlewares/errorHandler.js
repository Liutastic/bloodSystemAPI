const errorHandler =  err => {
  return {
    status: err.status || err.statusCode || 500,
    msg: err.msg
  }

}