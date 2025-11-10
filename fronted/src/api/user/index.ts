//用户相关接口
import require from '../index'
import type { userType, publicType } from './type'

//根据id查用户
export const getUser = (id: string | number) => {
  return require.get(`/user/${id}`)
}
//获取所有用户
export const getAllUser = () => {
  return require.get<any, userType>('/user/all')
}
//添加用户
export const addUser = (data) => {
  return require.post<any, publicType>('/user', {
    ...data
  })
}
//修改用户
export const updataUser = (id: number, data) => {
  return require.put<any, publicType>(`/user/${id}`, {
    ...data
  })
}
//删除用户
export const deleteUser = (id: number) => {
  return require.delete<any, publicType>(`/user/${id}`)
}
