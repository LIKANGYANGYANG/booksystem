<script setup lang="ts">
import {
  FullscreenOutlined,
  SettingOutlined,
  SyncOutlined
} from '@ant-design/icons-vue'
import user from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import BookDrawer from '../book-drawer/index.vue'
import { useRouter } from 'vue-router'

const $router = useRouter()
//仓库
const CounterStore = useCounterStore()
const userStore = user()
onMounted(() => {
  const id = Number(localStorage.getItem('book-user-id'))
  userStore.getUser(id).catch(() => {
    $router.push('/login')
  })
})
//刷新回调
const refreshBtn = () => {
  CounterStore.isRefresh = false
  setTimeout(() => {
    CounterStore.isRefresh = true
  }, 300)
}
//控制抽屉
const open = ref(false)
//控制开关
// const checked = ref(false)
//设置回调
const settingBtn = () => {
  open.value = true
}
//抽屉发生变化的函数
const fn = (value) => {
  open.value = value
}

// watch(checked, (newValue) => {
//   if (newValue) {
//     CounterStore.setDOM('dark')
//   } else {
//     CounterStore.setDOM('light')
//   }
// })
</script>

<template>
  <div class="right">
    <FullscreenOutlined class="right-icon" />
    <sync-outlined class="right-icon" @click="refreshBtn" />
    <SettingOutlined class="right-icon" @click="settingBtn" />
    <img :src="userStore.avatar" alt="" />
    <span
      style="
        font-size: 18px;
        color: var(--main-wenzi);
        font-family: '宋体';
        margin-left: 10px;
      "
      >{{ userStore.name }}</span
    >
  </div>
  <!-- 抽屉组件 -->
  <BookDrawer :open="open" @openChange="fn" />
</template>

<style scoped lang="less">
.right {
  margin-right: 20px;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .right-icon {
    font-size: 20px;
    margin: 0px 10px;
    color: var(--main-wenzi);
    cursor: pointer;
  }
}
.main {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    color: #333;
    font-size: 20px;
    margin: 0px 10px;
  }
  .active {
    color: var(--main-color);
  }
}
</style>
