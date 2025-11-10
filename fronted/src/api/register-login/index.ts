import request from '../index'

//注册,登录接口接收的类型
interface registerType {
  username: string
  password: string
}

//注册接口返回的类型
interface resRegisterType {
  code: number
  msg: string
}

//登录接口返回类型
interface resLogin extends resRegisterType {
  userID: number | string
  token: string
}
//注册接口
export const reqRegister = ({ username, password }: registerType) => {
  return request.post<any, resRegisterType>('/register', {
    username,
    password
  })
}
//登录接口
export const reqLogin = ({ username, password }: registerType) => {
  return request.post<any, resLogin>('/login', {
    username,
    password
  })
}
