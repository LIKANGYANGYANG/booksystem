/**
 * @function 时间格式化函数
 */
export const dateFormat = () => {
  const hours = new Date().getHours()
  if (hours <= 6) {
    return '凌晨'
  } else if (hours <= 10) {
    return '早上'
  } else if (hours <= 13) {
    return '中午'
  } else if (hours <= 17) {
    return '下午'
  } else {
    return '晚上'
  }
}
