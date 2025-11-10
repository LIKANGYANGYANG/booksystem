<script setup lang="ts">
import { reqGetBook, addBookLending } from '@/api/book/index'
import { onMounted, ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { message } from 'ant-design-vue'
import { useDefer } from '@/utils/useDefer'

const defer = useDefer()
let bookData = ref<any[]>([])
//获取图书信息
const getBook = async (size = 20, offset = 0) => {
  let res = await reqGetBook(size, offset)
  if (res.code === 200) {
    bookData.value = res.data
  }
}
let time: null | number = null
const scrollFn = () => {
  //节流
  if (!time) {
    time = setTimeout(async () => {
      //元素固定的高度
      let elHeight = boxEl.value.clientHeight
      //元素内容高度
      let content = boxEl.value.scrollHeight - 300
      //元素滚动的高度
      let scrollHeight = boxEl.value.scrollTop
      if (elHeight + scrollHeight >= content) {
        let res = await reqGetBook(20, bookData.value.length)
        if (res.code === 200) {
          let arr = [...bookData.value, ...res.data]
          bookData.value = arr
        }
      }
      time = null
    }, 500)
  }
}
onMounted(() => {
  getBook()
  boxEl.value?.addEventListener('scroll', scrollFn)
})

//获取主盒子元素
const boxEl = ref()
//控制对话框
const open = ref(false)
//日期选择组件--------------------------------------------------------------------
const range = (start: number, end: number) => {
  const result: any[] = []

  for (let i = start; i < end; i++) {
    result.push(i)
  }

  return result
}

const disabledDate = (current: Dayjs) => {
  // Can not select days before today and today
  return current && current <= dayjs().startOf('day')
}

const disabledRangeTime = (_: Dayjs, type: 'start' | 'end') => {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(25, 20),
      disabledMinutes: () => range(60, 60),
      disabledSeconds: () => [55, 56]
    }
  }
  return {
    disabledHours: () => range(0, 60).splice(25, 20),
    disabledMinutes: () => range(60, 60),
    disabledSeconds: () => [55, 56]
  }
}

const value4 = ref<[Dayjs, Dayjs]>()
//日期选择组件-----------------------------------------------------------------------
//记录图书id
let bookId = 0
//借阅按钮回调
const lookBtn = (item) => {
  open.value = true
  value4.value = undefined
  bookId = item.id
}
//对话框确认按钮
const handleOk = async () => {
  open.value = false
  if (!value4.value) {
    message.error('借阅失败，时间不能为空', 1)
    return
  }
  const dataObj = {
    startTime: dayjs(value4.value?.[0]).format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs(value4.value?.[1]).format('YYYY-MM-DD HH:mm:ss'),
    userid: Number(localStorage.getItem('book-user-id')),
    bookid: bookId
  }
  let res: any = await addBookLending(dataObj)
  if (res.code === 200) {
    message.success(res.msg, 2)
  } else {
    message.error(res.msg, 1)
  }
}
//控制抽屉
const open1 = ref(false)
const itemInfo = ref<any>()
//查看按钮回调
const viewBtn = (item) => {
  open1.value = true
  itemInfo.value = item
}
</script>
<script lang="ts">
export default {
  name: 'bookLending'
}
</script>

<template>
  <div class="bookLending" ref="boxEl">
    <template v-for="(item, index) in bookData">
      <div class="item" v-if="defer(index + 1)">
        <img :src="item.picture" alt="" />
        <span>{{ item.bookName }}</span>
        <div class="btn">
          <a-button type="primary" @click="lookBtn(item)">借阅</a-button>
          <a-button type="primary" @click="viewBtn(item)">查看</a-button>
        </div>
      </div>
    </template>
    <a-modal v-model:open="open" title="图书借阅" @ok="handleOk">
      <!-- 日期选择组件 -->
      <div class="bookRestore">
        <a-space direction="vertical">
          <a-range-picker
            v-model:value="value4"
            style="width: 400px"
            :disabled-date="disabledDate"
            :disabled-time="disabledRangeTime"
            :show-time="{
              hideDisabledOptions: true,
              defaultValue: [
                dayjs('00:00:00', 'HH:mm:ss'),
                dayjs('11:59:59', 'HH:mm:ss')
              ]
            }"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-space>
      </div>
    </a-modal>
    <!-- 抽屉 -->
    <a-drawer
      v-model:open="open1"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      style="color: red"
      title="图书详情"
      placement="right"
      :width="500"
    >
      <div class="book-box">
        <img :src="itemInfo.picture" alt="" />
        <p class="name">{{ itemInfo.bookName }}</p>
        <p>{{ itemInfo.author }}&nbsp;&nbsp;<span class="zhu">著</span></p>
        <p>
          &yen;&nbsp;&nbsp;<span>{{ itemInfo.price.toFixed(2) }}</span>
        </p>
        <p>
          出版社：<span>{{ itemInfo.publish }}</span>
        </p>
        <p>{{ itemInfo.typestr }}类</p>
        <p class="desc">
          {{ itemInfo.describe }}
        </p>
      </div>
    </a-drawer>
  </div>
</template>

<style scoped lang="less">
.bookLending {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 200px;
    height: 250px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px calc((100% - 6 * 200px) / 6 / 2);
    transition: all 0.5s;
    background-color: var(--main-color3);
    color: var(--main-wenzi1);

    &:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      transform: translate3d(0, -2px, 0);
    }
    img {
      width: 150px;
      height: 150px;
      margin-bottom: 10px;
    }
    .btn {
      margin-top: 10px;
      button {
        margin: 0px 5px;
      }
    }
  }
}
.book-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 300px;
  }
  p {
    margin: 5px 0;
    color: #333;
    font-size: 18px;
  }
  .name {
    font-size: 22px;
  }
  .zhu {
    color: #818181;
  }
  .desc {
    font-family: '宋体';
  }
}
</style>
