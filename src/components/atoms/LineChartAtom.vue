<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" class="line-chart">
    <defs>
      <!-- Градиент для заливки -->
      <linearGradient :id="`gradient-${chartId}`" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" :stop-color="lineColor" stop-opacity="0.2" />
        <stop offset="100%" :stop-color="lineColor" stop-opacity="0.05" />
      </linearGradient>
      
      <!-- Паттерн для пунктирной линии -->
      <pattern :id="`dotted-${chartId}`" patternUnits="userSpaceOnUse" width="8" height="2">
        <rect width="4" height="2" :fill="lineColor" opacity="0.4" />
        <rect x="4" width="4" height="2" fill="transparent" />
      </pattern>
    </defs>
    
    <!-- Пунктирная горизонтальная линия по центру -->
    <line 
      x1="8" 
      :y1="midY" 
      :x2="width - 8" 
      :y2="midY" 
      :stroke="`url(#dotted-${chartId})`" 
      stroke-width="2"
    />
    
    <!-- Заливка под графиком -->
    <path
      v-if="fillPath"
      :d="fillPath"
      :fill="`url(#gradient-${chartId})`"
    />
    
    <!-- Основная линия графика -->
    <path
      :d="chartPath"
      :stroke="lineColor"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
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
  width: { type: Number, default: 167 },
  height: { type: Number, default: 120 },
  showMidLine: { type: Boolean, default: true },
});

// Уникальный ID для градиентов
const chartId = Math.random().toString(36).substr(2, 9);

watchEffect(() => {
  // Диагностика: выводим chartData
  // eslint-disable-next-line no-console
  console.log('LineChartAtom data:', props.data);
});

const lineColor = computed(() => {
  if (props.color) return props.color;
  return props.positive ? '#3CB46E' : '#F04438';
});

const midY = computed(() => props.height / 2);

// Создаем smooth path с помощью cubic bezier curves
const chartPath = computed(() => {
  if (!props.data.length) return '';
  
  const padding = 8;
  const chartWidth = props.width - (padding * 2);
  const chartHeight = props.height - (padding * 2);
  
  const max = Math.max(...props.data);
  const min = Math.min(...props.data);
  const range = max - min || 1;
  
  const points = props.data.map((v, i) => {
    const x = padding + (i / (props.data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((v - min) / range) * chartHeight;
    return { x, y };
  });
  
  if (points.length < 2) return '';
  
  let path = `M ${points[0].x} ${points[0].y}`;
  
  // Создаем smooth curves между точками
  for (let i = 1; i < points.length; i++) {
    const prevPoint = points[i - 1];
    const currentPoint = points[i];
    
    if (i === 1) {
      // Первая кривая
      const controlPoint1X = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.3;
      const controlPoint1Y = prevPoint.y;
      const controlPoint2X = currentPoint.x - (currentPoint.x - prevPoint.x) * 0.3;
      const controlPoint2Y = currentPoint.y;
      
      path += ` C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${currentPoint.x} ${currentPoint.y}`;
    } else {
      // Последующие кривые с учетом предыдущей точки
      const prevPrevPoint = points[i - 2];
      const nextPoint = points[i + 1] || currentPoint;
      
      const controlPoint1X = prevPoint.x + (currentPoint.x - prevPrevPoint.x) * 0.15;
      const controlPoint1Y = prevPoint.y + (currentPoint.y - prevPrevPoint.y) * 0.15;
      const controlPoint2X = currentPoint.x - (nextPoint.x - prevPoint.x) * 0.15;
      const controlPoint2Y = currentPoint.y - (nextPoint.y - prevPoint.y) * 0.15;
      
      path += ` C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${currentPoint.x} ${currentPoint.y}`;
    }
  }
  
  return path;
});

// Создаем заливку под графиком
const fillPath = computed(() => {
  if (!props.data.length) return '';
  
  const mainPath = chartPath.value;
  if (!mainPath) return '';
  
  const padding = 8;
  const chartWidth = props.width - (padding * 2);
  const bottomY = props.height - padding;
  
  // Добавляем линии к нижним углам для создания заливки
  const lastPoint = props.data.length - 1;
  const lastX = padding + chartWidth;
  
  return `${mainPath} L ${lastX} ${bottomY} L ${padding} ${bottomY} Z`;
});
</script>

<style scoped lang="scss">
.line-chart {
  overflow: visible;
}
</style> 