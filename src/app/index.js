const Koa = require('koa')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const registerRouter = require('../router/register')
const static = require('koa-static')
const loginRouter = require('../router/login')
const userRouter = require('../router/user')
const bookRouter = require('../router/books')
const avatarRouter = require('../router/assets-server')
const typeRouter = require('../router/book-type')
const borrowRouter = require('../router/borrow')

const app = new Koa()

app.use(cors()) //解决跨域
app.use(static('./uploads')) //静态服务器
app.use(bodyParser()) //解析json数据中间件
//注册路由
app.use(registerRouter.routes())
app.use(registerRouter.allowedMethods())
//登录路由
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())
//用户路由
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
//图书路由
app.use(bookRouter.routes())
app.use(bookRouter.allowedMethods())
//上次图片资源路由
app.use(avatarRouter.routes())
app.use(avatarRouter.allowedMethods())
//图书类别路由
app.use(typeRouter.routes())
app.use(typeRouter.allowedMethods())
//用户借阅图书相关接口
app.use(borrowRouter.routes())
app.use(borrowRouter.allowedMethods())

module.exports = app
