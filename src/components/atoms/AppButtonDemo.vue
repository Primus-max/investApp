<template>
  <div class="app-button-demo">
    <h2>AppButton Demo (Figma Table)</h2>
    <table class="app-button-demo__table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Default</th>
          <th>Hover</th>
          <th>Pressed</th>
          <th>Disabled</th>
          <th>Loading</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in types" :key="type">
          <td class="app-button-demo__type">{{ typeLabel(type) }}</td>
          <td v-for="state in states" :key="state">
            <div class="app-button-demo__cell">
              <AppButton
                :type="type"
                :size="'large'"
                :disabled="state === 'disabled'"
                :loading="state === 'loading'"
                :class="'demo-' + state"
              >
                <template #icon>
                  <AppIcon v-if="state !== 'loading'" name="circle-arrow-up-right-round" type="sprite" />
                </template>
                Action
              </AppButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>All Icons (Sprite)</h3>
    <div class="app-button-demo__icons">
      <span v-for="icon in spriteIcons" :key="icon" class="app-button-demo__icon-item">
        <AppIcon :name="icon" type="sprite" />
        <span>{{ icon }}</span>
      </span>
    </div>
    <h3>All Icons (Separate SVGs)</h3>
    <div class="app-button-demo__icons">
      <span v-for="icon in coinIcons" :key="icon" class="app-button-demo__icon-item">
        <img :src="`/src/assets/icons/coins/${icon}`" :alt="icon" class="app-button-demo__svg" />
        <span>{{ icon.replace('.svg', '') }}</span>
      </span>
      <span v-for="icon in socialIcons" :key="icon" class="app-button-demo__icon-item">
        <img :src="`/src/assets/icons/social/${icon}`" :alt="icon" class="app-button-demo__svg" />
        <span>{{ icon.replace('.svg', '') }}</span>
      </span>
    </div>
    <h2>AppInput Demo (Figma Table)</h2>
    <div class="app-input-demo">
      <AppInput label="Label" placeholder="Placeholder" v-model="input1" />
      <AppInput label="With Icon" placeholder="Placeholder" icon="search-02" v-model="input2" />
      <AppInput label="Error" placeholder="Placeholder" error="Error message" v-model="input3" />
      <AppInput label="Disabled" placeholder="Placeholder" :disabled="true" v-model="input4" />
    </div>
    <h2>AppSelect Demo (Figma Table)</h2>
    <div class="app-select-demo">
      <AppSelect label="Label" placeholder="Choose option" :options="selectOptions" v-model="select1" />
      <AppSelect label="Error" placeholder="Choose option" :options="selectOptions" error="Error message" v-model="select2" />
      <AppSelect label="Disabled" placeholder="Choose option" :options="selectOptions" :disabled="true" v-model="select3" />
      <AppSelect label="Custom Option" placeholder="Choose option" :options="selectOptions" v-model="select4">
        <template #option="{ option }">
          <span style="display: flex; align-items: center; gap: 8px;">
            <AppIcon v-if="option.icon" :name="option.icon" type="sprite" />
            {{ option.label }}
          </span>
        </template>
      </AppSelect>
    </div>
    <h2>AppRadioGroup & AppSwitch Demo (Figma Controls)</h2>
    <div class="app-controls-demo">
      <div>
        <AppRadioGroup :options="radioOptions" v-model="radioValue" />
      </div>
      <div style="margin-top: 24px; display: flex; gap: 32px;">
        <AppSwitch v-model="switch1" />
        <AppSwitch v-model="switch2" :disabled="true" />
        <AppSwitch v-model="switch3" indicator />
        <AppSwitch v-model="switch4" indicator :disabled="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import AppButton from './AppButton.vue';
import AppIcon from './AppIcon.vue';
import AppInput from './AppInput.vue';
import AppRadioGroup from './AppRadioGroup.vue';
import AppSelect from './AppSelect.vue';
import AppSwitch from './AppSwitch.vue';

const types = ['fill', 'bezeled', 'gray', 'white', 'negative', 'text']
const states = ['default', 'hover', 'pressed', 'disabled', 'loading']

function typeLabel(type) {
  switch (type) {
    case 'fill': return 'Fill';
    case 'bezeled': return 'Bezeled';
    case 'gray': return 'Gray';
    case 'white': return 'White';
    case 'negative': return 'Negative';
    case 'text': return 'Text';
    default: return type;
  }
}

// Список иконок из спрайта (добавьте сюда все id из icons-sprite.svg)
const spriteIcons = [
  'circle-arrow-up-right-round',
  'plus-sign-circle',
  'circle-arrow-reload-01-round',
  'clock-02',
  'circle-arrow-down-left-round',
  'rotate-left',
  'check-list',
  'loading',
  'chatting-01',
  'change-screen-mode',
  'link-forward',
  'arrow-up-right-01-round',
  'arrow-horizontal-round',
  'user',
  'wallet-02',
  'arrow-data-transfer-horizontal-round',
  'candle-2',
  'tick-01',
  'bookmark-02-B',
  'bookmark-02',
  'search-02',
  'user-group',
  'left-to-right-list-bullet',
  'toggle-off',
  'toggle-on',
  'arrow-down',
  'arrow-up',
  'arrow-right',
  'arrow-left',
  'arrow-right-alt',
  'arrow-left-alt',
  'arrow-up-alt',
];

const coinIcons = [
  'ethereum.svg',
  'xmr.svg',
  'sber.svg',
  'appCoinsBadge.svg',
  'bitcoinBadge.svg',
  'chainlinkBadge.svg',
  'rub.svg',
  'minaBadge.svg',
  'ton.svg',
  'tetherBadge.svg',
]
const socialIcons = [
  'vk.svg',
  'telegram.svg',
  'instagram.svg',
  'youTube.svg',
]

const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');

const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2', icon: 'user' },
  { label: 'Option 3', value: '3', disabled: true },
  { label: 'Option 4', value: '4' }
];
const select1 = ref('');
const select2 = ref('');
const select3 = ref('');
const select4 = ref('');

const radioOptions = [
  { label: '', value: '1' },
  { label: '', value: '2' },
  { label: '', value: '3' },
  { label: '', value: '4', disabled: true }
];
const radioValue = ref('2');
const switch1 = ref(false);
const switch2 = ref(true);
const switch3 = ref(false);
const switch4 = ref(true);
</script>

<style scoped lang="scss">
.app-button-demo {
  padding: 24px;
  background: #fafbfc;
  border-radius: 16px;
  max-width: 100vw;
  h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }
  &__table {
    border-collapse: separate;
    border-spacing: 12px 8px;
    width: 100%;
    margin-bottom: 32px;
    th, td {
      text-align: center;
      padding: 0;
    }
    th {
      font-size: 14px;
      font-weight: 500;
      color: #888;
    }
    .app-button-demo__type {
      font-size: 14px;
      font-weight: 600;
      color: #888;
      text-align: right;
      padding-right: 8px;
      min-width: 80px;
    }
    .app-button-demo__cell {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      min-width: 120px;
    }
  }
  &__icons {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 24px;
  }
  &__icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: #888;
    gap: 4px;
    width: 64px;
  }
  &__svg {
    width: 32px;
    height: 32px;
    display: block;
    margin: 0 auto;
  }
}

.app-input-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin-bottom: 40px;
}

.app-select-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin-bottom: 40px;
}

.app-controls-demo {
  border: 1px dashed #b48cf0;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 300px;
}
</style> 