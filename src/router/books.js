//图书相关接口
const Router = require('koa-router')
const pool = require('../database/index')
//验证是否登录的中间件
const verifyLogin = require('../middleware/verify-login')
const sqlFormdata = require('../utils/sql-formdata') //格式化sql语句函数

const bookRouter = new Router({ prefix: '/book' })

//分页查询接口
bookRouter.get('/', verifyLogin, async (ctx, next) => {
  const { size = '20', offset = '0' } = ctx.request.query
  const sql =
    'SELECT b.id,b.bookName,b.author,b.publish,b.describe,b.price,b.picture,t.typestr FROM `books` AS b LEFT JOIN `type` AS t ON b.category=t.id LIMIT ? OFFSET ?;'
  const sql1 = 'SELECT COUNT(*) totality FROM books;'
  const [res] = await pool.execute(sql, [size, offset])
  const [res1] = await pool.execute(sql1)
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data: res,
    ...res1[0],
  }
})
//根据图书名模糊查询接口
bookRouter.get('/:bookname', verifyLogin, async (ctx, next) => {
  const sql = `SELECT b.id,b.bookName,b.author,b.publish,b.describe,b.price,b.picture,t.typestr FROM books AS b LEFT JOIN type AS t ON b.category=t.id WHERE b.bookName LIKE '%${ctx.params.bookname}%';`
  const [res] = await pool.execute(sql)
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data: res,
  }
})
//根据图书类型查询
bookRouter.get('/type/:value', verifyLogin, async (ctx, next) => {
  const sql = `SELECT b.id,b.bookName,b.author,b.publish,b.describe,b.price,b.picture,t.typestr FROM books AS b LEFT JOIN type AS t ON b.category=t.id WHERE t.typestr = ?;`
  const [res] = await pool.execute(sql, [ctx.params.value])
  ctx.body = {
    code: 200,
    msg: '查询成功',
    data: {
      type: ctx.params.value,
      list: res,
    },
  }
})
//增加图书接口
bookRouter.post('/', verifyLogin, async (ctx, next) => {
  const { bookname, author, publish, describe, price, picture, category } =
    ctx.request.body
  const sql =
    'INSERT INTO `books` (bookName,author,publish,`describe`,price,picture,category) VALUES (?,?,?,?,?,?,?);'
  await pool.execute(sql, [
    bookname,
    author,
    publish,
    describe,
    price,
    picture,
    category,
  ])
  ctx.body = {
    code: 200,
    msg: '添加图书成功',
  }
})
//根据id删除图书接口
bookRouter.delete('/:id', verifyLogin, async (ctx, next) => {
  const id = ctx.params.id
  const sql = 'DELETE FROM books WHERE id=?;'
  await pool.execute(sql, [id])
  ctx.body = {
    code: 200,
    msg: '删除成功',
  }
})
//根据id修改图书接口
bookRouter.put('/:id', verifyLogin, async (ctx, next) => {
  const id = ctx.params.id
  const { bookname, author, publish, describe, price, picture, category } =
    ctx.request.body
  // console.log(ctx.request.body)
  const sql =
    'UPDATE books SET bookName=?,author=?,publish=?,`describe`=?,price=?,picture=?,category=? WHERE id=?;'
  await pool.execute(sql, [
    bookname,
    author,
    publish,
    describe,
    price,
    picture,
    category,
    id,
  ])
  ctx.body = {
    code: 200,
    msg: '修改成功',
  }
})
module.exports = bookRouter
