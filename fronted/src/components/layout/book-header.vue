<script setup lang="ts" name="LayoutHeader">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  FullscreenOutlined,
  SyncOutlined
} from '@ant-design/icons-vue'
import { useCounterStore } from '@/stores/counter'
import info from '@/stores/user'
import { ref } from 'vue'
import BookDrawer from '../book-drawer/index.vue'

//仓库
const CounterStore = useCounterStore()
const userStore = info()
//刷新回调
const refreshBtn = () => {
  CounterStore.isRefresh = false
  setTimeout(() => {
    CounterStore.isRefresh = true
  }, 100)
}
//控制抽屉组件
const open = ref(false)
//设置回调
const settingBtn = () => {
  open.value = true
}
const fn = (value) => {
  open.value = value
}
//全屏按钮回调
const fullScreen = () => {
  //是否是全屏状态
  let screen = document.fullscreenElement
  if (!screen) {
    //进入全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
</script>

<template>
  <a-layout-header
    style="background: var(--main-color1); padding: 0"
    id="book-header"
  >
    <div class="left">
      <menu-unfold-outlined
        v-if="CounterStore.collapsed"
        class="trigger"
        @click="() => (CounterStore.collapsed = !CounterStore.collapsed)"
        style="color: var(--main-wenzi1)"
      />
      <menu-fold-outlined
        v-else
        class="trigger"
        @click="() => (CounterStore.collapsed = !CounterStore.collapsed)"
        style="color: var(--main-wenzi1)"
      />
      <span class="title">{{ CounterStore.tabMsg }}</span>
    </div>

    <div class="right">
      <FullscreenOutlined class="right-icon" @click="fullScreen" />
      <sync-outlined class="right-icon" @click="refreshBtn" />
      <SettingOutlined class="right-icon" @click="settingBtn" />
      <img :src="userStore.avatar" alt="" />
      <span style="font-size: 18px; color: var(--main-wenzi1)">{{
        userStore.name
      }}</span>
    </div>
  </a-layout-header>
  <BookDrawer :open="open" @open-change="fn" />
</template>

<style scoped lang="less">
#book-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .anticon[tabindex] {
    margin-left: 20px;
  }
  .title {
    margin-left: 20px;
    color: var(--main-wenzi1);
  }
  .right {
    margin-right: 20px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
    }
    .right-icon {
      font-size: 20px;
      margin: 0px 10px;
      color: var(--main-wenzi1);
      cursor: pointer;
    }
  }
}
</style>
