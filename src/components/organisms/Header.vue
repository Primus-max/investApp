<template>
  <header class="header">
    <div class="header__icon">
      <slot name="left" />
    </div>
    <span class="header__title">
      <slot />
    </span>
    <div class="header__action">
      <slot name="right" />
    </div>
  </header>
</template>

<script setup>
// No props, only slots
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);

  &__icon {
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }

  &__title {
    flex: 1 1 auto;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-heading);
    letter-spacing: 0.01em;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__action {
    flex: 0 0 auto;
    background: none;
    border: none;
    padding: 0;
    margin-left: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }
}
</style> 