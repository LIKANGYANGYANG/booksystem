<template>
  <div class="book-data">
    <a-card hoverable style="width: 500px" class="book-card">
      <div class="item" ref="chartDom"></div>
    </a-card>
    <a-card hoverable style="width: 500px" class="book-card">
      <div class="item" ref="chartDom1"></div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { getTypeNum } from '@/api/bookType/index'
import { useCounterStore } from '@/stores/counter'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import type {
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components'
import { BarChart, type BarSeriesOption } from 'echarts/charts'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'

import { CanvasRenderer } from 'echarts/renderers'

//仓库
const useStore = useCounterStore()
echarts.use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  LabelLayout
])

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | BarSeriesOption
>
let chartDom = ref()
let chartDom1 = ref()
//获取每个类别的图书数量
const getBookNum = async () => {
  let typeArr: string[] = []
  let sumArr: number[] = []
  let res = await getTypeNum()
  res.data.forEach((item) => {
    typeArr.push(item.typestr)
    sumArr.push(item.count)
  })

  let json = JSON.parse(
    JSON.stringify(res.data)
      .replace(/typestr/g, 'name')
      .replace(/count/g, 'value')
  )

  return {
    typeArr,
    sumArr,
    pieData: json
  }
}

//监听
watch(
  () => useStore.main,
  () => {
    //销毁之前的图表实例
    echarts.dispose(chartDom.value)
    echarts.dispose(chartDom1.value)
    //重新创建实例
    fn()
  }
)
//图表实例函数
const fn = async () => {
  let res = await getBookNum()
  var myChart = echarts.init(chartDom.value, useStore.main)
  var option: EChartsOption
  //柱形图
  option = {
    title: {
      text: '图书类别',
      left: 'center',
      top: 10
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: res.typeArr,
      name: '类别',
      nameLocation: 'end',
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '图书数量'
    },
    series: [
      {
        data: res.sumArr,
        type: 'bar'
      }
    ]
  }
  option && myChart.setOption(option)
  //饼图
  var myChart1 = echarts.init(chartDom1.value, useStore.main)
  var option1
  option1 = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        left: 50,
        data: res.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  option1 && myChart1.setOption(option1)
}
onMounted(() => {
  fn()
})
</script>
<style scoped lang="less">
.book-data {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .book-card {
    margin: 10px calc((100% - 2 * 500px) / 2 / 2);
    height: 355px;
    background-color: var(--main-color1);
    .item {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
