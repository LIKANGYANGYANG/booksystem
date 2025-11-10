<script setup lang="ts">
import { allBorrow, returnBook } from '@/api/book/index'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
//两个时间相差函数
import { dateDiffer } from '@/utils/dateDiffer'
import { message } from 'ant-design-vue'

let data = ref<any[]>()
//获取数据
const getAllBorrow = async () => {
  let res: any = await allBorrow()
  if (res.code === 200) {
    let arr: any[] = []
    //处理数据
    let falg = true
    for (let i in res.data) {
      for (let j in arr) {
        if (arr[j].user_id == res.data[i].user_id) {
          arr[j].book.push({
            id: res.data[i].id,
            book_id: res.data[i].book_id,
            bookName: res.data[i].bookName,
            picture: res.data[i].picture,
            publish: res.data[i].publish,
            typestr: res.data[i].typestr,
            startTime: res.data[i].startTime,
            endTime: res.data[i].endTime,
            author: res.data[i].author
          })
          falg = false
          break
        } else {
          falg = true
        }
      }
      if (falg) {
        arr.push({
          user_id: res.data[i].user_id,
          avatar: res.data[i].avatar,
          name: res.data[i].name,
          book: [
            {
              id: res.data[i].id,
              book_id: res.data[i].book_id,
              bookName: res.data[i].bookName,
              picture: res.data[i].picture,
              publish: res.data[i].publish,
              typestr: res.data[i].typestr,
              startTime: res.data[i].startTime,
              endTime: res.data[i].endTime,
              author: res.data[i].author
            }
          ]
        })
      }
    }
    data.value = arr
  }
}

onMounted(() => {
  getAllBorrow()
})
//还书按钮回调
const alsoBook = async (i) => {
  let res: any = await returnBook(i.id)
  if (res.code === 200) {
    message.success('归还成功', 2)
    //重新获取数据
    getAllBorrow()
  }
}
</script>
<script lang="ts">
export default {
  name: 'AdminBorrow'
}
</script>

<template>
  <div class="admin-borrow">
    <template v-for="item in data" :key="item.user_id">
      <div class="box">
        <div class="user">
          <img :src="item.avatar" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <div class="book">
          <div class="item" v-for="i in item.book">
            <img :src="i.picture" alt="" />
            <div class="info">
              <span style="text-align: center">{{ i.bookName }}</span>
              <span
                >开始借阅：{{
                  dayjs(i.startTime).format('YYYY-MM-DD HH:mm:ss')
                }}</span
              >
              <span
                >预计归还：{{
                  dayjs(i.endTime).format('YYYY-MM-DD HH:mm:ss')
                }}</span
              >
              <span>总计：{{ dateDiffer(i.startTime, i.endTime) }}</span>
              <a-button type="primary" @click="alsoBook(i)">归还</a-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.admin-borrow {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .box {
    margin: 20px 0;
    .user {
      display: flex;
      border-bottom: 1px solid #b6b6b6;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      span {
        margin: auto 10px;
        font-size: 20px;
      }
    }
    .book {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 230px;
        height: 330px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10px calc((100% - 4 * 230px) / 4 / 2);
        box-shadow: 5px 5px 10px #c2c2c2;
        color: var(--main-wenzi1);
        img {
          width: 150px;
          margin: 0 auto;
        }
        .info {
          display: flex;
          flex-direction: column;
          span {
            margin: 5px 0;
          }
        }
      }
    }
  }
}
</style>
