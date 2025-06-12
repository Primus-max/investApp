<template>
    <MainLayout>
        <template #header>
            <section class="page__header">
                <button class="page__back" @click="goBack">
                    <IconArrowLeft class="page__back-icon" />
                    <span class="page__back-text">Back</span>
                </button>
                <div class="page__header-stats-row">
                    <div class="page__header-stats-main">
                        <div class="page__header-stats-info">
                            <div class="page__header-stats-title">{{ portfolio?.name || 'Консервативный' }}</div>
                            <div class="page__header-goal-title">
                                <span>Цель инвестирования</span>
                                <Edit01 :color="'#fff'" class="page__header-edit" />
                            </div>
                            <div class="page__header-stats-value-row">
                                <span class="page__header-stats-value">5 000 000</span>
                                <span class="page__header-stats-currency">₽</span>
                                <span class="page__header-stats-currency">за 5 лет</span>
                            </div>
                        </div>
                    </div>
                    <div class="page__header-progress">
                        <ProgressBar :progress="goalProgress" size="medium" color="primary" />
                    </div>
                    <div class="page__header-badge-row">
                        <span class="page__header-badge">{{ currentAmount }} / {{ targetAmount }}</span>
                        <span class="page__header-badge-period">до {{ goalDeadline }}</span>
                    </div>
                </div>
            </section>
        </template>

        <section class="page__body">
            <div class="page__body-tabs">
                <button v-for="(tab, index) in tabs" :key="tab.name"
                    :class="['page__body-tab', { 'page__body-tab--active': activeTab === index }]"
                    @click="activeTab = index">
                    {{ tab.name }}
                </button>
            </div>
            <div class="page__body-header">
                <h1 class="page__body-header-title">Виджеты</h1>
                <div class="page__body-header-edit-mode">
                    <template v-if="!editMode">
                        <button class="page__body-header-button" @click="editMode = true">
                            <Edit01 class="page__body-header-button-icon" />
                        </button>
                    </template>
                    <template v-else>
                        <PlusButtonAtom />
                        <button class="page__body-header-done" @click="editMode = false">
                            Готов
                        </button>
                    </template>
                </div>
            </div>

            <AppBanner class="page__app-banner">
                Умные советы и инструменты для роста
            </AppBanner>
            <section v-if="!isNotData" class="page__body-analytics">
                <h2 class="page__body-analytics-title">
                    Аналитические данные
                </h2>
                <div class="page__body-analytics-content">
                    <!-- Здесь будет контент аналитики согласно макету -->
                    <div class="analytics-placeholder">
                        Контент аналитики будет добавлен согласно макету
                    </div>
                </div>
            </section>
            <div v-else class="page__body-analytics-empty">
                <AppPillButton>
                    <template #default>
                        <div class="page__body-analytics-empty-button">
                            <IconChartRing class="page__body-analytics-empty-button-icon" />
                            <span class="page__body-analytics-empty-button-label">Построить аналитику</span>
                        </div>
                    </template>
                </AppPillButton>
            </div>
        </section>
    </MainLayout>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';

import AppBanner from '@/components/atoms/AppBanner.vue';
import AppPillButton from '@/components/atoms/AppPillButton.vue';
import Edit01 from '@/components/atoms/icons/Edit-01.vue';
import IconArrowLeft from '@/components/atoms/icons/IconArrowLeft.vue';
import IconChartRing from '@/components/atoms/icons/IconChartRing.vue';
import IconClock01 from '@/components/atoms/icons/IconClock01.vue';
import IconSettings from '@/components/atoms/icons/IconSettings.vue';
import PlusButtonAtom from '@/components/atoms/PlusButtonAtom.vue';
import ProgressBar from '@/components/atoms/ProgressBar.vue';
import StatWidgetCard
  from '@/components/molecules/stat-widgets/StatWidgetCard.vue';
import MainLayout from '@/layout/MainLayout.vue';
import { usePortfoliosStore } from '@/stores/portfolios.js';

const router = useRouter();
const route = useRoute();
const store = usePortfoliosStore();

const portfolio = ref(null);
const isLoading = ref(true);
const isNotData = ref(false);
const editMode = ref(false);

onMounted(async () => {
    const portfolioId = route.params.portfolioId;
    const p = await store.fetchPortfolioById(portfolioId);
    if (!p) {
        isNotData.value = true;
        isLoading.value = false;
        return;
    }
    portfolio.value = {
        ...p,
        amount: p.totalAmount,
        profit: p.totalProfit,
        percent: p.totalPercent,
    };
    isLoading.value = false;
});

const formattedAmount = computed(() => {
    if (!portfolio.value) return '0';
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2
    }).format(portfolio.value.amount);
});

const hasProfit = computed(() =>
    portfolio.value && typeof portfolio.value.profit === 'number' && typeof portfolio.value.percent === 'number'
);

const formattedProfit = computed(() => {
    if (!hasProfit.value) return '';
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Math.abs(portfolio.value.profit));
});

const formattedPercent = computed(() => {
    if (!hasProfit.value) return '';
    return Math.abs(portfolio.value.percent).toFixed(2);
});

const profitSign = computed(() => {
    if (!hasProfit.value) return '';
    return portfolio.value.profit >= 0 ? '+' : '-';
});

const portfolioProgress = computed(() => {
    if (!hasProfit.value) return 0;
    return Math.min(100, Math.max(0, portfolio.value.percent + 50));
});

// Данные для инвестиционной цели (хардкод)
const goalAmount = ref('5 000 000 ₽');
const goalPeriod = ref('за 5 лет');
const currentAmount = ref('2 345 461 ₽');
const targetAmount = ref('5 000 000 ₽');
const goalDeadline = ref('12.12.2030');
const goalProgress = ref(47); // 2,345,461 / 5,000,000 * 100 ≈ 47%

// Табы для аналитики
const activeTab = ref(0);
const tabs = ref([
    { name: 'История и метрики' },
    { name: 'Структура' },
    { name: 'Ближайшие' }
]);

function goBack() {
    router.back();
}


</script>

<style scoped lang="scss">
@import '@/styles/_sections.scss';
@import '@/styles/_variables.scss';

.page {
    &__header {
        &-stats-title {
            font-size: 16px;
            font-weight: $font-weight-medium;
            color: $gray-0;
            line-height: 22px;
            opacity: 0.6;
        }
        &-stats-info{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
        }
        &-goal-title{           
            font-size: 20px;
            font-weight: $font-weight-medium;
        }
    }
}

// .page__back {
//     display: flex;
//     align-items: center;
//     color: $gray-0;
//     font-size: 17px;
//     font-family: 'SF Pro', Arial, sans-serif;
//     font-weight: 400;
//     padding: 0 16px;
//     height: 40px;
//     cursor: pointer;
// }

// .page__back-icon {
//     font-size: 22px;
//     margin-right: 3px;
//     display: flex;
//     align-items: center;
//     font-weight: 590;
// }

// .page__back-text {
//     font-size: 17px;
//     font-family: 'SF Pro', Arial, sans-serif;
//     font-weight: 400;
//     letter-spacing: -0.4px;
// }

// .page__header-goal-title {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-size: 14px;
//   font-weight: 400;
//   color: rgba(255, 255, 255, 0.7);
//   margin-bottom: 4px;
// }

// .page__header-goal-edit {
//   color: rgba(255, 255, 255, 0.6);
//   cursor: pointer;
//   width: 16px;
//   height: 16px;
// }

// .page__body-tabs {
//   display: flex;
//   gap: 0;
//   padding: 0 16px;
//   margin-bottom: 24px;
//   border-bottom: 1px solid $gray-100;
// }

// .page__body-tab {
//   background: none;
//   border: none;
//   font-family: 'SF Pro', Arial, sans-serif;
//   font-size: 16px;
//   font-weight: 500;
//   color: $gray-400;
//   padding: 12px 16px;
//   border-bottom: 2px solid transparent;
//   cursor: pointer;
//   transition: all 0.2s;

//   &:hover {
//     color: $gray-600;
//   }

//   &--active {
//     color: $gray-900;
//     border-bottom-color: $color-primary;
//   }
// }

// .page__body-analytics {
//   margin-top: 32px;
// }

// .page__body-analytics-title {
//   font-family: 'SF Pro Rounded', Arial, sans-serif;
//   font-size: 24px;
//   font-weight: 600;
//   color: #181818;
//   margin-bottom: 16px;
//   padding: 0 16px;
// }

// .page__body-analytics-content {
//   padding: 0 16px;
// }

// .analytics-placeholder {
//   background: $gray-50;
//   border-radius: 16px;
//   padding: 32px;
//   text-align: center;
//   color: $gray-600;
//   font-size: 16px;
// }

// .page__body-analytics-empty {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 32px 16px;
//   margin-top: 32px;
// }

// .page__body-analytics-empty-button {
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }

// .page__body-analytics-empty-button-icon {
//   width: 20px;
//   height: 20px;
// }

// .page__body-analytics-empty-button-label {
//   font-size: 16px;
//   font-weight: 500;
// }</style>