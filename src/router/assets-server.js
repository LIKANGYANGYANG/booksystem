//上传图片
const Router = require('koa-router')
const multer = require('koa-multer')
const path = require('path')
const nanoid = require('nanoid')
const verifyLogin = require('../middleware/verify-login')

const avatarRouter = new Router({ prefix: '/assets' })
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, './uploads')
  },
  filename: (req, file, cd) => {
    cd(null, nanoid.nanoid() + path.extname(file.originalname))
  },
})
const upload = multer({
  storage,
})
avatarRouter.post('/', verifyLogin, upload.single('assets'), (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: '上传成功',
    avatarUrl: `http://localhost:9000/${ctx.req.file.filename}`,
  }
})
module.exports = avatarRouter
