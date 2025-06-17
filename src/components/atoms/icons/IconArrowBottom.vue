<template>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.64646 12.9798L5.85356 9.18693C5.53858 8.87195 5.76167 8.33337 6.20712 8.33337H13.7929C14.2384 8.33337 14.4614 8.87194 14.1465 9.18693L10.3536 12.9798C10.1583 13.1751 9.84172 13.1751 9.64646 12.9798Z"
            :fill="color" />
    </svg>
</template>
<script setup>
const props = defineProps({
    color: {
        type: String,
        default: '#80899C'
    }
})
</script>