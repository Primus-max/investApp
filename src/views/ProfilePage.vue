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
      <AppBanner class="profile-pro-banner">
        <div class="profile-pro-banner__text-block">
          <span class="profile-pro-banner__title">Станьте <BadgeAtom customClass="profile-pro-banner__badge">PRO</BadgeAtom></span>
          <span class="profile-pro-banner__desc">Выберите один из трех тарифов</span>
        </div>
        <AppButton size="small" type="white">Подробнее</AppButton>
      </AppBanner>
      <div class="profile-menu">
        <div class="profile-menu__list">
          <template v-for="(item, idx) in profileMenu" :key="item.action">
            <div 
              class="profile-menu__item" 
              :class="{ 'profile-menu__item--switch': item.isSwitch }"
              @click="handleMenuClick(item.action)"
            >
              <AppIcon :name="item.icon" :color="$primary-500" />
              <span class="profile-menu__label">{{ item.label }}</span>
              <template v-if="item.isSwitch">
                <div class="profile-menu__switch-wrap">
                  <span class="profile-menu__theme-label">Светлая</span>
                  <AppSwitch v-model="themeLight" />
                </div>
              </template>
              <template v-else>
                <IconArrowLeft class="profile-menu__arrow"  />
              </template>
            </div>
            <div v-if="idx < profileMenu.length - 1" class="profile-menu__divider"></div>
          </template>
        </div>
      </div>
    </div>
    <EditProfileModal v-model:visible="isEditProfileModalVisible" @submit="updateProfile" />
    <EditPortfolioModal v-model:visible="isEditPortfolioModalVisible" />
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';

import AppBanner from '@/components/atoms/AppBanner.vue';
import AppButton from '@/components/atoms/AppButton.vue';
import AppIcon from '@/components/atoms/AppIcon.vue';
import AppSwitch from '@/components/atoms/AppSwitch.vue';
import BadgeAtom from '@/components/atoms/BadgeAtom.vue';
import IconArrowLeft from '@/components/atoms/icons/IconArrowLeft.vue';
import EditPortfolioModal from '@/components/organisms/EditPortfolioModal.vue';
import EditProfileModal from '@/components/organisms/EditProfileModal.vue';
import MainLayout from '@/layout/MainLayout.vue';

const themeLight = ref(true);
const isEditProfileModalVisible = ref(false);
const isEditPortfolioModalVisible = ref(false);

const profileMenu = [
  {
    icon: 'user',
    label: 'Изменение профиля',
    action: 'editProfile',
  },
  {
    icon: 'briefcase-01',
    label: 'Изменение портфелей',
    action: 'editPortfolios',
  },
  {
    icon: 'change-screen-mode',
    label: 'Тема',
    action: 'theme',
    isSwitch: true
  },
  {
    icon: 'document-text',
    label: 'Юридические документы',
    action: 'docs',
  }
];

const handleMenuClick = (action) => {
  if (action === 'editProfile') {
    isEditProfileModalVisible.value = true;
  }
  if (action === 'editPortfolios') {
    isEditPortfolioModalVisible.value = true;
  }
};

const updateProfile = (data) => {
  console.log('Profile updated:', data);
};

</script>

<style scoped lang="scss">
@import '@/styles/_sections.scss';
.profile-empty-header {
  width: 100%;
  height: 180px;
}
.profile-header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 52px 0 16px 0;
  &__avatar-wrap {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    width: 80px;
    height: 80px;
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
    font-size: 24px;
    font-weight: $font-weight-semibold;
    color: $gray-400;
    margin-bottom: 0;
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
.profile-pro-banner {
  width: 100%;
  max-width: 358px;
  margin: 0 auto 12px auto;
  .app-banner__content {
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  &__text-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }
  &__title {
    font-family: $font-main;
    font-size: 16px;
    font-weight: $font-weight-semibold;
    color: $gray-0;
    line-height: 22px;
    display: flex;
    align-items: center;
    gap: 6px;
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
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  &__list {
    background: $gray-0;
    border-radius: $radius-lg;
    box-shadow: 0 2px 8px rgba($gray-900, 0.04);
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
  }
  &__item {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: $gray-900;
    font-family: $font-main;
    font-weight: $font-weight-regular;
    padding: 18px 16px;
    background: none;
    border: none;
    cursor: pointer;
    transition: none;
    box-shadow: none;
    outline: none;
    user-select: none;
    &:active, &:hover, &:focus {
      background: none;
      color: $gray-900;
    }
    & > .app-icon {
      margin-right: 14px;
      color: $primary-500;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }
    & > span:not(.profile-menu__theme-label) {
      flex: 1;
    }
    &--switch {
      justify-content: space-between;
      .profile-menu__theme-label {
        color: $gray-400;
        font-size: 15px;
        margin-right: 12px;
      }
    }
    .profile-menu__arrow {
      margin-left: auto;
      color: $gray-300;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }
  }
  &__divider {
    height: 1px;
    width: 100%;
    background: $gray-100;
    margin: 0;
  }
  &__switch-wrap {
    width: 34%;
    display: flex;
    align-items: center;
    justify-self: end;
    gap: 0;
    padding-right: 0;
  }
  :deep(.app-switch) {
    margin-left: auto !important;
    margin-right: 0 !important;
  }
  .profile-menu__label {
    flex: 1;
    min-width: 0;
  }
}
</style> 