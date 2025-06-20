<template>
  <BaseModal :visible="modelValue" @update:visible="closeModal">
    <div class="date-range-modal">
      <div class="date-range-modal__header">
        <div class="date-range-modal__title">Выберите период</div>
        <button class="date-range-modal__close" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#9DA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="#9DA4AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="date-range-modal__weekdays">
        <span v-for="day in weekdays" :key="day">{{ day }}</span>
      </div>
      <div class="date-range-modal__calendar-container">
        <VDatePicker
          v-model.range="rangeValue"
          :rows="12"
          :columns="1"
          :step="1"
          locale="ru"
          :first-day-of-week="2"
          :masks="{ weekdays: 'WW', title: 'MMMM' }"
          class="date-range-modal__calendar"
          borderless="false"
          title-position="left"
          :header-props="{
            next: false,
            prev: false,
          }"
        >
          <template #header-title="{ title, page }">
            <SelectOptionAtom :selected="true" style="background-color: #F1F2F4;">
              {{ title.charAt(0).toUpperCase() + title.slice(1) }}
            </SelectOptionAtom>
          </template>
        </VDatePicker>
      </div>
      <div class="date-range-modal__footer">
        <button class="date-range-modal__apply" :disabled="!rangeValue || !rangeValue.start || !rangeValue.end" @click="applyRange">Применить</button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import {
  ref,
  watch,
} from 'vue';

import SelectOptionAtom from '@/components/atoms/SelectOptionAtom.vue';
import BaseModal from '@/components/molecules/BaseModal.vue';

const props = defineProps({
  modelValue: Boolean,
  range: { type: Object, default: () => ({ start: null, end: null }) },
});

const emit = defineEmits(['update:modelValue', 'update:range', 'apply']);

const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const rangeValue = ref({ ...props.range });

watch(() => props.range, v => {
  rangeValue.value = { ...v };
}, { deep: true, immediate: true });

function isMonthInRange(page) {
  if (!page || !rangeValue.value || !rangeValue.value.start || !rangeValue.value.end) {
    return false;
  }

  const selectionStart = new Date(rangeValue.value.start).getTime();
  const selectionEnd = new Date(rangeValue.value.end).getTime();

  const monthStart = new Date(page.year, page.month - 1, 1).getTime();
  const monthEnd = new Date(page.year, page.month, 1).getTime() - 1;

  return selectionStart <= monthEnd && selectionEnd >= monthStart;
}

function applyRange() {
  emit('update:range', { ...rangeValue.value });
  emit('apply', { ...rangeValue.value });
  emit('update:modelValue', false);
}

function closeModal() {
  emit('update:modelValue', false);
}
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.date-range-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $gray-0;  
  overflow: hidden;
}

.date-range-modal__header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px $space-m 0;
  position: relative;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.date-range-modal__title {
  font-family: $font-main;
  font-weight: $font-weight-semibold;
  font-size: 22px;
  line-height: 28px;
  color: $gray-900;
}

.date-range-modal__close {
  position: absolute;
  right: $space-m;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 12px; // to align with title padding
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date-range-modal__weekdays {
  display: flex;
  justify-content: space-around;
  padding: 0 calc(#{$space-m} + 8px);
  margin-bottom: 8px;
  flex-shrink: 0;

  span {
    font-family: $font-main;
    font-weight: $font-weight-medium;
    font-size: 13px;
    color: $gray-400;
    text-transform: uppercase;
    width: 36px;
    text-align: center;
  }
}

.date-range-modal__calendar-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 $space-m;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.date-range-modal__calendar {
  width: 100%;
  border: none;
  --vc-nav-visibility: hidden;
  --vc-weekdays-display: none;

  :deep(.vc-header) {
    padding: 0;
    margin-bottom: 16px;
  }

  :deep(.vc-title) {
    font-family: $font-main;
    font-weight: $font-weight-semibold;
    font-size: 20px;
    line-height: 24px;
    color: $gray-900;
    padding: 0;
    margin: 0;
  }

  :deep(.vc-arrow) {
    display: none;
  }
  
  :deep(.vc-pane) {
    margin-bottom: 16px;
  }


  :deep(.vc-weekday) {
    font-family: $font-main;
    font-weight: $font-weight-medium;
    font-size: 13px;
    color: $gray-400;
    padding-bottom: 12px;
    text-transform: uppercase;
  }

  :deep(.vc-day) {
    padding: 0;
    margin: 2px 0;
  }

  :deep(.vc-day-content) {
    font-family: $font-main;
    font-weight: $font-weight-medium;
    font-size: 16px;
    line-height: 22px;
    color: $gray-900;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    
    &:not(.is-disabled):hover {
      background-color: rgba($primary-500, 0.1);
    }
  }

  :deep(.is-disabled) {
    color: $gray-300;
  }
  
  :deep(.vc-highlight) {
    background-color: $primary-500;
    color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 50% !important;
  }

  :deep(.vc-highlight-base-start),
  :deep(.vc-highlight-base-end) {
    border-radius: 50%;
  }

  :deep(.vc-highlight-bg-light) {
    background-color: rgba($primary-500, 0.1);
  }
  
  :deep(.vc-day.in-range:not(.is-start):not(.is-end) .vc-highlight-bg-light) {
     border-radius: 0;
     width: 100%;
  }

  :deep(.vc-day.is-start .vc-highlight-bg-light) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    width: calc(50% + 18px);
    margin-left: calc(50% - 18px);
  }

  :deep(.vc-day.is-end .vc-highlight-bg-light) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    width: calc(50% + 18px);
  }
  
  :deep(.vc-pane-container) {
    width: 100%;
  }

  :deep(.vc-bordered) {
    border: none !important;
    width: 100% !important;
  }
}

.date-range-modal__footer {
  padding: $space-m;
  padding-top: 12px;
  background-color: $gray-0;
  box-shadow: 0 -4px 12px rgba($gray-900, 0.05);
  flex-shrink: 0;
}

.date-range-modal__apply {
  width: 100%;
  background: $primary-500;
  color: #fff;
  border: none;
  border-radius: $radius-lg;
  font-family: $font-main;
  font-size: 18px;
  font-weight: $font-weight-semibold;
  padding: 14px 0;
  cursor: pointer;
  transition: background 0.2s;
  
  &:disabled {
    background: $gray-200;
    color: $gray-400;
    cursor: not-allowed;
  }
  
  &:not(:disabled):hover {
    background: $primary-600;
  }
}

:deep(.vc-container, .vc-container) {    
    width: 100% !important;
  }

  :deep(.vc-weeks) {
    padding: 0;
  }

  :deep(.vc-weekdays) {
    display: none;
  }

  :deep(.vc-header) {
    padding: 0;
    margin-bottom: 14px;    
  }
</style> 