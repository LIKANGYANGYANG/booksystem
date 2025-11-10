//管理员路由规则
export const adminRouter = {
  path: '/',
  name: 'abc',
  component: () => import('@/components/layout/index.vue'),
  redirect: '/home',
  children: [
    {
      //首页
      path: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '图书管理系统-首页'
      }
    },
    {
      //图书管理
      path: 'book',
      component: () => import('@/views/book-manage/index.vue'),
      meta: {
        title: '图书管理系统-图书管理'
      }
    },
    {
      //数据分析
      path: 'data',
      component: () => import('@/views/data/index.vue'),
      meta: {
        title: '图书管理系统-数据分析'
      }
    },
    {
      //个人中心
      path: 'user',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '图书管理系统-个人中心'
      }
    },
    {
      //用户管理
      path: 'usermanage',
      component: () => import('@/views/user-manage/index.vue'),
      meta: {
        title: '图书管理系统-用户管理'
      }
    },
    {
      //类别管理
      path: 'category',
      component: () => import('@/views/category/index.vue'),
      meta: {
        title: '图书管理系统-类别管理'
      }
    },
    {
      //借阅管理
      path: 'adminborrow',
      component: () => import('@/views/admin-borrow/index.vue'),
      meta: {
        title: '图书管理系统-借阅记录'
      }
    }
  ]
}
