//连接数据库
const mysql = require('mysql2')
const pool = mysql.createPool({
  host: 'localhost',
  database: 'book_db',
  user: 'root',
  password: '123456',
  connectionLimit: 10,
})
//连接是否成功
pool.getConnection((err, connection) => {
  if (err) {
    console.log('数据库连接失败', err)
    return
  }
  connection.connect((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('数据库连接成功')
    }
  })
})
module.exports = pool.promise()
