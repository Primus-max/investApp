<template>
  <div class="tab-bar__overlay" v-if="isMenuOpen">
    <nav v-if="isMenuOpen" class="tab-bar__menu-nav" aria-label="Меню действий">
      <AppBanner class="tab-bar__menu-banner">
        <div >
          <span class="tab-bar__menu-banner-icon">✨</span>
          <span class="tab-bar__menu-banner-title">Чат с ИИ</span>
          <span class="tab-bar__menu-banner-badge">3/3 доступно</span>
        </div>
      </AppBanner>
      <ul class="tab-bar__menu-list">
        <li v-for="action in menuActions" :key="action.label" class="tab-bar__menu-list-item">
          <a href="#" class="tab-bar__menu-item" @click.prevent="onMenuAction(action)">
            <span class="tab-bar__menu-item-icon"><AppIcon :name="action.icon" /></span>
            <span class="tab-bar__menu-item-label">{{ action.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
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
    </nav>
  </div>
  <nav v-else class="tab-bar" :class="{ 'tab-bar--menu-open': isMenuOpen }">
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
  </nav>
</template>

<script setup>
import { ref } from 'vue';

import AppBanner from '@/components/atoms/AppBanner.vue';
import AppIcon from '@/components/atoms/AppIcon.vue';
import { usePortfoliosStore } from '@/stores/portfolios.js';
import { useUiStore } from '@/stores/ui.js';

const props = defineProps({
  tabs: { type: Array, required: true },
  activeIndex: { type: Number, default: 0 }
})
const emit = defineEmits(['update:activeIndex', 'menu-open'])

const isMenuOpen = ref(false)
const store = usePortfoliosStore();
const uiStore = useUiStore();

const menuActions = [
  { icon: 'briefcase-01', label: 'Создать портфель' },
  { icon: 'coins-swap', label: 'Создать сделку' },
  { icon: 'elements', label: 'Добавить виджет' },
  { icon: 'document-text', label: 'Загрузить отчет' },
]

function onTabClick(idx) {
  if (props.tabs[idx].center) {
    isMenuOpen.value = !isMenuOpen.value
    emit('menu-open', isMenuOpen.value)
  } else {
    emit('update:activeIndex', idx)
  }
}

function closeMenu() {
  isMenuOpen.value = false
  emit('menu-open', false)
}

function onMenuAction(action) {
  if (action.label === 'Создать портфель') {
    store.openCreatePortfolioModal();
    isMenuOpen.value = false;
  }
  if (action.label === 'Создать сделку') {
    uiStore.openAddOperationModal();
    isMenuOpen.value = false;
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.tab-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: $space-m 0;
  width: 100%;
  background: $gray-950;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.2);
  border-radius: $radius-xl;
  border: none !important;

  &__menu-nav {
    width: 96%;
    min-height: 328px;
    display: flex;
    flex-direction: column;
    align-items: center;    
    pointer-events: auto;
    background: none;
    padding: 0 0 16px 0;
  }

  &__menu-banner {
    width: 96%;
    height: 56px;
    margin-bottom: 12px;
    border-radius: $radius-sm;
    margin-left: auto;
    margin-right: auto;
  }

  &__menu-banner-icon {
    font-size: 22px;
    margin-right: 12px;
    color: #fff;
  }
  &__menu-banner-title {
    font-family: 'SF Pro Rounded', Arial, sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin-right: 12px;
  }
  &__menu-banner-badge {
    background: rgba(255,255,255,0.18);
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    border-radius: $radius-md;
    padding: 2px 10px;
  }

  &__menu-banner-content {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__menu-list {
    width: 100%;
    display: flex;
    flex-direction: column;    
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &__menu-item {
    width: 96%;
    height: 56px;
    background: $gray-900;
    border-radius: $radius-sm;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    padding: 16px 20px;
    border: none;
    color: #fff;
    font-family: 'SF Pro Rounded', Arial, sans-serif;
    font-size: 16px;
    font-weight: $font-weight-regular;
    line-height: 20px;
    margin-bottom: 0;
    cursor: pointer;
    transition: background 0.15s;
    text-decoration: none;
  }
  &__menu-item:hover {
    background: #282a33;
  }
  &__menu-item-icon {
    margin-right: 16px;
    display: flex;
    align-items: center;
    svg, img {
      width: 24px;
      height: 24px;
      color: #aeb8d4;
    }
  }
  &__menu-item-label {
    flex: 1 1 auto;
    text-align: left;
  }

  &__overlay {
    width: 100%;
    height: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;      
      background: $gray-950;
    border-radius: $radius-xl;   
  }

  &__tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 8px;    
    width: 100%;    
    flex: none;
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
    border-radius: $radius-md;
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
      border-radius: $radius-md;
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

.tab-bar__tabs--blur {
  filter: blur(2px);
  transition: filter 0.2s;  
}
</style>