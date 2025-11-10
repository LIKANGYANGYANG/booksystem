//程序的入口文件
const app = require('./app/index')
const { SERVER_PORT } = require('../settings/set')

app.listen(SERVER_PORT, () => {
  console.log('服务器已开启')
})
