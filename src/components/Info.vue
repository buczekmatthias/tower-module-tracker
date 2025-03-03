<template>
  <p
    class="text-slate-300/60 text-sm"
    v-html="message"
  ></p>
</template>

<script setup>
defineProps({
  message: String,
});
</script>
