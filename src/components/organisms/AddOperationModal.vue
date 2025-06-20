<template>
  <BaseModal :visible="visible" @update:visible="close">
    <div class="add-operation-modal">
      <h2 class="add-operation-modal__title">Добавление операции</h2>

      <div class="add-operation-modal__form">
        <div class="add-operation-modal__field">
          <label class="add-operation-modal__label">Тип операции</label>
          <SortDropdown v-model="form.type" :options="typeOptions" />
        </div>
        <div class="add-operation-modal__field">
          <label class="add-operation-modal__label">Тип актива</label>
          <SortDropdown v-model="form.assetType" :options="assetTypeOptions" />
        </div>
        <div class="add-operation-modal__field">
          <label class="add-operation-modal__label">Актив</label>
          <SortDropdown v-model="form.asset" :options="assetOptions">
            <div class="asset-trigger">
              <img :src="activeAsset.icon" :alt="activeAsset.label" class="asset-trigger__icon" />
              <span class="asset-trigger__label">{{ activeAsset.label }}</span>
              <span class="asset-trigger__price">{{ activeAsset.price }} ₽</span>
            </div>
            <template #item="{ option }">
              <img :src="option.icon" :alt="option.label" class="asset-trigger__icon" />
              <span class="asset-trigger__label">{{ option.label }}</span>
            </template>
          </SortDropdown>
          <p class="add-operation-modal__commission">Комиссия 02,41 ₽</p>
        </div>
        <div class="add-operation-modal__field">
          <div class="add-operation-modal__field-wrapper">
            <label class="add-operation-modal__label">Количество</label>
            <QuantityInput v-model="form.quantity" />
          </div>
        </div>
        <div class="add-operation-modal__field">
          <label class="add-operation-modal__label">Дата операции</label>
          <VDatePicker v-model="date" :masks="{ modelValue: 'DD.MM.YYYY' }" :popover="{ visibility: 'click' }">
            <template #default="{ inputValue, inputEvents }">
              <AppInput :model-value="inputValue" placeholder="24.05.2025" v-on="inputEvents">
                <template #icon>
                  <IconCalendar style="cursor: pointer;" />
                </template>
              </AppInput>
            </template>
          </VDatePicker>
        </div>
      </div>

      <div class="add-operation-modal__footer">
        <div class="add-operation-modal__total">
          <span>Итого:</span>
          <span class="add-operation-modal__total-amount">30 241 ₽</span>
        </div>
        <AppPillButton class="add-operation-modal__submit" @click="submit">
          Добавить
        </AppPillButton>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import {
  computed,
  reactive,
  ref,
} from 'vue';

import {
  format,
  isValid,
  parse,
} from 'date-fns';

import modul from '@/assets/icons/coins/modul.svg';
import sber from '@/assets/icons/coins/sber.svg';
import AppInput from '@/components/atoms/AppInput.vue';
import AppPillButton from '@/components/atoms/AppPillButton.vue';
import IconCalendar from '@/components/atoms/icons/IconCalendar.vue';
import QuantityInput from '@/components/atoms/QuantityInput.vue';
import BaseModal from '@/components/molecules/BaseModal.vue';
import SortDropdown from '@/components/molecules/SortDropdown.vue';

const props = defineProps({
  visible: { type: Boolean, default: false }
});
const emit = defineEmits(['update:visible']);

const form = reactive({
  type: 'buy',
  assetType: 'stocks',
  asset: 'sber',
  quantity: 100,
  date: '24.05.2025',
});

const date = computed({
  get: () => {
    const d = parse(form.date, 'dd.MM.yyyy', new Date());
    return isValid(d) ? d : null;
  },
  set: (val) => {
    form.date = val ? format(val, 'dd.MM.yyyy') : '';
  }
});

const activeAsset = computed(() => assetOptions.find(o => o.value === form.asset));

const typeOptions = [
  { label: 'Покупка', value: 'buy' },
  { label: 'Продажа', value: 'sell' },
];
const assetTypeOptions = [
  { label: 'Акции', value: 'stocks' },
  { label: 'Облигации', value: 'bonds' },
];
const assetOptions = [
  { label: 'Сбербанк', value: 'sber', icon: sber, price: '302,41' },
  { label: 'Модульбанк', value: 'modul', icon: modul, price: '116,42' },
];

function close() {
  emit('update:visible', false);
}
function submit() {
  console.log(form);
  close();
}
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.add-operation-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: $space-l $space-m;
  background: $gray-50; 

  &__title {
    font-family: $font-main;
    font-style: normal;
    font-weight: $font-weight-semibold;
    font-size: 24px;
    line-height: 32px;
    color: $gray-950;
    margin-bottom: $space-l;
    text-align: left;
  }

  &__form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: $space-l;
  }

  &__label {
    font-family: $font-main;
    font-style: normal;
    font-weight: $font-weight-semibold;
    font-size: 18px;
    line-height: 24px;
    color: $gray-950;
    margin-bottom: $space-s;
    display: block;
  }

  &__field-wrapper {
    display: flex;
    flex-direction: row;
    gap: $space-xs;
    align-items: center;
    justify-content: space-between;
  }

  &__commission {
    font-size: $font-size-small;
    color: $gray-400;
    margin-top: $space-xs;
    padding-left: $space-s;
  }

  .asset-trigger {
    display: flex;
    align-items: center;
    gap: $space-s;

    &__icon {
      width: 24px;
      height: 24px;
    }

    &__label {
      font-weight: $font-weight-medium;
    }

    &__price {
      color: $gray-400;
      margin-left: $space-xs;
    }
  }

  :deep(.sort-dropdown) {
    width: 100%;

    .sort-dropdown__trigger {
      position: relative;
      height: 50px;
      background: $gray-0;
      border-radius: $radius-md;
      border: 1px solid $gray-100;
      padding: 0 $space-m;
      justify-content: flex-start;

      &:hover {
        border-color: $gray-300;
      }

      &::after {
        content: '';
        position: absolute;
        right: $space-m;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.6666 5.66699L7.99992 10.3337L3.33325 5.66699' stroke='%239DA4AE' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .sort-dropdown__menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      width: 100%;
      background: $gray-0;
      border-radius: $radius-lg;
      box-shadow: 0 4px 12px rgba(44, 62, 80, 0.12);
      z-index: 1000;
      padding: $space-xs;
    }

    .sort-dropdown__menu-item {
      .asset-trigger__price {
        display: none;
      }
    }
  }

  :deep(.app-input .v-field__input) {
    height: 50px;
    min-height: 50px;
    align-items: center;
  }

  :deep(.v-field__append-inner) {
    display: flex;
    align-items: center;
  }

  &__footer {
    margin-top: auto;
    padding-top: $space-l;
    background: $gray-50;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $space-m;
    font-size: $font-size-body;
    color: $gray-950;
  }

  &__total-amount {
    font-size: 20px;
    font-weight: $font-weight-bold;
  }

  &__submit {
    height: 50px;
    width: 100%;
    background: $primary-400;
    color: $gray-0;
  }
}
</style>