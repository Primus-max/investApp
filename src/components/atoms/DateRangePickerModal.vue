<template>
  <v-dialog v-model="modalVisible" max-width="360" persistent>
    <div class="date-range-modal">
      <div class="date-range-modal__title">Выберите период</div>
      <v-date-picker
        v-model="rangeValue"
        color="$primary-400"
        header-color="$primary-400"
        range
        show-adjacent-months
        :first-day-of-week="1"
      />
      <button class="date-range-modal__apply" :disabled="!rangeValue.start || !rangeValue.end" @click="applyRange">Применить</button>
    </div>
  </v-dialog>
</template>

<script setup>
import {
  computed,
  ref,
  toRefs,
  watch,
} from 'vue';

const props = defineProps({
  modelValue: Boolean,
  range: { type: Object, default: () => ({ start: '', end: '' }) },
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
@import '@/styles/_variables.scss';
.date-range-modal {
  background: $gray-0;
  border-radius: $radius-lg;
  padding: $space-l $space-m $space-xl $space-m;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .date-range-modal__title {
    font-family: $font-main;
    font-size: $font-size-h3;
    font-weight: $font-weight-semibold;
    color: $gray-900;
    text-align: center;
    margin-bottom: $space-m;
    margin-top: $space-m;
  }
  .v-date-picker {
    border-radius: $radius-lg;
    background: $gray-0;
    box-shadow: none;
    margin-bottom: $space-l;
  }
  .date-range-modal__apply {
    width: 100%;
    background: $primary-400;
    color: $gray-0;
    border: none;
    border-radius: $radius-lg;
    font-family: $font-main;
    font-size: $font-size-body;
    font-weight: $font-weight-semibold;
    padding: $space-m 0;
    margin-top: $space-m;
    cursor: pointer;
    transition: background 0.2s;
    &:hover:enabled {
      background: $primary-500;
    }
    &:disabled {
      background: $gray-200;
      color: $gray-400;
      cursor: not-allowed;
    }
  }
}
</style> 