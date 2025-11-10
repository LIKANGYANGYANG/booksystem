//图书相关接口
import require from '../index'
import type { bookType, categoryType, bookCategory } from './type'

//获取图书
export const reqGetBook = (size: number, offset: number) => {
  return require.get<any, bookType>(`/book?size=${size}&offset=${offset}`)
}
//获取图书类别
export const GetBookType = () => {
  return require.get<any, categoryType>('/type')
}
//添加图书
export const reqAddbook = (obj) => {
  return require.post('/book', {
    ...obj
  })
}
//删除图书
export const deleteBook = (id: number) => {
  return require.delete(`/book/${id}`)
}
//修改图书
export const patchBook = (id: number, data) => {
  return require.put(`/book/${id}`, {
    ...data
  })
}
//搜索图书，根据书名
export const searchBook = (bookname: string) => {
  return require.get<any, bookType>(`/book/${bookname}`)
}
//搜索图书，根据类别
export const searchType = (type: string) => {
  return require.get<any, bookCategory>(`/book/type/${type}`)
}
//添加图书借阅
export const addBookLending = (data) => {
  return require.post('/borrow', {
    ...data
  })
}
//根据用户id查询借阅图书清空
export const bookLendingId = (id: number) => {
  return require.get(`/borrow/${id}`)
}
//图书借阅归还
export const returnBook = (id: number) => {
  return require.delete(`/borrow/${id}`)
}
//查看所有用户借阅图书信息
export const allBorrow = () => {
  return require.get('/borrow')
}
