<template>
    <MainLayout>
        <template #header>
            <section class="page__header">
                <button class="page__back" @click="goBack">
                    <IconArrowLeft class="page__back-icon" :color="showStickyHeader ? '#4868EA' : '#fff'" />
                    <span class="page__back-text">Back</span>
                </button>
                <div class="page__header-stats-row">
                    <div class="page__header-stats-main">
                        <div class="page__header-stats-info"
                            :class="{ 'page__header-stats-info--not-investment-goal': isNotInvestmentGoal }">
                            <div class="page__header-stats-title">{{ portfolio?.name || 'Консервативный' }}</div>
                            <div v-if="!isNotInvestmentGoal">
                                <div class="page__header-goal-title">
                                    <input v-if="isEditingGoal" v-model="editedGoal" @blur="saveGoalEdit"
                                        @keyup.enter="saveGoalEdit" @keyup.escape="cancelGoalEdit"
                                        class="page__header-edit-input" ref="goalInput" />
                                    <span v-else>{{ investmentGoal }}</span>
                                    <Edit01 :color="'#fff'" class="page__header-edit" @click="startGoalEdit" />
                                </div>
                                <div class="page__header-stats-value-row">
                                    <span class="page__header-stats-value">5 000 000</span>
                                    <span class="page__header-stats-currency">₽</span>
                                    <span class="page__header-stats-currency">за 5 лет</span>
                                </div>
                            </div>
                            <button v-else class="investment-goal-button" @click="handleCreateGoal">
                                <IconTarget class="investment-goal-button__icon" />
                                <span class="investment-goal-button__text">Создать цель инвестирования</span>
                            </button>
                        </div>
                    </div>
                    <div v-if="!isNotInvestmentGoal">
                        <div class="page__header-progress">
                            <ProgressBar :progress="goalProgress" size="medium" color="primary" />
                        </div>
                        <div class="page__header-badge-row">
                            <span class="page__header-badge-current-amount">{{ currentAmount }} / {{ targetAmount
                            }}</span>
                            <span class="page__header-badge-period">до {{ goalDeadline }}</span>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <section class="page__body" :class="{ 'page__body--sticky': showStickyHeader }">
            <div class="page__body-tabs" ref="tabsRef">
                <span class="page__body-tabs-left-margin"></span>
                <AppPillButton v-for="(tab, index) in tabs" :key="tab.name"
                    :class="['page__body-tab', { 'page__body-tab--active': activeTab === index }]"
                    @click="activeTab = index">
                    {{ tab.name }}
                </AppPillButton>
                <span class="page__body-tabs-right-margin"></span>
            </div>
            <!-- Контент вкладок -->
            <div class="page__body-content">
                <HistoryMetricsTab v-if="activeTab === 0" :portfolio-data="portfolio" />
                <div v-else-if="activeTab === 1" class="tab-structure">
                    <div class="tab-structure__chart-block">
                        <PieChartAtom :sectors="portfolioStructure" :size="160" :stroke-width="22" />
                        <div class="tab-structure__legend">
                            <div v-for="item in portfolioStructure" :key="item.label" class="tab-structure__legend-item">
                                <span class="tab-structure__legend-color" :style="{ background: item.color }"></span>
                                <span class="tab-structure__legend-label">{{ item.label }}</span>
                                <span class="tab-structure__legend-percent">{{ item.percent }}%</span>
                            </div>
                        </div>
                    </div>
                    <div class="tab-structure__assets-list">
                        <PortfolioAssetCard
                            v-for="item in portfolioStructure"
                            :key="item.label"
                            :asset="{ name: item.label, amount: item.value, percent: item.percent, color: item.color }"
                        />
                    </div>
                </div>
                <div v-else-if="activeTab === 2" class="tab-placeholder">
                    <h3>Ближайшие выплаты</h3>
                    <p>Содержимое вкладки "Ближайшие выплаты" будет добавлено позже</p>
                </div>
            </div>
            <div v-if="showStickyHeader" class="page__sticky-header-fake">
                <button class="page__back" @click="goBack">
                    <IconArrowLeft class="page__back-icon" :color="'#4868EA'" />
                    <span class="page__back-text">Back</span>
                </button>
                <div class="page__body-tabs">
                    <span class="page__body-tabs-left-margin"></span>
                    <AppPillButton v-for="(tab, index) in tabs" :key="tab.name"
                        :class="['page__body-tab', { 'page__body-tab--active': activeTab === index }]"
                        @click="activeTab = index">
                        {{ tab.name }}
                    </AppPillButton>
                    <span class="page__body-tabs-right-margin"></span>
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<script setup>
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
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
import IconTarget from '@/components/atoms/icons/IconTarget.vue';
import PieChartAtom from '@/components/atoms/PieChartAtom.vue';
import PlusButtonAtom from '@/components/atoms/PlusButtonAtom.vue';
import ProgressBar from '@/components/atoms/ProgressBar.vue';
import PortfolioAssetCard from '@/components/molecules/PortfolioAssetCard.vue';
import StatWidgetCard
  from '@/components/molecules/stat-widgets/StatWidgetCard.vue';
import HistoryMetricsTab from '@/components/organisms/HistoryMetricsTab.vue';
import MainLayout from '@/layout/MainLayout.vue';
import { usePortfoliosStore } from '@/stores/portfolios.js';

const router = useRouter();
const route = useRoute();
const store = usePortfoliosStore();

const portfolio = ref(null);
const isLoading = ref(true);
const isNotData = ref(false);
const editMode = ref(false);
const isEditingGoal = ref(false);
const editedGoal = ref('');
const goalInput = ref(null);
const investmentGoal = ref('Цель инвестирования');
const isNotInvestmentGoal = ref(false);

const showStickyHeader = ref(false);
const tabsRef = ref(null);
const stickyHeaderRef = ref(null);

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

    const observer = new window.IntersectionObserver(
        ([entry]) => {
            showStickyHeader.value = entry.intersectionRatio === 0;
        },
        { root: null, threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );
    if (tabsRef.value) {
        observer.observe(tabsRef.value);
    }
    stickyHeaderRef.value = observer;
});

onUnmounted(() => {
    if (stickyHeaderRef.value && tabsRef.value) {
        stickyHeaderRef.value.disconnect();
    }
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
    { name: 'Ближайшие выплаты' }
]);

// Моковые данные для структуры портфеля
const portfolioStructure = ref([
  { label: 'Акции', value: 2500000, percent: 50, color: '#2A7CFF' },
  { label: 'Облигации', value: 1500000, percent: 30, color: '#00C48C' },
  { label: 'Валюта', value: 700000, percent: 14, color: '#FFD600' },
  { label: 'Фонды', value: 200000, percent: 4, color: '#FF4D4F' },
  { label: 'Другое', value: 100000, percent: 2, color: '#8D94A5' },
]);

function goBack() {
    router.back();
}

function startGoalEdit() {
    editedGoal.value = investmentGoal.value;
    isEditingGoal.value = true;
    // Фокус на input после следующего тика
    nextTick(() => {
        if (goalInput.value) {
            goalInput.value.focus();
            goalInput.value.select();
        }
    });
}

function saveGoalEdit() {
    if (!editedGoal.value.trim()) {
        cancelGoalEdit();
        return;
    }
    investmentGoal.value = editedGoal.value.trim();
    isEditingGoal.value = false;
}

function cancelGoalEdit() {
    isEditingGoal.value = false;
    editedGoal.value = '';
}

function handleCreateGoal() {
    console.log('Создание цели инвестирования...');
}

</script>

<style scoped lang="scss">
@import '@/styles/_sections.scss';
@import '@/styles/_variables.scss';

/* Кнопка создания цели инвестирования */
.investment-goal-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    gap: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    border: none;
    cursor: pointer;
    flex: none;
    order: 1;
    flex-grow: 0;
    z-index: 1;

    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    &__icon {
        width: 20px;
        height: 20px;

        flex: none;
        order: 0;
        flex-grow: 0;
    }

    &__text {
        font-family: 'SF Pro Rounded', $font-main;
        font-style: normal;
        font-weight: $font-weight-medium;
        font-size: $font-size-small;
        line-height: $line-height-body;
        color: $gray-0;
    }
}

:deep(.main-layout__body) {
    overflow: hidden;
}

.page {
    &__header {
        &-stats-title {
            font-size: 16px;
            font-weight: $font-weight-medium;
            color: $gray-0;
            line-height: 22px;
            opacity: 0.6;
        }

        &-stats-row {          
            gap: 20px;            
        }

        &-stats-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
        }

        &-goal-title {
            font-size: 20px;
            font-weight: $font-weight-medium;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        &-edit {
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            width: 16px;
            height: 16px;
        }

        &-badge-current-amount {
            font-size: 16px;
            font-weight: $font-weight-medium;
            color: $gray-0;
            line-height: 22px;
        }

        &-badge-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        &-stats-info--not-investment-goal {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
    }

    &__body {
        &-header {
            margin-top: 0;
        }

        &-tabs {
            width: 120% !important;

            display: flex;
            flex-direction: row;
            gap: $space-m;
            padding: 0 $space-m;
            margin-bottom: $space-l;
            margin-top: 16px;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;


            &::-webkit-scrollbar {
                display: none;
            }
        }

        &-tab {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 12px 16px;
            gap: 6px;
            width: auto;
            background: $gray-100 !important;
            border-radius: $radius-lg !important;
            flex: none;
            flex-grow: 0;

            font-family: $font-main !important;
            font-style: normal;
            font-weight: $font-weight-semibold !important;
            font-size: $font-size-body !important;
            line-height: 22px !important;
            color: $gray-700 !important;
            border: none !important;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: none !important;

            &--active {
                background: $gray-0 !important;
                box-shadow: $shadow-main !important;
            }

            &:hover {
                background: lighten($gray-100, 2%) !important;
            }

            &--active:hover {
                background: $gray-0 !important;
            }

            // Сброс стилей для deep селекторов
            :deep(*) {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
            }

            &-header-title {
                font-size: 22px;
            }
        }

        &-content {
            margin-top: $space-l;
            width: 100%;
        }

        &--sticky {
            .page__body-tabs {
                margin-top: 12 !important;
                padding-bottom: 12 !important;
            }
        }
    }
}

.tab-placeholder {
    text-align: center;
    padding: $space-xl;
    background: $gray-50;
    border-radius: $radius-lg;

    h3 {
        font-size: $font-size-h3;
        font-weight: $font-weight-semibold;
        color: $gray-700;
        margin-bottom: $space-s;
    }

    p {
        font-size: $font-size-body;
        color: $gray-500;
        margin: 0;
    }
}

.page__header-edit-input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    color: #fff;
    font-family: $font-main;
    font-size: 20px;
    font-weight: $font-weight-medium;
    padding: 4px 8px;
    outline: none;

    &:focus {
        border-color: rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.15);
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.6);
    }
}

/* Добавляю sticky для header табов и back */
.page__body-sticky-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: $color-bg-main;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-top: $space-m;
    padding-bottom: 0;   
}

.page__sticky-header-fake {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: $color-bg-main;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding-top: $space-m;
    padding-bottom: 0;
    padding-top: 4px !important;
}

.page__body--sticky {
  .page__back,
  .page__back-icon {
    color: $primary-400 !important;
    fill: $primary-400 !important;
  }
  .page__back-icon {
    :deep(svg) {
      color: $primary-400 !important;
      fill: $primary-400 !important;
      stroke: $primary-400 !important;
    }
  }
}

.tab-structure {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-l;
  &__chart-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-m;
  }
  &__legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
    width: 100%;
    max-width: 220px;
  }
  &__legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    color: $gray-700;
  }
  &__legend-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-block;
  }
  &__legend-label {
    flex: 1;
  }
  &__legend-percent {
    font-weight: $font-weight-semibold;
    color: $gray-900;
  }
  &__assets-list {
    width: 100%;
    max-width: 340px;
    display: flex;
    flex-direction: column;
    gap: $space-s;
  }
}
</style>