/**
 * @description 处理undefined正则
 * @param {reg} RegExp类
 */
function handleReg (reg) {
  let regString = reg.toString()
  if(regString === '/(?:)/gi') return new RegExp('[\s\S]*')
}

module.exports = handleReg