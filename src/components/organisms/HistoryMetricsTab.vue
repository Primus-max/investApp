<template>
  <div class="history-metrics">
    <!-- График доходности -->
    <div class="history-metrics__chart">
      <!-- <div class="history-metrics__chart-header">
        <div class="history-metrics__chart-value">
          {{ formattedCurrentValue }}
        </div>
        <div class="history-metrics__chart-date">
          {{ currentDate }}
        </div>
      </div>
       -->
      <div class="history-metrics__chart-container">
        <ApexChart
          type="bar"
          :options="chartOptions"
          :series="chartSeries"
          width="100%"
          height="234"
        />
      </div>
      
      <!-- Периоды фильтрации -->
      <div class="history-metrics__periods">
        <button
          v-for="period in periods"
          :key="period.value"
          :class="['history-metrics__period', { 'history-metrics__period--active': activePeriod === period.value }]"
          @click="activePeriod = period.value"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <!-- Метрики -->
    <div class="history-metrics__stats">
      <div class="history-metrics__stat" v-for="metric in metrics" :key="metric.label">
        <div class="history-metrics__stat-label">
          {{ metric.label }}
          <component
            v-if="metric.icon"
            :is="metric.icon"
            class="history-metrics__stat-icon"
          />
        </div>
        <div class="history-metrics__stat-value" :class="metric.colorClass">
          {{ metric.value }}
        </div>
      </div>
    </div>

    <!-- Подробнее кнопка -->
    <div class="history-metrics__details">
      <button class="history-metrics__details-button">
        Подробнее
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  watch,
} from 'vue';

import ApexChart from 'vue3-apexcharts';

import IconInfo from '@/components/atoms/icons/IconInfo.vue';

const props = defineProps({
  portfolioData: {
    type: Object,
    default: () => ({})
  }
});

// Активный период
const activePeriod = ref('6M');

// Выбранный столбец (индекс)
const selectedBarIndex = ref(-1);

// Сбрасываем выбор при смене периода
watch(activePeriod, () => {
  selectedBarIndex.value = -1;
});

// Периоды для фильтрации
const periods = [
  { label: 'М', value: '1M' },
  { label: '6М', value: '6M' },
  { label: '1Г', value: '1Y' },
  { label: '3Г', value: '3Y' },
  { label: 'ВСЕ', value: 'ALL' }
];

// Моковые данные для графика (как в макете)
const chartData = {
  '1M': { values: [1200000, 1400000, 1300000, 1600000, 1500000, 1700000, 1837471], dates: [] },
  '6M': { values: [1000000, 1200000, 1100000, 1400000, 1300000, 1600000, 1500000, 1800000, 1700000, 1837471], dates: [] },
  '1Y': { values: [800000, 1000000, 900000, 1200000, 1100000, 1400000, 1300000, 1600000, 1500000, 1800000, 1700000, 1837471], dates: [] },
  '3Y': { values: [600000, 800000, 700000, 1000000, 900000, 1200000, 1100000, 1400000, 1300000, 1600000, 1500000, 1800000, 1700000, 1837471], dates: [] },
  'ALL': { values: [400000, 600000, 500000, 800000, 700000, 1000000, 900000, 1200000, 1100000, 1400000, 1300000, 1600000, 1500000, 1800000, 1700000, 1837471], dates: [] }
};

// Текущее значение портфеля
const currentValue = ref(1837471);
const currentDate = ref('30.04.2024');

const formattedCurrentValue = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(currentValue.value) + ' ₽';
});

// Серии данных для графика
const chartSeries = computed(() => [
  {
    name: 'Стоимость портфеля',
    data: chartData[activePeriod.value].values
  }
]);

// Настройки графика
const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 234,
    toolbar: { show: false },
    background: 'transparent',
    parentHeightOffset: 0,
    zoom: { enabled: false },
    events: {
      dataPointSelection: (event, chartContext, config) => {
        selectedBarIndex.value = selectedBarIndex.value === config.dataPointIndex ? -1 : config.dataPointIndex;
      }
    }
  },
  annotations: {
    xaxis: [
      {
        x: 0,
        strokeDashArray: 0,
        borderColor: 'transparent',
        label: {
          borderColor: 'transparent',
          style: {
            color: '#9CA3AF',
            background: 'transparent',
            fontSize: '12px'
          },
          // text: '2024',
          position: 'top',
          offsetY: 0,
          offsetX: 0
        }
      },
      {
        x: chartData[activePeriod.value].values.length - 1,
        strokeDashArray: 0,
        borderColor: 'transparent',
        label: {
          borderColor: 'transparent',
          style: {
            color: '#9CA3AF',
            background: 'transparent',
            fontSize: '12px'
          },
          // text: '2025',
          position: 'top',
          offsetY: 0,
          offsetX: 0
        }
      }
    ]
  },
  plotOptions: {
    bar: {
      columnWidth: '60%',
      borderRadius: 2,
      distributed: true,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: computed(() => {
    const data = chartData[activePeriod.value].values;
    const colors = new Array(data.length).fill('#D1D5DB');
    
    // Если есть выбранный столбец, выделяем его primary цветом
    if (selectedBarIndex.value >= 0) {
      colors[selectedBarIndex.value] = '#6366F1'; // $primary-500
    } else {
      // Иначе выделяем предпоследний столбец синим (как в макете)
      colors[data.length - 2] = '#3B82F6';
    }
    
    return colors;
  }).value,
  stroke: {
    show: false
  },
  fill: {
    opacity: 1
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: computed(() => {
      const data = chartData[activePeriod.value].values;
      return new Array(data.length).fill('');
    }).value,
    labels: { 
      show: false
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
    crosshairs: {
      show: false
    }
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        colors: '#9CA3AF',
        fontSize: '11px'
      },
      formatter: (value) => {
        if (value >= 1000000) {
          return (value / 1000000).toFixed(1) + 'м'
        } else if (value >= 1000) {
          return (value / 1000).toFixed(0) + 'к'
        }
        return value.toString()
      }
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
    min: 0,
    max: 2500000,
    tickAmount: 5
  },
  grid: {
    show: true,
    borderColor: '#E5E7EB',
    strokeDashArray: 3,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  tooltip: {
    enabled: true,
    theme: 'light',
    y: {
      formatter: (value) => new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
    }
  }
}));

// Метрики
const metrics = computed(() => [
  {
    label: 'Доходность',
    value: '+ 2 345 461 ₽',
    colorClass: 'history-metrics__stat-value--positive',
    icon: IconInfo
  },
  {
    label: 'Прибыль',
    value: '+ 1 345 461 ₽',
    colorClass: 'history-metrics__stat-value--positive'
  },
  {
    label: 'Вложено',
    value: '1 000 000 ₽',
    colorClass: ''
  },
  {
    label: 'Дивидендная доходность',
    value: '+ 4%',
    colorClass: 'history-metrics__stat-value--positive'
  },
  {
    label: 'Пассивный доход',
    value: '+ 12 461 ₽',
    colorClass: 'history-metrics__stat-value--positive'
  },
  {
    label: 'Издержки',
    value: '- 5 461 ₽',
    colorClass: 'history-metrics__stat-value--negative',
    icon: IconInfo
  },
  {
    label: 'Среднегодовая доходность',
    value: '+ 34%',
    colorClass: 'history-metrics__stat-value--positive',
    icon: IconInfo
  },
  {
    label: 'Риск',
    value: 'Средний',
    colorClass: 'history-metrics__stat-value--warning',
    icon: IconInfo
  }
]);
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.history-metrics {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $space-l;
  background: $gray-0;
  border-radius: $radius-xl;
  padding: 0 4px;
  margin: 0;

  &__chart {    
    &-header {
      margin-bottom: $space-l;
    }

    &-value {
      font-size: 28px;
      font-weight: $font-weight-bold;
      color: $gray-950;
      line-height: 1.2;
    }

    &-date {
      font-size: $font-size-small;
      color: $gray-600;
      margin-top: $space-xs;
    }

          &-container {
        margin: 0;
        height: 234px;
      }
  }

  &__periods {
    display: flex;
    gap: $space-xs;
    justify-content: space-between;
  }

  &__period {
    flex: 1;
    background: transparent;
    border: none;
    border-radius: $radius-md;
    padding: $space-xs $space-s;
    font-size: $font-size-small;
    font-weight: $font-weight-medium;
    color: $gray-600;
    cursor: pointer;
    transition: all 0.2s;

    &--active {
      background: $gray-100;
      color: $gray-950;
      border-radius: $radius-lg;
    }

    &:hover:not(&--active) {
      background: rgba($gray-100, 0.3);
    }
  }

  &__stats {
    display: flex;
    flex-direction: column;
    gap: $space-m;
  }

  &__stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-s 0;

    &-label {
      display: flex;
      align-items: center;
      gap: $space-xs;
      font-size: $font-size-body;
      color: $gray-600;
    }

    &-icon {
      width: 16px;
      height: 16px;
      color: $gray-400;
    }

    &-value {
      font-size: $font-size-body;
      font-weight: $font-weight-medium;
      color: $gray-950;

      &--positive {
        color: $color-success;
      }

      &--negative {
        color: $color-error;
      }

      &--warning {
        color: $color-warning;
      }
    }
  }

  &__details {
    margin-top: $space-l;

    &-button {
      width: 100%;
      background: $gray-100;
      border: none;
      border-radius: $radius-lg;
      padding: $space-m;
      font-size: $font-size-body;
      font-weight: $font-weight-medium;
      color: $gray-700;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: darken($gray-100, 5%);
      }
    }
  }
}
</style>