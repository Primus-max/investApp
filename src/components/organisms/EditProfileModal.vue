<template>
  <BaseModal :visible="visible" @update:visible="$emit('update:visible', $event)">
    <div class="edit-profile-modal">
      <div class="edit-profile-modal__header">
        <h2 class="edit-profile-modal__title">Изменение профиля</h2>
      </div>
      <div class="edit-profile-modal__body">
        <div class="edit-profile-modal__form">
          <div class="edit-profile-modal__field">
            <label class="edit-profile-modal__label">Юзернейм</label>
            <AppInput v-model="username" placeholder="konstantin.k.k" />
          </div>
          <div class="edit-profile-modal__field">
            <label class="edit-profile-modal__label">Имя и фамилия</label>
            <AppInput v-model="fullName" placeholder="Константин Константинов" />
          </div>
          <div class="edit-profile-modal__field">
            <label class="edit-profile-modal__label">E-mail</label>
            <AppInput v-model="email" placeholder="konstantin.k.k@gmail.com" />
          </div>
        </div>
      </div>
      <AppPillButton class="edit-profile-modal__submit" @click="submit">
        Редактировать
      </AppPillButton>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';

import AppInput from '@/components/atoms/AppInput.vue';
import AppPillButton from '@/components/atoms/AppPillButton.vue';
import BaseModal from '@/components/molecules/BaseModal.vue';

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible', 'submit']);

const username = ref('konstantin.k.k');
const fullName = ref('Константин Константинов');
const email = ref('konstantin.k.k@gmail.com');

const submit = () => {
  emit('submit', {
    username: username.value,
    fullName: fullName.value,
    email: email.value,
  });
  emit('update:visible', false);
};
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';
@import '@/styles/_mixins.scss';

@include bem('edit-profile-modal') {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: $space-l $space-m;
}

@include bem('edit-profile-modal', 'header') {
  margin-bottom: $space-xl;
}
  
@include bem('edit-profile-modal', 'title') {
  font-size: $font-size-h1;
  line-height: $line-height-h1;
  font-weight: $font-weight-bold;
  color: $gray-950;
  text-align: left;
}

@include bem('edit-profile-modal', 'body') {
  flex-grow: 1;
}

@include bem('edit-profile-modal', 'form') {
  display: flex;
  flex-direction: column;
  gap: $space-l;
}

@include bem('edit-profile-modal', 'label') {
  font-size: $font-size-body;
  font-weight: $font-weight-semibold;
  color: $gray-950;
  margin-bottom: $space-xs;
  display: block;
}

@include bem('edit-profile-modal', 'submit') {
  position: absolute;
  left: $space-m;
  right: $space-m;
  bottom: 40px;
  height: 50px;
  background: $gray-0;
  border-radius: $radius-sm;
  width: auto;

  font-family: $font-main;
  font-weight: $font-weight-semibold;
  font-size: $font-size-body;
  line-height: 22px;
  color: $gray-900;
}
</style> 