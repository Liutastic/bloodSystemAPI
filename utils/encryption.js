const bcrypt = require('bcryptjs')

/**
 * @description 对密码进行加密操作
 * @param {*} password 
 */
function encrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) reject(err)
      // console.log(salt)
      bcrypt.hash(password, salt, (err, hash) => {
        if(err) reject(err)
        resolve(hash)
      })
    })
  })
}

/**
 * @description 对比密码
 */
function comparePsw() {
  // return 
}

module.exports = {
  encrypt
}