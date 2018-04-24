<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    legenddata: {
      type: Array
    },
    seriesdata: {
      type: Array
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    seriesdata: function(newQuestion, oldQuestion) {
      this.initChart()
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      var self = this
      this.chart.setOption({
        // backgroundColor: '#394056',
        title: {
          top: 20,
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16
            // color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: self.legenddata,
          textStyle: {
            fontSize: 12
            // color: '#F1F1F3'
          }
        },
        series: [{
          name: '',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: self.seriesdata,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    }
  }
}
</script>
