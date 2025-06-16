<script setup>
const props = defineProps({
  sectors: {
    type: Array,
    required: true,
    // [{ value: Number, color: String, label: String }]
  },
  size: {
    type: Number,
    default: 180
  },
  strokeWidth: {
    type: Number,
    default: 24
  },
  gap: {
    type: Number,
    default: 3 // px, визуальный gap между секторами
  }
});

const radius = (props.size - props.strokeWidth) / 2;
const center = props.size / 2;
const total = props.sectors.reduce((sum, s) => sum + s.value, 0);
const circumference = 2 * Math.PI * radius;

// Для gap: вычисляем длину пробела между секторами
const gapAngle = 2 * Math.PI * (props.gap / circumference); // угол в радианах
const gapLength = (props.gap / (2 * Math.PI * radius)) * circumference;

let acc = 0;
const sectorsData = props.sectors.map((s, i) => {
  const value = s.value;
  const percent = value / total;
  const arcLength = percent * circumference - gapLength;
  const dashArray = `${arcLength},${gapLength}`;
  const dashOffset = -acc;
  acc += percent * circumference;
  return {
    ...s,
    percent,
    dashArray,
    dashOffset
  };
});
</script>

<template>
  <div class="pie-chart-atom" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <g>
        <circle
          v-for="(s, i) in sectorsData"
          :key="i"
          :cx="center"
          :cy="center"
          :r="radius"
          :stroke="s.color"
          :stroke-width="strokeWidth"
          fill="none"
          stroke-linecap="round"
          :stroke-dasharray="s.dashArray"
          :stroke-dashoffset="s.dashOffset"
          style="transition: stroke 0.3s;"
        />
      </g>
      <!-- Белый круг для создания эффекта gap -->
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke="'#fff'"
        :stroke-width="props.gap"
        fill="none"
      />
    </svg>
    <div class="pie-chart-atom__center">
      <slot name="center" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.pie-chart-atom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  background: transparent;

  svg {
    display: block;
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
  }

  &__center {
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
}
</style> 