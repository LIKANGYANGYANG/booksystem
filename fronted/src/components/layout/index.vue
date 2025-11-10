<template>
  <a-layout style="width: 100vw; height: 100vh">
    <a-layout-sider
      v-model:collapsed="CounterStore.collapsed"
      :trigger="null"
      collapsible
      style="background-color: var(--main-color)"
    >
      <div class="logo">
        <img src="@/assets/img/图书.png" alt="" style="width: 50px" />
        <h2 v-show="!CounterStore.collapsed">图书管理系统</h2>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        style="background-color: var(--main-color)"
      >
        <a-menu-item
          :key="item.path"
          :title="item.title"
          v-for="item in menuList"
          @click="menuClick(item.path, item.title)"
        >
          <i
            :class="`iconfont ${item.icon}`"
            style="margin-right: 10px; font-size: 20px"
          ></i>
          <span v-show="!CounterStore.collapsed">{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="background-color: var(--main-color1)">
      <bookHeader />
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: 'var(--main-color1)',
          minHeight: '280px'
        }"
      >
        <template v-if="CounterStore.isRefresh">
          <a-config-provider
            :theme="{
              token: {
                colorPrimary: CounterStore.mainColor
              }
            }"
          >
            <router-view v-slot="{ Component }">
              <transition name="fade">
                <KeepAlive include="BookManage,UserManage">
                  <component :is="Component"></component>
                </KeepAlive>
              </transition>
            </router-view>
          </a-config-provider>
        </template>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup name="Layout">
import { ref, onMounted } from 'vue'
import bookHeader from './book-header.vue'
import { useRouter, useRoute } from 'vue-router'
import info from '@/stores/user'
import { useCounterStore } from '@/stores/counter'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  selectedKeys.value = [route.path]
  for (let i in menuList) {
    if (route.path === menuList[i].path) {
      CounterStore.tabMsg = menuList[i].title
      break
    }
  }

  //获取用户信息
  const id: any = localStorage.getItem('book-user-id')
  userStore.getUser(id).catch((err) => {
    //获取信息失败，跳转路由
    router.push('/login')
  })
})
//仓库
const CounterStore = useCounterStore()
const userStore = info()
const selectedKeys = ref<string[]>(['/home'])

interface menuListType {
  title: string
  path: string
  icon: string
}
const menuList: menuListType[] = [
  {
    title: '首页',
    path: '/home',
    icon: 'icon-home'
  },
  {
    title: '图书管理',
    path: '/book',
    icon: 'icon-tushuchaxun'
  },
  {
    title: '用户管理',
    path: '/usermanage',
    icon: 'icon-yonghuguanli'
  },
  {
    title: '图书类别管理',
    path: '/category',
    icon: 'icon-leibieguanli'
  },
  {
    title: '数据分析',
    path: '/data',
    icon: 'icon-shujufenxi'
  },
  {
    title: '个人中心',
    path: '/user',
    icon: 'icon-user'
  },
  {
    title: '借阅记录',
    path: '/adminborrow',
    icon: 'icon-file-management-borrowed-record'
  }
]
//菜单点击回调
const menuClick = (path, title) => {
  router.push(path)
  CounterStore.tabMsg = title
}
</script>
<style lang="less" scoped>
.logo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
  h2 {
    color: #fff;
    font-family: '宋体';
  }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.ant-layout-content {
  height: 100vh - 64px - 24px;
  overflow-y: auto;
}

.fade-enter-active {
  animation: scale-in-center 0.5s;
}

@keyframes scale-in-center {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
