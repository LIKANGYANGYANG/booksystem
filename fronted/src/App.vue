<script setup lang="ts">
//使组件变为中文
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
const locale = zhCN
dayjs.locale('en')
</script>

<template>
  <a-config-provider :locale="locale">
    <RouterView></RouterView>
  </a-config-provider>
</template>

<style scoped lang="less"></style>
