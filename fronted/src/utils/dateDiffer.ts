/**
 *
 * @param data1 开始时间
 * @param data2 结束时间
 * @returns xx天xx时xx分
 */
export const dateDiffer = (
  data1: string | number,
  data2: string | number
): string => {
  const start = +new Date(data1) / 1000
  const end = +new Date(data2) / 1000
  const D = parseInt(((end - start) / 60 / 60 / 24) as any)
  const H = parseInt((((end - start) / 60 / 60) % 24) as any)
  const M = parseInt((((end - start) / 60) % 60) as any)
  return D + '天' + H + '时' + M + '分'
}
