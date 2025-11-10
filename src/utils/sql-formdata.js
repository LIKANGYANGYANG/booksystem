/**
 * @function 格式sql数据,用于修改对应的数据
 * @param {object} value ctx.request.body中的数据
 * @returns
 */
const sqlFormdata = (value) => {
  const arr = Object.keys(value)
  let str = ''
  arr.forEach((item) => {
    if (!isNaN(value[item])) {
      str += `${item}=${value[item]},`
    } else {
      str += `${item}='${value[item]}',`
    }
  })
  return str.replace(/,$/, '')
}
module.exports = sqlFormdata
