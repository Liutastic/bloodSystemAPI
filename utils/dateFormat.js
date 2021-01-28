// const dayjs = require("dayjs")

const moment = require('dayjs')

function formatDate(date, isCurrent = false) {
  return moment(date).format(`YYYY-MM-DD${isCurrent ? ' HH:mm:ss' : ''}`)
}

function formatDateRandom(date) {
  return moment(date).format(`YYYYMMDDHHmmss`)
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
  return `${year}年${month}月${day}日${isAcc ? ` ${date.split(" ")[1]}` : ''}`
}

/**
 * @author xuanzai
 * @description 时间差 date_1 - date_2
 */
function dateDiff(date_1, date_2) {
  let
    timeLine = moment(date_1).diff(moment(date_2)) / 1000,
    second = parseInt(timeLine % (60 * 60) % 60),
    minute = parseInt(timeLine % (60 * 60) / 60),
    hour = parseInt(timeLine / 60 / 60)
  return {
    stamp: timeLine * 1000,
    seconds: timeLine,
    minutes: parseInt(timeLine / 60),
    hours: parseInt(timeLine / 60 / 60),
    days: parseInt(timeLine / 60 / 60 / 24),
    weeks: parseInt(timeLine / 60 / 60 / 24 / 7),
    time: `${hour < 10
      ? `0${hour}`
      : hour}:${minute < 10
        ? `0${minute}`
        : minute}:${second < 10
          ? `0${second}`
          : second}`
  }
}

/**
 * @description 指定日期加上或者减去n天后的日期
 * @author 阿柴
 * @param date 要操作的日期
 * @param count 要增减的日数
 * @param isPlus true为加,false为减
 * @return 增加或者减去n天后的日期字符串
 */
function dateOperate(date, count, isPlus = true) {
  let dateArr = date.split(' ')
  let tmpDate = new Date(dateArr[0])
  if(isPlus) {
    let resultDate = new Date((tmpDate / 1000 + (86400 * count)) * 1000)
    return `${resultDate.getFullYear()}-${resultDate.getMonth() + 1}-${resultDate.getDate()} ${dateArr[1]}`
  } else {
    let resultDate = new Date((tmpDate / 1000 - (86400 * count)) * 1000)
  return `${resultDate.getFullYear()}-${resultDate.getMonth() + 1}-${resultDate.getDate()} ${dateArr[1]}`
  }
  
  // console.log(tmpDate)
}

module.exports = {
  formatDate,
  formatDateZn,
  formatDateRandom,
  dateDiff,
  dateOperate
}