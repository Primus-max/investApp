<template>
  <ApexChart
    type="area"
    :options="chartOptions"
    :series="series"
    width="150"
    height="100"
  />
</template>

<script setup>
import { computed } from 'vue';

import ApexChart from 'vue3-apexcharts';

const props = defineProps({
  positive: { type: Boolean, default: true }
})

const currentColor = computed(() => props.positive ? '#00c48c' : '#ff4d4f');

const series = [
  {
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }
];

const chartOptions = {
  chart: {
    type: 'area',
    height: 120,
    toolbar: { show: false },
    background: 'transparent',
    sparkline: { enabled: true },
    parentHeightOffset: 0
  },
  dataLabels: {
    enabled: false
  },
  colors: [currentColor.value],
  stroke: {
    curve: 'smooth',
    width: 2
  },
  markers: {
    size: 0,
    colors: [currentColor.value]
  },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  },
  tooltip: {
    enabled: false
  }
};
</script>