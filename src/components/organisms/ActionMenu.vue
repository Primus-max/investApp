<template>
  <div class="action-menu-blur-bg">
    <div class="action-menu-sheet">
      <button class="action-menu__close" @click="$emit('close')">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#fff"/>
          <path d="M16 16L32 32" stroke="#23242C" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M32 16L16 32" stroke="#23242C" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="action-menu__banner">
        <div class="action-menu__banner-sparkles"></div>
        <div class="action-menu__banner-content">
          <div class="action-menu__banner-title">Чат с ИИ</div>
          <div class="action-menu__banner-badge">3/3 доступно</div>
        </div>
        <div class="action-menu__banner-glare"></div>
      </div>
      <div class="action-menu__actions">
        <div class="action-menu__action"><div class="icon-placeholder"></div>Создать портфель</div>
        <div class="action-menu__action"><div class="icon-placeholder"></div>Создать сделку</div>
        <div class="action-menu__action"><div class="icon-placeholder"></div>Добавить виджет</div>
        <div class="action-menu__action"><div class="icon-placeholder"></div>Загрузить отчет</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// иконки временно заменены на div.icon-placeholder
</script>

<style scoped lang="scss">
.action-menu-blur-bg {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: rgba(16,18,24,0.10);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.action-menu-sheet {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  background: #23242C;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 8px 32px rgba(16, 18, 24, 0.16);
  padding: 24px 0 16px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.action-menu__close {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  bottom: -24px;
  z-index: 1200;
  background: none;
  border: none;
  padding: 0;
  box-shadow: 0 2px 8px rgba(16,18,24,0.12);
  cursor: pointer;
  outline: none;
}
.action-menu__close svg {
  display: block;
}
.action-menu__banner {
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #3B5CFF 0%, #7B5CFF 100%);
  border-radius: 16px;
  padding: 20px 24px 20px 20px;
  margin: 0 16px 20px 16px;
  gap: 12px;
  overflow: hidden;
}
.action-menu__banner-sparkles {
  width: 28px;
  height: 28px;
  background: rgba(255,255,255,0.18);
  border-radius: 8px;
  margin-right: 8px;
}
.action-menu__banner-title {
  font-family: 'SF Pro Rounded', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}
.action-menu__banner-badge {
  display: inline-block;
  background: rgba(255,255,255,0.18);
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  padding: 2px 10px;
}
.action-menu__banner-glare {
  position: absolute;
  right: 0;
  top: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}
.action-menu__actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 16px;
}
.action-menu__action {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  cursor: pointer;
  border-radius: 16px;
  background: #292A32;
  font-family: 'SF Pro Rounded', Arial, sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0;
  transition: background 0.15s;
  &:hover {
    background: #32333B;
  }
}
.icon-placeholder {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(255,255,255,0.10);
}
@keyframes sheet-in {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style> 