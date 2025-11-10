import { defineStore } from 'pinia'
import { getUser } from '@/api/user/index'
import { message } from 'ant-design-vue'

//存储用户相关信息
export default defineStore('info', {
  state: () => ({
    id: '', //用户id
    avatar: '', //用户头像
    changeTime: '',
    createTime: '',
    isAdministrator: 0,
    name: '',
    password: '',
    sex: '',
    username: ''
  }),
  actions: {
    //获取用户信息
    async getUser(id: number) {
      let res: any = await getUser(id)
      return new Promise((resolve, reject) => {
        if (res.code === 200) {
          if (!res.data.length) {
            message.error('获取失败', 2)
            reject('失败')
          } else {
            localStorage.setItem('isadmin', res.data[0].isAdministrator)
            Object.assign(this, res.data[0])
            resolve(this.isAdministrator)
          }
        } else {
          console.log(res)
        }
      })
      // if (res.code === 200) {
      //   if (!res.data.length) {
      //     message.error('获取失败', 2)
      //     return '获取失败'
      //   } else {
      //     localStorage.setItem('isadmin', res.data[0].isAdministrator)
      //     Object.assign(this, res.data[0])
      //     return new Promise((resolve, reject) => {
      //       resolve(this.isAdministrator)
      //     })
      //   }
      // } else {
      //   console.log(res)
      // }
    }
  }
})
