<template>
  <ApexChart
    type="area"
    :options="chartOptions"
    :series="series"
    :width="width"
    :height="height"
  />
</template>

<script setup>
import { computed } from 'vue';

import ApexChart from 'vue3-apexcharts';

const props = defineProps({
  positive: { type: Boolean, default: true },
  data: { type: Array, default: () => [31, 40, 28, 51, 42, 109, 100] },
  width: { type: [String, Number], default: 150 },
  height: { type: [String, Number], default: 100 }
})

const currentColor = computed(() => props.positive ? '#00c48c' : '#ff4d4f');

const series = computed(() => [
  {
    name: 'series1',
    data: props.data
  }
]);

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: props.height,
    toolbar: { show: false },
    background: 'transparent',
    sparkline: { enabled: true },
    parentHeightOffset: 0
  },
  annotations: {
    yaxis: [{
      y: 50,
      strokeDashArray: 4,
      borderColor: currentColor.value,
      opacity: 0.3
    }]
  },
  dataLabels: {
    enabled: false
  },
  colors: [currentColor.value],
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      opacityFrom: 0.6,
      opacityTo: 0.1,
      colorStops: [{
        offset: 0,
        color: currentColor.value,
        opacity: 0.6
      }, {
        offset: 100,
        color: currentColor.value,
        opacity: 0.1
      }]
    }
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
}));
</script>