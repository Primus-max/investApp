<template>
  <div v-if="modalVisible" class="date-range-modal-fullscreen">
    <div class="date-range-modal-fullscreen__backdrop" @click="modalVisible = false"></div>
    <div class="date-range-modal-fullscreen__content">
      <div class="date-range-modal__title">Выберите период</div>
      <VDatePicker
        v-model="rangeValue"
        is-range
        :first-day-of-week="1"
        :panes="6"
        :show-months="6"
        :show-caps="false"
        :title-position="'left'"
        :show-title="false"
        class="date-range-modal__calendar"
      />
      <button class="date-range-modal__apply" :disabled="!rangeValue.start || !rangeValue.end" @click="applyRange">Применить</button>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  watch,
} from 'vue';

const props = defineProps({
  modelValue: Boolean,
  range: { type: Object, default: () => ({ start: null, end: null }) },
});
const emit = defineEmits(['update:modelValue', 'update:range', 'apply']);
const modalVisible = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
});
const rangeValue = ref({ ...props.range });
watch(() => props.range, v => { rangeValue.value = { ...v }; });
function applyRange() {
  emit('update:range', { ...rangeValue.value });
  emit('apply', { ...rangeValue.value });
  modalVisible.value = false;
}
</script>

<style scoped lang="scss">
.date-range-modal-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.date-range-modal-fullscreen__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(34, 34, 34, 0.32);
  z-index: 1;
}
.date-range-modal-fullscreen__content {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 32px 20px 28px 20px;
  min-width: 340px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: auto;
}
.date-range-modal__title {
  font-size: 22px;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 18px;
  margin-top: 0;
}
.date-range-modal__calendar {
  border-radius: 16px;
  background: #fff;
  box-shadow: none;
  margin-bottom: 24px;
}
.date-range-modal__apply {
  width: 100%;
  background: #4868EA;
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  padding: 14px 0;
  margin-top: 12px;
  cursor: pointer;
  transition: background 0.2s;
}
.date-range-modal__apply:disabled {
  background: #e0e0e0;
  color: #aaa;
  cursor: not-allowed;
}
.date-range-modal__apply:enabled:hover {
  background: #1B43E5;
}
</style> 