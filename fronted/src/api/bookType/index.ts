//图书类别相关接口
import require from '../index'
import type { BookType, TypeBookNum } from './type'

//获取类别
export const getBookCategory = () => {
  return require.get<any, BookType>('/type')
}
//添加类别
export const addBookCategory = (data: string) => {
  return require.post('/type', {
    typename: data
  })
}
//修改
export const updataType = (id: number, data: string) => {
  return require.put(`/type/${id}`, {
    typename: data
  })
}

//获取每个类别图书数量
export const getTypeNum = () => {
  return require.get<any, TypeBookNum>('/type/data')
}
