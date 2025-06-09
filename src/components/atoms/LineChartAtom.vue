<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
    <rect x="0" y="0" :width="width" :height="height" fill="#ffe4e1" fill-opacity="0.2" />
    <polyline :points="chartPoints" :stroke="lineColor" fill="none" stroke-width="2" />
    <line v-if="showMidLine" x1="0" :y1="midY" :x2="width" :y2="midY" :stroke="lineColor" stroke-dasharray="4 4" stroke-width="1" />
  </svg>
</template>

<script setup>
import {
  computed,
  watchEffect,
} from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
  color: { type: String, default: '' },
  positive: { type: Boolean, default: true },
  width: { type: Number, default: 140 },
  height: { type: Number, default: 56 },
  showMidLine: { type: Boolean, default: true },
});

watchEffect(() => {
  // Диагностика: выводим chartData
  // eslint-disable-next-line no-console
  console.log('LineChartAtom data:', props.data);
});

const lineColor = computed(() => {
  if (props.color) return props.color;
  return props.positive ? '#3CB46E' : '#F04438';
});

const chartPoints = computed(() => {
  if (!props.data.length) return '';
  const max = Math.max(...props.data);
  const min = Math.min(...props.data);
  const range = max - min || 1;
  return props.data.map((v, i) => {
    const x = (i / (props.data.length - 1)) * props.width;
    const y = props.height - 2 - ((v - min) / range) * (props.height - 8);
    return `${x},${y}`;
  }).join(' ');
});

const midY = computed(() => props.height / 2);
</script> 