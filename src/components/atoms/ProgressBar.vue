<template>
  <div class="progress-bar" :class="progressBarClass">
    <div 
      class="progress-bar__fill" 
      :style="{ width: `${clampedProgress}%` }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  progress: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['thin', 'medium', 'thick'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'error'].includes(value)
  }
});

const clampedProgress = computed(() => {
  return Math.max(0, Math.min(100, props.progress));
});

const progressBarClass = computed(() => {
  return [
    `progress-bar--${props.size}`,
    `progress-bar--${props.color}`
  ];
});
</script>

<style lang="scss" scoped>
@import '@/styles/_variables';

.progress-bar {
  width: 100%;
  border-radius: 10000px;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;

  &--thin {
    height: 4px;
  }

  &--medium {
    height: 8px;
  }

  &--thick {
    height: 12px;
  }
}

.progress-bar__fill {
  height: 100%;
  border-radius: 10000px;
  transition: width 0.3s ease;
  position: relative;

  .progress-bar--primary & {
    background: #FFFFFF;
  }

  .progress-bar--success & {
    background: linear-gradient(90deg, $color-success 0%, #4ADE80 100%);
  }

  .progress-bar--warning & {
    background: linear-gradient(90deg, #F59E0B 0%, #FCD34D 100%);
  }

  .progress-bar--error & {
    background: linear-gradient(90deg, $color-error 0%, #F87171 100%);
  }
}

// Специальные стили для контекста инвестиционной цели
.progress-bar--investment {
  background: rgba(255, 255, 255, 0.3);
  
  .progress-bar__fill {
    background: #FFFFFF;
  }
}

// Стили для темного фона (в шапке)
.progress-bar--dark {
  background: rgba(255, 255, 255, 0.2);
  
  .progress-bar__fill {
    background: #FFFFFF;
  }
}
</style> 