<script setup lang="ts">
import { bookLendingId, returnBook } from '@/api/book/index'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

//存储数据
const data = ref<any[]>()
//获取所借阅的图书
const getBookLending = async () => {
  const id = Number(localStorage.getItem('book-user-id'))
  let res: any = await bookLendingId(id)
  if (res.code === 200) {
    data.value = res.data
  }
}

onMounted(() => {
  getBookLending()
})
//归还按钮回调
const returnBtn = async (id: number) => {
  let res: any = await returnBook(id)
  if (res.code === 200) {
    message.success('归还成功', 2)
    getBookLending()
  } else {
    message.error('归还失败', 1)
  }
}
</script>
<script lang="ts">
export default {
  name: 'bookRestore'
}
</script>

<template>
  <div class="bookRestore">
    <div class="box" v-if="data?.length">
      <template v-for="item in data" :key="item.id">
        <div class="item">
          <img :src="item.picture" alt="" />
          <div class="info-item">
            <span>{{ item.bookName }}</span>
            <span
              >借阅时间:{{
                dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span
            >
            <span
              >归还时间:{{
                dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span
            >
            <a-button
              type="primary"
              style="margin-top: 5px"
              @click="returnBtn(item.id)"
              >归还</a-button
            >
          </div>
        </div>
      </template>
    </div>
    <a-result title="你还没有借阅过图书，快去借阅吧！" v-else id="book-result">
    </a-result>
  </div>
</template>

<style scoped lang="less">
.bookRestore {
  width: 100%;
  height: 100%;
  .box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 300px;
      height: 300px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      margin: 10px calc((100% - 4 * 300px) / 4 / 2);
      background-color: var(--main-color3);
      color: var(--main-wenzi1);
      img {
        width: 150px;
      }
      .info-item {
        display: flex;
        flex-direction: column;
        text-align: center;
        span {
          margin: 5px 0;
        }
      }
    }
  }
  .no {
    text-align: center;
    font-size: 25px;
    font-family: '宋体';
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-5vhs7m).ant-result .ant-result-title
    ) {
    color: var(--main-wenzi1);
  }
}
</style>
