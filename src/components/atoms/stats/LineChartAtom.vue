<template>
  <ApexChart
    type="line"
    :options="chartOptions"
    :series="series"
    :width="width"
    :height="height"
  />
</template>

<script setup>
import ApexChart from 'vue3-apexcharts';

const props = defineProps({
  data: { type: Array, required: true },
  positive: { type: Boolean, default: true },
  width: { type: [Number, String], default: 167 },
  height: { type: [Number, String], default: 120 }
})

const series = [
  {
    data: props.data
  }
]

const mainColor = props.positive ? '#3CB46E' : '#F04438'

const chartOptions = {
  chart: {
    type: 'line',
    toolbar: { show: false },
    background: 'transparent',
    sparkline: { enabled: true },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 900
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2,
    colors: [mainColor]
  },
  fill: {
    type: 'solid',
    colors: ['transparent']
  },
  grid: { show: false },
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { show: false },
  tooltip: { enabled: false },
  markers: { size: 0 },
  dataLabels: { enabled: false }
}
</script> 