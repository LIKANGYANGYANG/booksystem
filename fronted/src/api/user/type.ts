//定义类型
export interface publicType {
  code: number
  msg: string
}
export interface userData {
  id: number
  username: string
  password: string
  name: string
  sex: string
  avatar: string
  isAdministrator: number
  createTime: string
  changeTime: string
}
export interface userType extends publicType {
  data: userData[]
}
