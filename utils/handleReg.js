/**
 * @description 处理undefined正则
 * @param {reg} RegExp类
 */
function handleReg (reg) {
  let regString = reg.toString()
  if (regString === '/(?:)/gi') return new RegExp('[\s\S]*')
}

function handleIDNo (txt) {
  return txt.replace(/^(\d{6})\d+(\d{4})$/, "$1******$2")
}

module.exports = { handleReg, handleIDNo }