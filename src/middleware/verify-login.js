//验证是否登录中间件
const fs = require('fs')
const jwt = require('jsonwebtoken')
const pool = require('../database/index')

const verifyLogin = async (ctx, next) => {
  //验证是否登录
  const authorization = ctx.headers.authorization
  if (!authorization) {
    ctx.body = {
      code: 204,
      msg: '无效的token',
    }
    return
  }
  const token = authorization.replace('Bearer ', '')
  //从数据库中查看是否存在该token
  // const sql = 'SELECT * FROM t_token WHERE `token`=?;'
  // const [res] = await pool.execute(sql, [token])
  // if (!res.length) {
  //   return (ctx.body = {
  //     code: 204,
  //     msg: '无效token',
  //   })
  // }
  const publicKey = fs.readFileSync('./src/keys/public.key')
  try {
    jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    })
    await next()
  } catch (err) {
    ctx.body = {
      code: 204,
      msg: '无效的token或错误传参',
    }
  }
}
module.exports = verifyLogin
