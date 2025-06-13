<script setup>
const props = defineProps({
  sectors: {
    type: Array,
    required: true,
    // [{ value: Number, color: String, label: String }]
  },
  size: {
    type: Number,
    default: 140
  },
  strokeWidth: {
    type: Number,
    default: 18
  }
});

const radius = (props.size - props.strokeWidth) / 2;
const center = props.size / 2;
const total = props.sectors.reduce((sum, s) => sum + s.value, 0);

let acc = 0;
const sectorsData = props.sectors.map((s, i) => {
  const value = s.value;
  const percent = value / total;
  const angle = percent * 360;
  const startAngle = acc;
  const endAngle = acc + angle;
  acc += angle;
  return {
    ...s,
    percent,
    startAngle,
    endAngle
  };
});

function getArcPath(startAngle, endAngle) {
  const r = radius;
  const start = polarToCartesian(center, center, r, endAngle);
  const end = polarToCartesian(center, center, r, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return [
    'M', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}
</script>

<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
    <g v-for="(s, i) in sectorsData" :key="i">
      <path
        :d="getArcPath(s.startAngle, s.endAngle)"
        :stroke="s.color"
        :stroke-width="strokeWidth"
        fill="none"
        stroke-linecap="round"
      />
    </g>
  </svg>
</template>

<style scoped>
svg {
  display: block;
}
</style> 