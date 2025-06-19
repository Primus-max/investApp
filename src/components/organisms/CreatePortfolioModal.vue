<template>
  <div v-if="modalVisible" class="create-portfolio-modal">
    <div class="create-portfolio-modal__backdrop" @click="close"></div>
    <div class="create-portfolio-modal__content">
      <div class="create-portfolio-modal__title">Создание портфеля</div>
      <div class="create-portfolio-modal__form">
        <label class="create-portfolio-modal__label">Название портфеля</label>
        <AppInput v-model="name" placeholder="Портфель №3" />

        <label class="create-portfolio-modal__label">Валюта</label>
        <SelectGroupMolecule v-model="currency" :options="currencyOptions" />

        <label class="create-portfolio-modal__label">Тип портфеля</label>
        <SelectGroupMolecule v-model="type" :options="typeOptions" />
        
        <div v-if="type === 'integration'" class="create-portfolio-modal__integration-fields">
          <label class="create-portfolio-modal__label">Брокер</label>
          <SortDropdown v-model="broker" :options="brokerOptions"  class="create-portfolio-modal__dropdown">
            <template #default>            
              <span>{{ brokerOptions.find(b => b.value === broker)?.label || 'Выберите брокера' }}</span>
              <IconArrowBottom style="margin-left:auto;" />
            </template>
          </SortDropdown>

          <label class="create-portfolio-modal__label">Токен портфеля (API)</label>
          <AppInput v-model="token" placeholder="Введите токен" />

          <label class="create-portfolio-modal__label">Отчет</label>
          <button class="create-portfolio-modal__file" @click="openFileDialog">{{ selectedFile ? selectedFile.name : 'Добавить файл' }}</button>
          <input ref="fileInput" type="file" class="create-portfolio-modal__file-input" @change="onFileChange" style="display:none" />
        </div>
      </div>
      <button class="create-portfolio-modal__submit" @click="submit">Создать портфель</button>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

import euroFlag from '@/assets/icons/flags/euro.svg';
import ruFlag from '@/assets/icons/flags/ru.svg';
import usFlag from '@/assets/icons/flags/us.svg';

import AppInput from '../atoms/AppInput.vue';
import IconArrowBottom from '../atoms/icons/IconArrowBottom.vue';
import SelectGroupMolecule from '../molecules/SelectGroupMolecule.vue';
import SortDropdown from '../molecules/SortDropdown.vue';

const props = defineProps({
  modelValue: Boolean
});
const emit = defineEmits(['update:modelValue', 'submit']);
const modalVisible = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
});
function close() { modalVisible.value = false; }

const name = ref('');
const currency = ref('rub');
const type = ref('manual');
const broker = ref('');
const token = ref('');

const currencyOptions = [
  { label: 'Рубль', value: 'rub', icon: ruFlag },
  { label: 'Доллар', value: 'usd', icon: usFlag },
  { label: 'Евро', value: 'eur', icon: euroFlag },
];
const typeOptions = [
  { label: 'Ручной', value: 'manual' },
  { label: 'Интеграция', value: 'integration' },
];
const brokerOptions = [
  { label: 'Т Банк – отчет брокера', value: 'tbank' },
  { label: 'Сбербанк – отчет брокера', value: 'sber' },
  { label: 'ВТБ – отчет брокера', value: 'vtb' },
  { label: 'Тинькофф – отчет брокера', value: 'tinkoff' },
  { label: 'Открытие – отчет брокера', value: 'open' },
];

const fileInput = ref(null);
const selectedFile = ref(null);
function openFileDialog() {
  fileInput.value && fileInput.value.click();
}
function onFileChange(e) {
  selectedFile.value = e.target.files[0] || null;
}

function submit() {
  emit('submit', { name: name.value, currency: currency.value, type: type.value, broker: broker.value, token: token.value });
  close();
}
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';
.create-portfolio-modal {
  position: fixed;
  inset: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba($gray-900, 0.32);
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    background: $gray-50;
    box-shadow: 0 8px 32px rgba($gray-900, 0.18);
    padding: $space-xl $space-m $space-l $space-m;
    min-width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow-y: auto;
  }

  &__title {
    font-size: 32px;
    line-height: 40px;
    font-family: $font-main;
    font-weight: $font-weight-bold;
    color: $gray-950;
    text-align: left;
    margin-bottom: $space-m;
    margin-top: 0;
    width: 100%;
    padding: 0;
    display: block;
  }

  &__form {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: $space-s;
    margin-bottom: $space-l;
  }

  &__label {
    font-size: 18px;
    line-height: 24px;
    font-family: $font-main;
    font-weight: $font-weight-semibold;
    color: $gray-950;
    align-self: stretch;
    margin-bottom: 4px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  &__input {
    border: 2px solid $gray-100;
    border-radius: $radius-md;
    padding: $space-s $space-m;
    font-size: $font-size-body;
    margin-bottom: $space-xs;
    font-family: $font-main;
  }

  &__file {
    border: 2px dashed $primary-400;
    border-radius: $radius-md;
    background: $gray-50;
    color: $primary-400;
    font-size: $font-size-body;
    padding: $space-s 0;
    margin-bottom: $space-xs;
    cursor: pointer;
    font-family: $font-main;
    width: 100%;
    text-align: center;
    transition: border-color 0.2s;
    &:hover {
      border-color: $primary-500;
      color: $primary-500;
    }
  }

  &__file-input {
    display: none;
  }

  &__submit {
    width: 100%;
    background: $primary-400;
    color: $gray-0;
    border: none;
    border-radius: $radius-lg;
    font-size: $font-size-h3;
    font-weight: $font-weight-semibold;
    padding: $space-m 0;
    margin-top: auto;
    margin-bottom: $space-s;
    cursor: pointer;
    transition: background 0.2s;
    font-family: $font-main;

    &:enabled:hover {
      background: $primary-500;
    }
  }

  &__dropdown {
    margin-bottom: $space-xs;
    width: 100%;

    ::v-deep(.sort-dropdown__trigger) {
      width: 100%;
      min-height: 48px;
      padding: 0 $space-m;
      background: $gray-0;
      border-radius: $radius-lg;
      box-shadow: 0 4px 20px rgba($gray-900, 0.04);
      font-size: $font-size-body;
      font-family: $font-main;
      font-weight: $font-weight-semibold;
      color: $gray-900;
      display: flex;
      align-items: center;
    }
    ::v-deep(.sort-dropdown__menu) {
      width: 100%;
      border-radius: $radius-lg;
      box-shadow: 0 2px 8px rgba($gray-900, 0.10);
      background: $gray-0;
    }
    // ::v-deep(.sort-dropdown__menu-item) {
    //   font-size: $font-size-body;
    //   color: $gray-700;
    //   padding: 8px 16px;
    //   border-radius: $radius-md;
    //   font-family: $font-main;
    // }
    // ::v-deep(.sort-dropdown__menu-item:hover) {
    //   background: $gray-100;
    //   color: $primary-500;
    // }
    // ::v-deep(.sort-dropdown__menu-item--active) {
    //   color: $primary-500;
    //   font-weight: $font-weight-semibold;
    //   background: $gray-50;
    // }
  }

  &__integration-fields {
    display: flex;
    flex-direction: column;
    gap: $space-s;
  }
}
</style> 