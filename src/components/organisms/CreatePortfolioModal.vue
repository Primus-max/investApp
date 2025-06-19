<template>
  <div v-if="modalVisible" class="create-portfolio-modal">
    <div class="create-portfolio-modal__backdrop" @click="close"></div>
    <div class="create-portfolio-modal__content">
      <div class="create-portfolio-modal__title">Создание портфеля</div>
      <div class="create-portfolio-modal__form">
        <label class="create-portfolio-modal__label">Название портфеля</label>
        <input v-model="name" class="create-portfolio-modal__input" placeholder="Портфель №3" />

        <label class="create-portfolio-modal__label">Валюта</label>
        <SelectGroupMolecule v-model="currency" :options="currencyOptions" />

        <label class="create-portfolio-modal__label">Тип портфеля</label>
        <SelectGroupMolecule v-model="type" :options="typeOptions" />

        <label class="create-portfolio-modal__label">Брокер</label>
        <input v-model="broker" class="create-portfolio-modal__input" placeholder="Сбербанк – отчет брокера" />

        <label class="create-portfolio-modal__label">Отчет</label>
        <button class="create-portfolio-modal__file">Добавить файл</button>
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

import SelectGroupMolecule from '../molecules/SelectGroupMolecule.vue';

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

const currencyOptions = [
  { label: 'Рубль', value: 'rub', icon: '/src/assets/icons/coins/rub.svg' },
  { label: 'Доллар', value: 'usd', icon: '/src/assets/icons/coins/bitcoin.svg' },
  { label: 'Евро', value: 'eur', icon: '/src/assets/icons/coins/ethereum.svg' },
];
const typeOptions = [
  { label: 'Ручной', value: 'manual' },
  { label: 'Интеграция', value: 'integration' },
];
function submit() {
  emit('submit', { name: name.value, currency: currency.value, type: type.value, broker: broker.value });
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
    border-radius: $radius-xl $radius-xl 0 0;
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
    font-size: $font-size-h2;
    font-weight: $font-weight-bold;
    color: $gray-900;
    text-align: center;
    margin-bottom: $space-m;
    margin-top: 0;
    font-family: $font-main;
  }

  &__form {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: $space-s;
    margin-bottom: $space-l;
  }

  &__label {
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    color: $gray-900;
    margin-bottom: 4px;
    font-family: $font-main;
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
}
</style> 