<script setup>
import CategoryProgressBarAtom
  from '@/components/atoms/CategoryProgressBarAtom.vue';

const props = defineProps({
  categories: { type: Array, required: true } // [{ label, value, percent, color }]
});
</script>
<template>
  <div class="category-list-molecule">
    <CategoryProgressBarAtom
      v-for="cat in categories"
      :key="cat.label"
      :label="cat.label"
      :value="cat.percent"
      :percent="cat.percent"
      :color="cat.color"
    />
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/_variables.scss';

.category-list-molecule {
  display: flex;
  flex-direction: column;
  gap: $space-s;
  width: 100%;
}
</style> 