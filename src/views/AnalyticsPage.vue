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
                    <h2 class="tab-structure__title">Структура</h2>
                    <PortfolioStructureCard :categories="portfolioStructure" total="2 345 461 ₽" :assets-count="8" />
                    <div class="tab-structure__assets-header-row">
                        <span class="tab-structure__title" style="margin-bottom: 0px;">Активы</span>
                        <SortDropdown :options="sortOptions" v-model="selectedSortValue" />
                    </div>
                    <div class="tab-structure__card tab-structure__card--assets">

                        <div class="tab-structure__assets-list">
                            <PortfolioAssetCard v-for="item in assetList" :key="item.bank + item.amount"
                                :asset="item" />
                        </div>
                        <AppButton type="white" size="medium">Подробнее</AppButton>
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
import VueApexCharts from 'vue3-apexcharts';

import AppBanner from '@/components/atoms/AppBanner.vue';
import AppButton from '@/components/atoms/AppButton.vue';
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
import SortDropdown from '@/components/molecules/SortDropdown.vue';
import StatWidgetCard
  from '@/components/molecules/stat-widgets/StatWidgetCard.vue';
import HistoryMetricsTab from '@/components/organisms/HistoryMetricsTab.vue';
import PortfolioStructureCard
  from '@/components/organisms/PortfolioStructureCard.vue';
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

const sortOptions = [
  { label: 'Рост ↑', value: 'growth-up' },
  { label: 'Рост ↓', value: 'growth-down' },
  { label: 'Доход', value: 'profit-up' },
  { label: 'Доход ↓', value: 'profit-down' },
];
const selectedSortValue = ref(sortOptions[1].value);

// Табы для аналитики
const activeTab = ref(0);
const tabs = ref([
    { name: 'История и метрики' },
    { name: 'Структура' },
    { name: 'Ближайшие выплаты' }
]);

// Моковые данные для структуры портфеля (для chart и прогрессбаров)
const portfolioStructure = ref([
  { label: 'Сбербанк', value: 2500000, percent: 50, color: '#0091FF', logo: 'sber' },
  { label: 'Точка', value: 1500000, percent: 30, color: '#11A772', logo: 'tochka' },
  { label: 'Модульбанк', value: 700000, percent: 14, color: '#FF801F', logo: 'modul' },
  { label: 'Совкомбанк', value: 200000, percent: 4, color: '#BE63FF', logo: 'sovkom' },
]);

// Моковые данные для списка активов
const assetList = ref([
  { bank: 'Сбербанк', count: 10, price: 302.41, amount: 2500000, percent: 12, profit: 40471, logo: 'sber' },
  { bank: 'Точка', count: 10, price: 481.33, amount: 1500000, percent: -12, profit: -150471, logo: 'tochka' },
  { bank: 'Модульбанк', count: 10, price: 802.88, amount: 5800000, percent: 68, profit: 540471, logo: 'modul' },
  { bank: 'Совкомбанк', count: 10, price: 102.41, amount: 1702066, percent: -10, profit: -150471, logo: 'sovkom' },
  { bank: 'Сбербанк', count: 10, price: 302.41, amount: 1306000, percent: 24, profit: 1940471, logo: 'sber' },
  { bank: 'Точка', count: 10, price: 481.33, amount: 2482066, percent: 12, profit: 120471, logo: 'tochka' },
  { bank: 'Модульбанк', count: 10, price: 802.88, amount: 5800000, percent: 68, profit: 540471, logo: 'modul' },
  { bank: 'Совкомбанк', count: 10, price: 102.88, amount: 1702066, percent: -10, profit: -150471, logo: 'sovkom' },
]);

const apexSeries = ref([2500000, 1500000, 700000, 200000, 100000]);
const apexLabels = ['Акции', 'Облигации', 'Валюта', 'Фонды', 'Другое'];
const apexColors = ['#2A7CFF', '#00C48C', '#FFD600', '#FF4D4F', '#8D94A5'];
const chartOptions = ref({
    chart: {
        type: 'donut',
        background: 'transparent',
    },
    labels: apexLabels,
    colors: apexColors,
    stroke: {
        width: 6,
        colors: ['#fff']
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    plotOptions: {
        pie: {
            donut: {
                size: '75%',
                labels: {
                    show: false
                }
            }
        }
    }
});

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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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

    &__title {
        font-size: $font-size-h2;
        font-weight: $font-weight-semibold;
        color: $gray-900;
        margin-bottom: $space-m;
        align-self: flex-start;
        margin-left: 8px;
    }

    &__card {
        background: $gray-0;
        border-radius: $radius-xl;
        box-shadow: 0 2px 16px rgba(44, 62, 80, 0.06);
        padding: $space-l $space-m;
        width: 100%;
        max-width: 380px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $space-l;

        &--structure {
            margin-bottom: $space-l;
        }

        &--assets {
            margin-top: 0;
        }
    }

    &__chart-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $space-m;
        width: 100%;
    }

    &__chart-center {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 180px;
        height: 180px;
    }

    &__chart-center-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        pointer-events: none;
    }

    &__chart-sum {
        font-size: 22px;
        font-weight: $font-weight-semibold;
        color: $gray-900;
        line-height: 1.1;
    }

    &__chart-assets {
        font-size: $font-size-small;
        color: $gray-500;
        margin-top: 2px;
    }

    &__tabs-row {
        display: flex;
        flex-direction: row;
        gap: 8px;
        margin: 16px 0 8px 0;
        width: 100%;
        justify-content: flex-start;
    }

    &__tab {
        font-size: $font-size-body;
        font-weight: $font-weight-medium;
        border-radius: 16px;
        padding: 6px 16px;
        background: $gray-50;
        color: $gray-500;

        &--active {
            background: $primary-50;
            color: $primary-400;
        }
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

    &__assets-header-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;        
    }

    &__assets-title {
        font-size: $font-size-h3;
        font-weight: $font-weight-semibold;
        color: $gray-900;
    }

    &__assets-sort {
        font-size: $font-size-small;
        font-weight: $font-weight-medium;
        background: $gray-0;
        color: $gray-500;
        border-radius: $radius-md;
        padding: 8px 12px;
        width: 82px;               
    }

    &__assets-list {
        width: 100%;
        max-width: 340px;
        display: flex;
        flex-direction: column;
        gap: $space-s;
    }

    &__assets-more {
        margin: 16px auto 0 auto;
        display: block;
        background: $primary-50;
        color: $primary-400;
        border: none;
        border-radius: 16px;
        padding: 8px 24px;
        font-size: $font-size-body;
        font-weight: $font-weight-semibold;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
            background: $primary-100;
        }
    }
}
</style>