/**
 * @description 生成出入库编号
 * @param {Boolean} isIn 是否为入库编号
 * @returns {String} 出入库编号
 */
const formatDateRandom = require('./dateFormat').formatDateRandom
export default (isIn = true) => {
  const date = new Date()
  let num = '';
  for (let i = 0; i < 3; i++) {
    num += Math.floor(Math.random() * 10);
  }
  if (isIn) {
    return `RK${formatDateRandom(date)}${num}`
  } else {
    return `CK${formatDateRandom(date)}${num}`
  }
}