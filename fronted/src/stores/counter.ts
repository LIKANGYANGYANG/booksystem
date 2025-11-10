import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    //折叠，状态
    collapsed: false,
    //头部导航显示信息
    tabMsg: '',
    //组件是否刷新
    isRefresh: true,
    //主体
    main: localStorage.getItem('book-main-color') || '',
    //颜色
    mainColor: '#3f51b5'
  }),
  actions: {
    setDOM(name: string) {
      this.main = name
      document.documentElement.dataset.theme = name
      localStorage.setItem('book-main-color', name)
    }
  }
})
