//用户路由规则
export const userRouter = {
  path: '/',
  name: 'abc',
  component: () => import('@/components/layout-v2/index.vue'),
  redirect: '/home',
  children: [
    {
      //首页
      path: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '图书借阅平台-首页'
      }
    },
    {
      //个人中心
      path: 'user',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '图书借阅平台-个人中心'
      }
    },
    {
      //图书借阅
      path: 'lending',
      component: () => import('@/views/book-lending/index.vue'),
      meta: {
        title: '图书借阅平台-图书借阅'
      }
    },
    {
      //图书归还
      path: 'restore',
      component: () => import('@/views/book-restore/index.vue'),
      meta: {
        title: '图书借阅平台-图书归还'
      }
    }
  ]
}
