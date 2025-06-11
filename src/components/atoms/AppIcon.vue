<template>
  <component v-if="iconComponent" :is="iconComponent" class="app-icon" />
</template>

<script setup>
import { computed } from 'vue';

import IconBriefcase01 from './icons/IconBriefcase01.vue';
import IconHome05 from './icons/IconHome05.vue';
import IconMenuSquare from './icons/IconMenuSquare.vue';
import IconPlusSignSquare from './icons/IconPlusSignSquare.vue';
import IconUser from './icons/IconUser.vue';
import IconCoinsSwap from './icons/IconCoinsSwap.vue';
import IconElements from './IconElements.vue';
import IconDocumentText from './icons/IconDocumentText.vue';

const props = defineProps({
  name: { type: String, required: true }
})

const icons = {
  'home-05': IconHome05,
  'briefcase-01': IconBriefcase01,
  'menu-square': IconMenuSquare,
  'user': IconUser,
  'plus-sign-square': IconPlusSignSquare,
  'close-square': IconPlusSignSquare,
  'coins-swap': IconCoinsSwap,
  'elements': IconElements,
  'document-text': IconDocumentText,
}

const iconComponent = computed(() => icons[props.name] || null)
</script>

<style scoped lang="scss">
.app-icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
</style> 