<template>
  <BaseModal :visible="visible" @update:visible="close">
    <div class="edit-portfolio-modal">
      <!-- View: Portfolio List -->
      <div v-if="!selectedPortfolio" class="edit-portfolio-modal__list-view">
        <div class="edit-portfolio-modal__header">
          <button @click="close" class="edit-portfolio-modal__close-btn">
            <!-- Icon for close will be added here if needed -->
          </button>
          <h2 class="edit-portfolio-modal__title">Изменение портфелей</h2>
        </div>
        <p class="edit-portfolio-modal__subtitle">Выберите портфель, который хотите изменить</p>
        <div class="edit-portfolio-modal__list">
          <PortfolioCard 
            v-for="portfolio in portfolios" 
            :key="portfolio.id" 
            :portfolio="portfolio"
            @click="selectPortfolio(portfolio)" 
            class="edit-portfolio-modal__portfolio-card"
            :disable-routing="true"
          />
        </div>
      </div>

      <!-- View: Edit Form -->
      <div v-else class="edit-portfolio-modal__form-view">
        <div class="edit-portfolio-modal__header">
          <button @click="selectedPortfolio = null" class="edit-portfolio-modal__back-btn">
            <IconArrowLeft />
          </button>
          <h2 class="edit-portfolio-modal__title">{{ selectedPortfolio.name }}</h2>
        </div>
        
        <div class="edit-portfolio-modal__form">
          <label class="edit-portfolio-modal__label">Название портфеля</label>
          <AppInput v-model="editablePortfolio.name" />

          <label class="edit-portfolio-modal__label">Валюта</label>
          <SelectGroupMolecule v-model="editablePortfolio.currency" :options="currencyOptions" />
        </div>

        <AppPillButton class="edit-portfolio-modal__submit" @click="savePortfolio">
          Сохранить
        </AppPillButton>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

import euroFlag from '@/assets/icons/flags/euro.svg';
import ruFlag from '@/assets/icons/flags/ru.svg';
import usFlag from '@/assets/icons/flags/us.svg';
import AppInput from '@/components/atoms/AppInput.vue';
import AppPillButton from '@/components/atoms/AppPillButton.vue';
import IconArrowLeft from '@/components/atoms/icons/IconArrowLeft.vue';
import BaseModal from '@/components/molecules/BaseModal.vue';
import PortfolioCard from '@/components/molecules/PortfolioCard.vue';
import SelectGroupMolecule
  from '@/components/molecules/SelectGroupMolecule.vue';
import { usePortfoliosStore } from '@/stores/portfolios';

const props = defineProps({
  visible: { type: Boolean, default: false }
});
const emit = defineEmits(['update:visible']);

const portfoliosStore = usePortfoliosStore();

// Подготавливаем данные, добавляя массив icons
const portfolios = computed(() => 
  portfoliosStore.portfolios.map(p => ({
    ...p,
    icons: Array.isArray(p.assets) ? p.assets.map(a => a.logo) : []
  }))
);

const selectedPortfolio = ref(null);
const editablePortfolio = ref(null);

const currencyOptions = [
  { label: 'Рубль', value: 'rub', icon: ruFlag },
  { label: 'Доллар', value: 'usd', icon: usFlag },
  { label: 'Евро', value: 'eur', icon: euroFlag },
];

function selectPortfolio(portfolio) {
  selectedPortfolio.value = portfolio;
  editablePortfolio.value = JSON.parse(JSON.stringify(portfolio)); // Deep copy to avoid mutating store directly
}

function savePortfolio() {
  portfoliosStore.updatePortfolio(editablePortfolio.value);
  close();
}

function close() {
  selectedPortfolio.value = null;
  emit('update:visible', false);
}
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';
@import '@/styles/_mixins.scss';

.edit-portfolio-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $gray-50;

  &__list-view, &__form-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: $space-m;
  }
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: $space-s;
    margin-bottom: $space-s;
  }

  &__title {
    font-size: $font-size-h3;
    font-weight: $font-weight-semibold;
    line-height: $line-height-h3;
    color: $gray-950;
  }

  &__back-btn, &__close-btn {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: $space-xs;
    color: $gray-900;
  }

  &__subtitle {
    color: $gray-500;
    text-align: left;
    margin-bottom: $space-l;
    font-size: $font-size-body;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-s;
    overflow-y: auto;
  }

  &__form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: $space-l;
    margin-top: $space-m;
  }
  
  &__label {
    font-size: $font-size-body;
    font-weight: $font-weight-semibold;
    margin-bottom: $space-xs;
    color: $gray-950;
  }

  &__submit {
    margin-top: auto;
    margin-bottom: $space-xl;
    background: $primary-400;
    color: $gray-0;
    border-radius: $radius-md;
    height: 50px;
  }
}
</style> 