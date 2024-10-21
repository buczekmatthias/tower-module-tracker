<template>
  <div class="flex flex-col lg:flex-row">
    <div class="grid grid-cols-2">
      <button
        v-for="link in ['tracker', 'share']"
        :key="link"
        @click="tracker = link"
        class="nav-btn"
        :class="{ active: tracker === link }"
      >
        {{ link }}
      </button>
    </div>
  </div>
</template>

<script setup>
const tracker = defineModel();
</script>
