
<template>
  <div class='chart-container'>
    <chart 
      :className="className" 
      :id="id"
      :width="width"
      :height="height"
    ></chart>
  </div>
</template>3333

<script>
import Chart from '@/components/Charts/mixChart'

export default {
  name: 'mixChart',
  components: { Chart },
  data() {
    return {
      className: 'chart_1',
      id: 'chart_1',
      width: '800px',
      height: '800px'
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  padding: 20px;
  width: 100%;
  height:85vh;
}
</style>

