<script setup>
defineProps({
  color: {
    type: String,
    default: '#80899C'
  }
})
</script>

<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M6.98311 2.95808C7.22718 2.714 7.62291 2.714 7.86699 2.95808L13.3003 8.39142C14.1861 9.27716 14.1861 10.7229 13.3003 11.6086L7.86699 17.042C7.62291 17.286 7.22718 17.286 6.98311 17.042C6.73903 16.7979 6.73903 16.4022 6.98311 16.1581L12.4164 10.7247C12.814 10.3272 12.814 9.67289 12.4164 9.2753L6.98311 3.84197C6.73903 3.59789 6.73903 3.20216 6.98311 2.95808Z"
      :fill="color" />
  </svg>
</template>