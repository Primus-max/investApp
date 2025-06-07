<template>
  <div class="tab-bar__overlay">
  <nav class="tab-bar" :class="{ 'tab-bar--menu-open': isMenuOpen }">    
    <div class="tab-bar__tabs">
      <template v-for="(tab, idx) in tabs">
        <button
          v-if="!tab.center"
          :key="tab.label + idx"
          :class="[
            'tab-bar__item',
            { 'tab-bar__item--active': idx === activeIndex, 'tab-bar__item--center': tab.center, 'tab-bar__tabs--blur': isMenuOpen && !tab.center }
          ]"
          @click="onTabClick(idx)"
          type="button"
        >
          <div :class="['tab-bar__content', { 'tab-bar__content--blur': isMenuOpen }]">
            <span class="tab-bar__icon">
              <AppIcon v-if="tab.icon" :name="tab.icon" :class="[{ 'tab-bar__item--active': idx === activeIndex }]" />
            </span>
            <span class="tab-bar__label" v-if="tab.label">{{ tab.label }}</span>
          </div>
        </button>
        <button
          v-else
          :key="'center-' + idx"
          :class="[
            'tab-bar__item',
            { 'tab-bar__item--active': idx === activeIndex, 'tab-bar__item--center': tab.center }
          ]"
          @click="onTabClick(idx)"
          type="button"
        >
          <div class="tab-bar__content">
            <AppIcon :name="isMenuOpen ? 'close-square' : 'plus-sign-square'" :active="isMenuOpen" />
          </div>
        </button>
      </template>
    </div>
    <div v-if="isMenuOpen" @click="closeMenu" />
    <!-- <ActionMenu v-if="isMenuOpen" /> -->
  
  </nav>
</div>
</template>

<script setup>
import { ref } from 'vue';

import AppIcon from '@/components/atoms/AppIcon.vue';
import ActionMenu from '@/components/organisms/ActionMenu.vue';

const props = defineProps({
  tabs: { type: Array, required: true },
  activeIndex: { type: Number, default: 0 }
})
const emit = defineEmits(['update:activeIndex'])

const isMenuOpen = ref(false)

function onTabClick(idx) {
  if (props.tabs[idx].center) {
    isMenuOpen.value = !isMenuOpen.value
  } else {
    emit('update:activeIndex', idx)
  }
}
function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.tab-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: $space-m 0;
  // gap: $space-xs;
  width: 358px;
  height: 76px;
  background: $gray-900;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.2);
  border-radius: $radius-large;

  &__overlay {
    width: 358px;
    height: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;      
    background: $gray-900;
    border-radius: $radius-large;   
  }

  &__tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 8px;
    // gap: 2px;
    width: 100%;
    // height: 44px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    justify-content: space-between;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 65px;
    height: 44px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    color: $gray-400;
    font-family: $font-main;
    font-size: 12px;
    font-weight: $font-weight-regular;
    line-height: 16px;
    letter-spacing: $letter-spacing-normal;
    border-radius: $radius-main;
    position: relative;
    transition: color 0.18s;

    .tab-bar__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    &--active {
      color: $gray-0;
      font-weight: $font-weight-regular;

      .tab-bar__icon img,
      .tab-bar__icon svg {
        filter: brightness(1000%) grayscale(0%);
      }

      .tab-bar__label {
        color: $gray-0;
        font-weight: $font-weight-regular;
      }
    }

    &--center {
      width: 37px;
      height: 37px;
      z-index: 30;
      margin: 0;
      background: $gray-0;
      border-radius: $radius-main;
      box-shadow: $shadow-main;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;

      .app-icon {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $gray-400;
    margin-bottom: 2px;
    filter: grayscale(100%) brightness(0.7);
  }

  &__item:hover .tab-bar__icon,
  &__item:focus .tab-bar__icon {
    color: #fff;
  }

  &__item--active .tab-bar__icon {
    filter: none;
    color: $gray-0;
  }

  &__label {
    width: 100%;
    max-width: 100%;
    height: 16px;
    display: block;
    text-align: center;
    font-family: $font-main;
    font-style: normal;
    font-weight: $font-weight-regular;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: $letter-spacing-normal;
    color: $gray-400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    margin-top: 2px;
  }
}

.tab-bar--menu-open {
  box-shadow: 0 0 0 2px #fff, 0px 4px 32px rgba(0, 0, 0, 0.2);
  z-index: 1102;
}

.tab-bar__tabs--blur {
  filter: blur(2px);
  transition: filter 0.2s;
  border: none;
}

// .tab-bar__item-blur--active {
//   filter: blur(4px);
//   transition: filter 0.2s;
// }

// .tab-bar__item--blur {
//   filter: blur(4px);
//   transition: filter 0.2s;
// }

// .tab-bar__content--blur {
//   filter: blur(4px);
//   transition: filter 0.2s;
// }
</style>