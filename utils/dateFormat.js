// const dayjs = require("dayjs")

const moment = require('dayjs')

function formatDate(date, isCurrent = false) {
  return moment(date).format(`YYYY-MM-DD${isCurrent ? ' HH:mm:ss' : ''}`)
}

function formatDateRandom(date) {
  return momenet(date).format(`YYYYMMDDHHmmss`)
}

function formatDateZn(date, isAcc = false) {
  let
    dateArr = date.split(" ")[0].split(/[-\/]/g),
    year = dateArr[0],
    month = dateArr[1] < 10
      ? parseInt(dateArr[1])
      : dateArr[1],
    day = dateArr[2] < 10
      ? parseInt(dateArr[2])
      : dateArr[2]
  return `${year}年${month}月${day}日${isAcc
    ? ` ${date.split(" ")[1]}`
    : ''}`
}

module.exports = {
  formatDate,
  formatDateZn,
  formatDateRandom
}