//用户借阅图书相关接口
const Router = require('koa-router')
const pool = require('../database/index')
//验证是否登录的中间件
const verifyLogin = require('../middleware/verify-login')

const borrowRouter = new Router({ prefix: '/borrow' })

//查看所有用户借阅图书的信息
borrowRouter.get('/', verifyLogin, async (ctx, next) => {
  const sql = `
  SELECT 
 br.id, us.id user_id,us.name,us.avatar,bk.id book_id,bk.bookName,bk.author,bk.publish,bk.picture,type.typestr,br.startTime,br.endTime
FROM users AS us 
LEFT JOIN borrow AS br ON us.id=br.user_id 
LEFT JOIN books bk ON br.book_id = bk.id
LEFT JOIN type ON bk.category=type.id
WHERE br.user_id=us.id AND br.book_id=bk.id; 
  `
  const [res] = await pool.execute(sql)
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data: res,
  }
})
//根据用户id查询用户借阅图书信息
borrowRouter.get('/:id', verifyLogin, async (ctx, next) => {
  const sql = `
  SELECT 
  br.id,us.id user_id,us.name,us.avatar,bk.id book_id,bk.bookName,bk.author,bk.publish,bk.picture,type.typestr,br.startTime,br.endTime
FROM users AS us 
LEFT JOIN borrow AS br ON us.id=br.user_id 
LEFT JOIN books bk ON br.book_id = bk.id
LEFT JOIN type ON bk.category=type.id
WHERE br.user_id=? AND br.book_id=bk.id; 
  `
  const [res] = await pool.execute(sql, [ctx.params.id])
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data: res,
  }
})
//用户添加借阅图书
borrowRouter.post('/', verifyLogin, async (ctx, next) => {
  const { userid, bookid, startTime, endTime } = ctx.request.body
  //每个用户不能重复借阅同一本书
  const sql = `
  SELECT 
 us.id user_id,us.name,us.avatar,bk.id book_id,bk.bookName,bk.author,bk.publish,bk.picture,type.typestr,br.startTime,br.endTime
FROM users AS us 
LEFT JOIN borrow AS br ON us.id=br.user_id 
LEFT JOIN books bk ON br.book_id = bk.id
LEFT JOIN type ON bk.category=type.id
WHERE br.user_id=? AND br.book_id=bk.id;
  `
  const [res] = await pool.execute(sql, [userid])
  let flag = true
  for (let i = 0; i < res.length; i++) {
    if (res[i].user_id === userid && res[i].book_id === bookid) {
      ctx.body = {
        code: 208,
        msg: '不能重复借阅',
      }
      flag = false
      break
    }
  }
  if (flag) {
    const sql1 =
      'INSERT INTO borrow (user_id,book_id,startTime,endTime) VALUES (?,?,?,?);'
    await pool.execute(sql1, [userid, bookid, startTime, endTime])
    ctx.body = {
      code: 200,
      msg: '借阅成功',
    }
  }
})
//删除借阅记录(归还图书)
borrowRouter.delete('/:id', verifyLogin, async (ctx, next) => {
  const sql = 'DELETE FROM borrow WHERE borrow.id = ?;'
  await pool.execute(sql, [ctx.params.id])
  ctx.body = {
    code: 200,
    msg: '删除成功',
  }
})
//修改借阅图书(只能修改归还图书的时间)
borrowRouter.put('/:id', verifyLogin, async (ctx, next) => {
  const { endTime } = ctx.request.body
  const sql = 'UPDATE borrow SET endTime = ? WHERE id=?;'
  await pool.execute(sql, [endTime, ctx.params.id])
  ctx.body = {
    code: 200,
    msg: '修改成功',
  }
})
module.exports = borrowRouter
