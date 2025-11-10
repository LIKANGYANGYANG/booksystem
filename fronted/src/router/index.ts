import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { userRouter } from './userRouter'
import { adminRouter } from './adminRouter'
import userStore from '@/stores/user'
import { createPinia } from 'pinia'
import { message } from 'ant-design-vue'

const $store = userStore(createPinia())
const isadmin: any = localStorage.getItem('isadmin')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/register/index.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/404/index.vue')
    }
  ]
})
//添加路由
if (Number(isadmin)) {
  router.addRoute(adminRouter)
} else {
  router.addRoute(userRouter)
}

//进度条
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from) => {
  document.title = to.meta.title as string
  NProgress.start()
  const token = localStorage.getItem('bookToken')
  return true
  // if (token) {
  //   return true
  // } else {
  //   //没有登录，跳转到登录页面
  //   if (to.path === '/login') {
  //     return true
  //   } else {
  //     message.error('请先登录!', 2)
  //     return '/login'
  //   }
  // }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
