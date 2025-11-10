//用户相关接口
const Router = require('koa-router')
const pool = require('../database/index')
//验证是否登录的中间件
const verifyLogin = require('../middleware/verify-login')
const sqlFormdata = require('../utils/sql-formdata') //格式化sql语句函数

const userRouter = new Router({ prefix: '/user' })
//查看所有用户信息接口
userRouter.get('/all', verifyLogin, async (ctx, next) => {
  const sql = 'SELECT * FROM `users`;'
  const [res] = await pool.execute(sql)
  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: res,
  }
})
//模糊查询用户接口
userRouter.get('/', verifyLogin, async (ctx, next) => {
  const { name } = ctx.request.query
  const sql = `SELECT * FROM users WHERE name LIKE '%${name}%';`
  const [res] = await pool.execute(sql)
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data: res,
  }
})
//查看用户信息接口
userRouter.get('/:id', verifyLogin, async (ctx, next) => {
  //管理员身份不允许查看
  // if (ctx.params.id === '1') {
  //   return (ctx.body = {
  //     code: 204,
  //     msg: '查询失败',
  //     data: [],
  //   })
  // }
  const sql = 'SELECT * FROM `users` WHERE id=?;'
  const [res] = await pool.execute(sql, [ctx.params.id])
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data: res,
  }
})
//管理员添加用户接口
userRouter.post('/', verifyLogin, async (ctx, next) => {
  const {
    username,
    password,
    name = '用户',
    avatar = 'http://localhost:9000/5PZuke2YkzmjJ7bZRZJO_.png',
    sex = '男',
    isAdministrator = 0,
  } = ctx.request.body
  if (!username || !password) {
    return (ctx.body = {
      code: 206,
      msg: '添加失败',
    })
  }
  const sql = 'SELECT * FROM `users` WHERE username=?;'
  const [res] = await pool.execute(sql, [username])
  if (res.length) {
    return (ctx.body = {
      code: 202,
      msg: '用户名已存在',
    })
  }
  const sql1 =
    'INSERT INTO `users` (username,password,name,avatar,sex,isAdministrator) VALUES (?,?,?,?,?,?);'
  const res1 = await pool.execute(sql1, [
    username,
    password,
    name,
    avatar,
    sex,
    isAdministrator,
  ])
  ctx.body = {
    code: 200,
    msg: '添加成功',
  }
})
//删除用户接口
userRouter.delete('/:id', verifyLogin, async (ctx, next) => {
  //管理员账号不可以删
  if (ctx.params.id === '1') {
    return (ctx.body = {
      code: 207,
      msg: '管理员账号不可以删除',
    })
  } else {
    //获取token
    // const authorization = ctx.headers.authorization
    // const token = authorization.replace('Bearer ', '')
    //从数据库中删除对应的token
    // const sql1 = 'DELETE FROM t_token WHERE `token`=?;'
    // await pool.execute(sql1, [token])
    const sql = 'DELETE FROM `users` WHERE id=?;'
    await pool.execute(sql, [ctx.params.id])
    ctx.body = {
      code: 200,
      msg: '删除成功',
    }
  }
})
//修改用户接口
userRouter.put('/:id', verifyLogin, async (ctx, next) => {
  const userID = ctx.params.id
  const { username, password, name, sex, avatar, isAdministrator } =
    ctx.request.body
  const sql =
    'UPDATE users SET username=?,`password`=?,`name`=?,sex=?,avatar=?,isAdministrator=? WHERE id=?;'
  //获取token
  // const authorization = ctx.headers.authorization
  // const token = authorization.replace('Bearer ', '')
  //从数据库中删除对应的token
  // if (sqlFormdata(ctx.request.body).includes('password')) {
  //   const sql1 = 'DELETE FROM t_token WHERE `token`=?;'
  //   await pool.execute(sql1, [token])
  // }

  await pool.execute(sql, [
    username,
    password,
    name,
    sex,
    avatar,
    isAdministrator,
    userID,
  ])
  ctx.body = {
    code: 200,
    msg: '修改成功',
  }
})
module.exports = userRouter
