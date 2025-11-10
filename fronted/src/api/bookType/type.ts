//类型
interface publicType {
  code: number
  msg: string
}
interface dataType {
  id: number
  typestr: string
}
export interface BookType extends publicType {
  data: dataType[]
}
interface TypeNum {
  typestr: string
  count: number
}
export interface TypeBookNum extends publicType {
  data: TypeNum[]
}
