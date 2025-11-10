<script setup lang="ts">
import { onMounted } from 'vue'
import motionGraph from '@/components/motionGraph/motion-graph.vue'
import { dateFormat } from '@/utils/dateFormat'

const isadmin = Number(localStorage.getItem('isadmin'))
</script>
<script lang="ts">
export default {
  name: 'Home',
  //解决首页小bug
  beforeRouteEnter(to, from, next) {
    if (from.path === '/login') {
      next()
      setTimeout(() => {
        location.reload()
      }, 0)
    }
    next()
  }
}
</script>

<template>
  <div class="home">
    <h1 class="title">
      欢迎来到{{ isadmin ? '图书管理系统' : '图书借阅平台' }}，{{
        dateFormat()
      }}好！
    </h1>

    <motionGraph />
  </div>
</template>

<style scoped lang="less">
.home {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    text-align: center;
    /* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
    @font-face {
      font-family: '阿里妈妈刀隶体 Regular';
      font-weight: 400;
      src: url('//at.alicdn.com/wf/webfont/H2dLD4i3xAdZ/jVqfdlSjufSD.woff2')
          format('woff2'),
        url('//at.alicdn.com/wf/webfont/H2dLD4i3xAdZ/txHMjY64pc5p.woff')
          format('woff');
      font-display: swap;
    }
    font-family: 阿里妈妈刀隶体 Regular;
    font-size: 30px;
    color: var(--main-wenzi1);
  }
}
</style>
