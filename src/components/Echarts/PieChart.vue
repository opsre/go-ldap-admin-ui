<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    locale() {
      return this.$store.getters.locale
    }
  },
  watch: {
    locale() {
      if (this.chart) {
        this.refreshChart()
      }
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption(this.getChartOption())
    },
    refreshChart() {
      this.$nextTick(() => {
        window.requestAnimationFrame(() => {
          if (!this.chart) {
            return
          }
          this.chart.setOption(this.getChartOption())
          this.chart.resize()
          window.requestAnimationFrame(() => {
            if (this.chart) {
              this.chart.resize()
            }
          })
        })
      })
    },
    getChartOption() {
      const categoryKeys = ['industries', 'technology', 'forex', 'gold', 'forecasts']
      const categories = categoryKeys.map(key => this.$t(`dashboard.pie.categories.${key}`))

      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: categories
        },
        calculable: true,
        series: [
          {
            name: this.$t('dashboard.pie.seriesName'),
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: categories[0] },
              { value: 240, name: categories[1] },
              { value: 149, name: categories[2] },
              { value: 100, name: categories[3] },
              { value: 59, name: categories[4] }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      }
    }
  }
}
</script>
