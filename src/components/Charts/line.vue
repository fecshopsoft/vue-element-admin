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
    lineData: {
      type: Object
    }
    // ,
    // legenddata: {
    // type: Array
    // },
    // seriesdata: {
    // type: Array
    // }
  },
  watch: {
    // 如果 `lineData` 发生改变，这个函数就会运行
    lineData: function(newlineData, oldlineData) {
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
      var lineData = this.lineData
      var legendData = []
      var xAxisDataObj = {}
      var xAxisDataArr = []
      var info
      var name
      // 首先循环，得到所有的x轴的值，写入对象xAxisDataObj
      for (name in lineData) {
        info = lineData[name]
        for (var x in info) {
          if (!xAxisDataObj.hasOwnProperty(x)) {
            xAxisDataObj[x] = x
          }
        }
      }
      // 将 xAxisDataObj 输出为数组 xAxisDataArr
      for (var y in xAxisDataObj) {
        xAxisDataArr.push(y)
      }
      // 将数组 xAxisDataArr 排序
      xAxisDataArr.sort()

      var seriesData = []
      for (name in lineData) {
        legendData.push(name)
        info = lineData[name]
        var xVal = []
        for (var xx in xAxisDataArr) {
          // 得到x轴的值
          var xData = xAxisDataArr[xx]
          // 查看是否有该时间对应的值
          if (!info.hasOwnProperty(xData)) {
            xVal.push(0)
          } else {
            xVal.push(info[xData])
          }
        }
        // 得到维度对应的y值
        var seriesOne = {
          name: name,
          type: 'line',
          data: xVal,
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        }
        seriesData.push(seriesOne)
      }

      this.chart = echarts.init(document.getElementById(this.id))
      // var self = this
      this.chart.setOption({
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legendData
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{}, { type: 'inside' }],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisDataArr
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: seriesData
      })
    }
  }
}
</script>
