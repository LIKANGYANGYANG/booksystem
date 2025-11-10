const Router = require('koa-router')
const pool = require('../database/index')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const loginRouter = new Router({ prefix: '/login' })

//生成token密钥
const privateKey = fs.readFileSync('./src/keys/private.key')
//登录接口
loginRouter.post('/', async (ctx, next) => {
  const { username, password } = ctx.request.body
  //判断用户名和密码是否一致
  const sql = 'SELECT * FROM `users` WHERE username=? AND password=?;'
  const [res] = await pool.execute(sql, [username, password])
  if (!res.length) {
    return (ctx.body = {
      code: 203,
      msg: '用户名或密码错误',
    })
  } else {
    //登录成功,颁发token
    ctx.user = { id: res[0].id, username }
    const playload = ctx.user
    const token = jwt.sign(playload, privateKey, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256',
    })
    //将token存放到数据库中
    // const sql = 'INSERT INTO t_token (`token`) VALUES (?);'
    // await pool.execute(sql, [token])
    ctx.body = {
      code: 200,
      msg: '登录成功',
      userID: ctx.user.id,
      token,
    }
  }
})

module.exports = loginRouter
