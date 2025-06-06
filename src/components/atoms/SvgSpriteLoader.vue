<template></template>
<script setup>
import { onMounted } from 'vue';

onMounted(async () => {
  const res = await fetch('/src/assets/icons/icons-sprite.svg')
  const svgText = await res.text()
  const div = document.createElement('div')
  div.style.display = 'none'
  div.innerHTML = svgText
  document.body.appendChild(div)
})
</script> 