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
import '@/styles/_variables.scss';

import { computed } from 'vue';

import ApexChart from 'vue3-apexcharts';

const props = defineProps({
  data: { type: Array, required: true },
  positive: { type: Boolean, default: true },
  width: { type: [Number, String], default: 167 },
  height: { type: [Number, String], default: 120 }
})

const series = [
  {
    name: 'stat',
    data: props.data
  }
]

const mainColor = computed(() => props.positive ? '#00c48c' : '#ff4d4f'); // насыщенный зелёный/красный

const chartOptions = {
  chart: {
    type: 'area',
    toolbar: { show: false },
    background: 'transparent',
    sparkline: { enabled: false },
    zoom: { enabled: false },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
    colors: [mainColor.value]
  },
  fill: {
    type: 'solid',
    colors: [mainColor.value],
    opacity: 1
  },
  grid: { show: false },
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { show: false },
  tooltip: { enabled: false },
  markers: { size: 0 },
  dataLabels: { enabled: false },
  legend: { show: false }
}
</script> 