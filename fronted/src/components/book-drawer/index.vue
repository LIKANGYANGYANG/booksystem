<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useRouter } from 'vue-router'

const $router = useRouter()
onMounted(() => {
  //颜色主体切换
  if (CounterStore.main === 'dark') {
    document.documentElement.dataset.theme = 'dark'
    checked.value = true
  } else {
    document.documentElement.dataset.theme = 'light'
    checked.value = false
  }
})
//仓库
const CounterStore = useCounterStore()
const $emit = defineEmits(['openChange'])
const $props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
//控制抽屉
const open = ref(false)
//监听父组件传过来的数据是否发生变化
watch(
  () => $props.open,
  (newOpen) => {
    open.value = newOpen
  }
)
//监听抽屉数据发生变化时，告诉父组件
watch(open, (newValue) => {
  $emit('openChange', newValue)
})
//开关数据
const checked = ref(false)
watch(checked, (newValue) => {
  if (newValue) {
    CounterStore.setDOM('dark')
  } else {
    CounterStore.setDOM('light')
  }
})
//颜色列表
const colorList = [
  '#3f51b5',
  '#42b983',
  '#fe7300',
  '#ea3a72',
  '#8d7d91',
  '#fcec0c'
]
//记录颜色的索引
const colorIndex = ref(0)
let itemColor = '#3f51b5'
let time
//颜色点击回调
const colorBtn = (index: number, item: string) => {
  clearTimeout(time)
  colorIndex.value = index
  itemColor = item
  time = setTimeout(() => {
    CounterStore.mainColor = itemColor
  }, 0)
}
//退出登录按钮回调
const onQuit = () => {
  //清空本地存储数据
  localStorage.clear()
  //跳转到登录页
  $router.push('/login')
}
</script>
<script lang="ts">
export default {
  name: 'BookDrawer'
}
</script>

<template>
  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="页面配置"
    placement="right"
    width="30%"
    :footer-style="{ textAlign: 'right' }"
  >
    <a-divider>主体风格</a-divider>
    <div class="main">
      <i class="iconfont icon-taiyang" :class="{ active: !checked }"></i>
      <a-switch v-model:checked="checked" />
      <i class="iconfont icon-yueliang" :class="{ active: checked }"></i>
    </div>
    <div class="color-box">
      <template v-for="(item, index) in colorList" :key="item">
        <div
          class="item"
          @click="colorBtn(index, item)"
          :class="{ active: colorIndex === index }"
        >
          <span
            class="color"
            :style="{ backgroundColor: item }"
            :class="{ active1: colorIndex === index }"
          ></span>
        </div>
      </template>
    </div>
    <template #footer>
      <a-button type="primary" @click="onQuit">退出登录</a-button>
    </template>
  </a-drawer>
</template>

<style scoped lang="less">
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
.color-box {
  width: 100%;
  margin: 30px 0px;
  display: flex;
  flex-wrap: wrap;
  .item {
    display: flex;
    width: 100px;
    height: 50px;
    box-shadow: 0 0 5px 1px #ebeef5;
    border-radius: 5px;
    margin: 10px calc((100% - 3 * 100px) / 3 / 2);
    .color {
      width: 40px;
      height: 16px;
      border-radius: 50%;
      transform: rotate(-45deg);
      transition: all 0.3s;
      margin: auto;
    }
    .active1 {
      transform: rotate(0deg);
    }
  }
  .active {
    border: 1px solid var(--main-color);
    box-shadow: 0 0 0 2px var(--main-color);
  }
}
</style>
