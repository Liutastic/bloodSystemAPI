const bcrypt = require('bcryptjs')
// const JSEncrypt = require('node-jsencrypt')
const CryptoJS = require('crypto-js');  //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("Liutastic2333333");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('Liutastic2333333');   //十六位十六进制数作为密钥偏移量

/**
 * @description 对密码进行加密操作
 * @param {*} password 
 */
function encrypt (password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err)
      // console.log(salt)
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
  })
}

//解密方法
function Decrypt (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
function Encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

module.exports = {
  encrypt,
  Decrypt,
  Encrypt
}