//类型文件

interface publicType {
  code: number
  msg: string
}
//图书返回类型
interface dataType {
  author: string
  bookName: string
  describe: string
  id: number
  picture: string
  price: number
  publish: string
  typestr: string
}
export interface bookType extends publicType {
  data: dataType[]
  totality: number
}

//图书类别返回类型
interface dataCategoryType {
  id: number
  typestr: string
}
export interface categoryType extends publicType {
  data: dataCategoryType[]
}
export interface bookCategory extends publicType {
  data: {
    list: dataType[]
    type: string
  }
}
