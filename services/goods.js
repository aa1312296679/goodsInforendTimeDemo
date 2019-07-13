/**时间格式化处理函数**/
const timeFormatHandle = {
  "h": (remainingTime) => {
    return (timeFormatFirst(remainingTime, (60 * 60 * 1000), 0) < 10) && `0${timeFormatFirst(remainingTime, (60 * 60 * 1000), 0).toString()}` || timeFormatFirst(remainingTime, (60 * 60 * 1000), 0).toString();
  },
  "m": (remainingTime) => {
    return (timeFormatFirst(remainingTime, (60 * 1000), 60) < 10) && `0${timeFormatFirst(remainingTime, (60 * 1000), 60).toString()}` || timeFormatFirst(remainingTime, (60 * 1000), 60).toString();
  },
  "s": (remainingTime) => {
    return (timeFormatFirst(remainingTime, 1000, 60) < 10) && `0${timeFormatFirst(remainingTime, 1000, 60).toString()}` || timeFormatFirst(remainingTime, 1000, 60).toString();
  },
  "ms": (remainingTime) => {
    return (remainingTime < 10) && (`0${remainingTime.toString()}`) || (remainingTime.toString())
  }
}

/**
 *计算客户端时间与服务器时间的毫秒时间差
 * @serverTime 服务器时间总毫秒
 */
const difference = (serverTime) => {
  // 计算并返回时间差
  return (new Date().getTime() - serverTime)
}

/**
 * 计算活动剩余的总毫秒
 * @end_time 截止时间
 * @time_difference 本地时间与服务器时间的时间差
 */
const endTimeFormat = (end_time, time_difference) => {
  //客户端的当前时间总毫秒
  var curTime = new Date().getTime();
  //计算活动剩余时间总毫秒
  return ((end_time - curTime) + time_difference);
}

/**
 * 计算剩余的总毫秒
 * @param ms 总毫秒
 */
const remainingMs = (ms) => {
  return ((ms > 0) ? (--ms) : 60)
}

/**
 * 计算抢购截止状态
 * @param remainingTime剩余的截止时间
 * **/
const endState = (remainingTime) => {
  return (remainingTime > 0)
}

/**
 * 格式化剩余时间
 * @param remainingTime 剩余时间总毫秒
 * @param formatType 格式化的时间类型
 * @param status 状态 true时间未截止，false时间已截止
 */
const timeFormat = (remainingTime, formatType, status) => {
  console.log();
  return (status) && (timeFormatHandle[formatType](remainingTime)) || "00";
}

/**
 * 剩余时间的初次格式化
 * @param remainingTime 剩余时间 
 * @param totalTime 格式化为对应时间时所需的总时间
 * @param maxTime 被转换时间的最大时间
 **/
const timeFormatFirst = (remainingTime, totalTime, maxTime = 0) => {
  var curTime = (Math.floor(remainingTime / totalTime));
  return (maxTime !== 0) ? curTime % maxTime : curTime;
}

module.exports = {
  difference: difference,
  endTimeFormat: endTimeFormat,
  remainingMs: remainingMs,
  timeFormat: timeFormat,
  endState: endState
}