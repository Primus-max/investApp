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

        <section class="page__body">
            <div class="page__body-tabs">
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
                <div v-else-if="activeTab === 1" class="tab-placeholder">
                    <h3>Структура портфеля</h3>
                    <p>Содержимое вкладки "Структура" будет добавлено позже</p>
                </div>
                <div v-else-if="activeTab === 2" class="tab-placeholder">
                    <h3>Ближайшие выплаты</h3>
                    <p>Содержимое вкладки "Ближайшие выплаты" будет добавлено позже</p>
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
import PlusButtonAtom from '@/components/atoms/PlusButtonAtom.vue';
import ProgressBar from '@/components/atoms/ProgressBar.vue';
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
    { name: 'Ближайшие выплаты' }
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