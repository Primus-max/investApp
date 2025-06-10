<template>
  <ApexChart
    type="area"
    :options="chartOptions"
    :series="series"
    width="300"
    height="120"
  />
</template>

<script setup>
import ApexChart from 'vue3-apexcharts';

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
    background: 'transparent'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z"
    ],
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