//图书类别相关接口
const Router = require('koa-router')
const pool = require('../database')
//验证是否登录的中间件
const verifyLogin = require('../middleware/verify-login')

const typeRouter = new Router({ prefix: '/type' })

//查询图书类别
typeRouter.get('/', verifyLogin, async (ctx, next) => {
  const sql = 'SELECT * FROM `type` ORDER BY id ASC;'
  const [res] = await pool.execute(sql)
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data: res,
  }
})
//添加图书类别
typeRouter.post('/', verifyLogin, async (ctx, next) => {
  const { typename } = ctx.request.body
  const sql = 'INSERT INTO type (typestr) VALUES (?);'
  await pool.execute(sql, [typename])
  ctx.body = {
    code: 200,
    msg: '添加成功',
  }
})
//删除图书类别
typeRouter.delete('/:id', verifyLogin, async (ctx, next) => {
  const sql = 'DELETE FROM type WHERE id=?;'
  await pool.execute(sql, [ctx.params.id])
  ctx.body = {
    code: 200,
    msg: '删除成功',
  }
})
//修改图书类别
typeRouter.put('/:id', verifyLogin, async (ctx, next) => {
  const { typename } = ctx.request.body
  const sql = 'UPDATE type SET typestr=? WHERE id=?;'
  await pool.execute(sql, [typename, ctx.params.id])
  ctx.body = {
    code: 200,
    msg: '修改成功',
  }
})
typeRouter.get('/data', async (ctx, next) => {
  const sql = `SELECT type.typestr, COUNT(*) as count  
  FROM books  
  JOIN type ON books.category = type.id  
  GROUP BY books.category,type.id;`
  let [res] = await pool.execute(sql)
  ctx.body = {
    code: 200,
    msg: '获取数据成功',
    data: res,
  }
})
module.exports = typeRouter
