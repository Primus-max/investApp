<!-- <template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps({
  data: { type: Array, required: true },
  color: { type: String, default: '#3CB46E' },
  positive: { type: Boolean, default: true },
  width: { type: Number, default: 167 },
  height: { type: Number, default: 120 },
});

const chartCanvas = ref(null);
let chartInstance = null;

const createChart = () => {
  if (!chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext('2d');
  
  // Создаем градиент для заливки
  const gradient = ctx.createLinearGradient(0, 0, 0, props.height);
  gradient.addColorStop(0, props.positive ? 'rgba(60, 180, 110, 0.2)' : 'rgba(240, 68, 56, 0.2)');
  gradient.addColorStop(1, props.positive ? 'rgba(60, 180, 110, 0.05)' : 'rgba(240, 68, 56, 0.05)');

  const labels = props.data.map((_, index) => index);

  chartInstance = new ChartJS(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: props.data,
        borderColor: props.color,
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointHoverBorderColor: props.color,
        pointHoverBackgroundColor: '#fff',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          display: false,
          grid: {
            display: false
          }
        },
        y: {
          display: false,
          grid: {
            display: false
          }
        }
      },
      elements: {
        line: {
          borderJoinStyle: 'round'
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
};

const destroyChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
};

watch(() => props.data, () => {
  destroyChart();
  createChart();
}, { deep: true });

watch(() => props.color, () => {
  destroyChart();
  createChart();
});

onMounted(() => {
  createChart();
});

onUnmounted(() => {
  destroyChart();
});
</script>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
  
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>  -->