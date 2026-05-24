<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 3000

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
      const indicatorKeys = [
        'sales',
        'administration',
        'informationTechnology',
        'customerSupport',
        'development',
        'marketing'
      ]
      const legendKeys = ['allocatedBudget', 'expectedSpending', 'actualSpending']
      const indicators = indicatorKeys.map(key => ({
        name: this.$t(`dashboard.radar.indicators.${key}`),
        max: key === 'sales' ? 10000 : 20000
      }))
      const legends = legendKeys.map(key => this.$t(`dashboard.radar.legend.${key}`))

      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: indicators
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: legends
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: legends[0]
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: legends[1]
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: legends[2]
            }
          ],
          animationDuration: animationDuration
        }]
      }
    }
  }
}
</script>
