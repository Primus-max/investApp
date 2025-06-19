<template>
  <MainLayout>
    <template #header>
      <div class="profile-empty-header"></div>
    </template>
    <div class="profile-content">
      <div class="profile-header">
        <div class="profile-header__avatar-wrap">
          <div class="profile-header__avatar">KK</div>
        </div>
        <div class="profile-header__info">
          <div class="profile-header__nick">@konstantin.k.k</div>
          <div class="profile-header__name">Константин Константинов</div>
          <div class="profile-header__email">E-mail: konstantin.k.k@gmail.com</div>
        </div>
      </div>
      <div class="profile-banner">
        <div class="profile-banner__text">
          <span>Станьте <BadgeAtom customClass="profile-banner__badge">PRO</BadgeAtom></span>
          <div class="profile-banner__desc">Выберите один из трех тарифов</div>
        </div>
        <AppButton size="small" type="white">Подробнее</AppButton>
      </div>
      <div class="profile-menu">
        <div class="profile-menu__item">
          <AppIcon name="user" />
          <span>Изменение профиля</span>
          <AppIcon name="arrow-down" />
        </div>
        <div class="profile-menu__item">
          <AppIcon name="briefcase-01" />
          <span>Изменение портфелей</span>
          <AppIcon name="arrow-down" />
        </div>
        <div class="profile-menu__item profile-menu__item--switch">
          <AppIcon name="change-screen-mode" />
          <span>Тема</span>
          <span class="profile-menu__theme-label">Светлая</span>
          <AppSwitch v-model="themeLight" />
        </div>
        <div class="profile-menu__item">
          <AppIcon name="document-text" />
          <span>Юридические документы</span>
          <AppIcon name="arrow-down" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';

import AppButton from '@/components/atoms/AppButton.vue';
import AppIcon from '@/components/atoms/AppIcon.vue';
import AppSwitch from '@/components/atoms/AppSwitch.vue';
import BadgeAtom from '@/components/atoms/BadgeAtom.vue';
import MainLayout from '@/layout/MainLayout.vue';

const themeLight = ref(true)
</script>

<style scoped lang="scss">
@import '@/styles/_sections.scss';
.profile-empty-header {
  width: 100%;
  height: 180px;
}
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 16px 0;
  &__avatar-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
  }
  &__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: $gray-0;
    box-shadow: 0 4px 20px rgba($gray-900, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: $font-weight-semibold;
    color: $primary-500;
    margin-bottom: 8px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  &__nick {
    font-size: 15px;
    color: $gray-400;
    margin-bottom: 2px;
  }
  &__name {
    font-size: 18px;
    font-weight: $font-weight-semibold;
    color: $gray-900;
    margin-bottom: 2px;
  }
  &__email {
    font-size: 14px;
    color: $gray-500;
  }
}
.profile-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  padding: 0 16px 24px 16px;
}
.profile-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #3B6EEA 0%, #6A9CFF 100%);
  border-radius: $radius-xl;
  padding: 18px 20px;
  margin-bottom: 12px;
  box-shadow: 0 4px 20px rgba($gray-900, 0.08);
  &__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: $gray-0;
    font-size: 16px;
    font-weight: $font-weight-semibold;
  }
  &__badge {
    background: $gray-0;
    color: $primary-500;
    font-size: 13px;
    font-weight: $font-weight-bold;
    margin-left: 6px;
    padding: 2px 8px;
    border-radius: 8px;
  }
  &__desc {
    font-size: 13px;
    color: $gray-0;
    opacity: 0.8;
    font-weight: $font-weight-regular;
  }
}
.profile-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &__item {
    display: flex;
    align-items: center;
    background: $gray-0;
    border-radius: $radius-lg;
    box-shadow: 0 2px 8px rgba($gray-900, 0.04);
    padding: 14px 16px;
    font-size: 16px;
    color: $gray-900;
    font-family: $font-main;
    font-weight: $font-weight-regular;
    cursor: pointer;
    transition: background 0.15s;
    &:hover {
      background: $primary-50;
    }
    & > .app-icon {
      margin-right: 14px;
      color: $primary-500;
    }
    & > .app-icon:last-child {
      margin-left: auto;
      color: $gray-300;
    }
    &--switch {
      gap: 8px;
      .profile-menu__theme-label {
        margin-left: auto;
        color: $gray-400;
        font-size: 15px;
      }
    }
  }
}
</style> 