<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RightHeader from './right-header.vue'
import { useCounterStore } from '@/stores/counter'

//仓库
const CounterStore = useCounterStore()
const router = useRouter()
const route = useRoute()
const selectedKeys = ref<string[]>(['/home'])
onMounted(() => {
  selectedKeys.value = [route.path]
  switch (route.path) {
    case '/home':
      tagList.value[0] = '首页'
      break
    case '/user':
      tagList.value[0] = '个人中心'
      break
    case '/lending':
      tagList.value[0] = '图书借阅'
      break
    case '/restore':
      tagList.value[0] = '图书归还'
  }
  // if (CounterStore.main === 'dark') {
  //   mainColor.value = '#120540'
  // } else {
  //   mainColor.value = '#3f51b5'
  // }
})
//菜单列表
const menuList = [
  {
    title: '首页',
    path: '/home'
  },
  {
    title: '图书借阅',
    path: '/lending'
  },
  {
    title: '图书归还',
    path: '/restore'
  },
  {
    title: '个人中心',
    path: '/user'
  }
]
//标签列表
let tagList = ref<string[]>([])
//菜单点击
const menuClick = (url: string, title: string) => {
  router.push(url)

  if (tagList.value.includes(title)) return
  tagList.value.push(title)
}

const log = (item) => {
  tagList.value = tagList.value.filter((i) => {
    return i !== item
  })
}
//主体颜色
// const mainColor = ref('#3f51b5')
// watch(
//   () => CounterStore.main,
//   (newValue) => {
//     if (newValue === 'dark') {
//       mainColor.value = '#120540'
//     } else {
//       mainColor.value = '#3f51b5'
//     }
//   }
// )
</script>
<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo">
        <img src="@/assets/img/图书.png" alt="" />
        <p>图书借阅平台</p>
      </div>

      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px', backgroundColor: 'var(--main-color)' }"
      >
        <a-menu-item
          :key="item.path"
          v-for="item in menuList"
          @click="menuClick(item.path, item.title)"
          >{{ item.title }}</a-menu-item
        >
      </a-menu>
      <RightHeader />
    </a-layout-header>
    <a-layout-content
      style="padding: 0 30px; background-color: var(--main-color1)"
      id="content"
    >
      <div style="margin: 10px 0; height: 23px">
        <template v-for="item in tagList" :key="item">
          <a-tag closable color="var(--main-color)" @close="log(item)">{{
            item
          }}</a-tag>
        </template>
      </div>
      <div
        :style="{
          background: 'var(--main-color2)',
          padding: '24px',
          height: 'calc(100% - 43px)'
        }"
      >
        <a-config-provider
          :theme="{
            token: {
              colorPrimary: CounterStore.mainColor
            }
          }"
        >
          <template v-if="CounterStore.isRefresh">
            <router-view v-slot="{ Component }">
              <transition name="fade">
                <keep-alive include="bookLending">
                  <component :is="Component"> </component>
                </keep-alive>
              </transition>
            </router-view>
          </template>
          <!-- 加载组件 -->
          <a-spin class="loading" size="large" v-else />
        </a-config-provider>
      </div>
    </a-layout-content>
    <a-layout-footer
      style="
        text-align: center;
        padding: 10px;
        background-color: var(--main-color1);
      "
    >
    </a-layout-footer>
  </a-layout>
</template>

<style scoped lang="less">
#content {
  width: 100vw;
  height: calc(100vh - 64px - 20px);
}
.ant-layout-header {
  display: flex;
  align-items: center;
  background-color: var(--main-color);
  justify-content: space-between;
  .logo {
    display: flex;
    align-items: center;
    margin-right: 20px;
    img {
      width: 50px;
      height: 50px;
    }
    p {
      color: #fff;
      margin-left: 5px;
    }
  }
}

.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
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
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
