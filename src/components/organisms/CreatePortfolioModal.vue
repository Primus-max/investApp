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
}
.create-portfolio-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(34, 34, 34, 0.32);
  z-index: 1;
}
.create-portfolio-modal__content {
  position: relative;
  z-index: 2;
  background: $gray-50;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 32px 20px 28px 20px;
  min-width: 100vw;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: auto;
}
.create-portfolio-modal__title {
  font-size: 22px;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 18px;
  margin-top: 0;
}
.create-portfolio-modal__form {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.create-portfolio-modal__label {
  font-size: 16px;
  font-weight: 500;
  color: #222;
  margin-bottom: 4px;
}
.create-portfolio-modal__input {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 16px;
  margin-bottom: 8px;
}
.create-portfolio-modal__file {
  border: 2px dashed #4868EA;
  border-radius: 12px;
  background: #f7f8fa;
  color: #4868EA;
  font-size: 16px;
  padding: 12px 0;
  margin-bottom: 8px;
  cursor: pointer;
}
.create-portfolio-modal__submit {
  width: 100%;
  background: #4868EA;
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  padding: 14px 0;
  margin-top: auto;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background 0.2s;
}
.create-portfolio-modal__submit:enabled:hover {
  background: #1B43E5;
}
</style> 